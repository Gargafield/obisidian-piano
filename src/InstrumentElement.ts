import { MarkdownRenderChild } from "obsidian";
import { IInstrumentSettings, Instrument } from "piano-chart";

interface ExtendedInstrumentSettings extends IInstrumentSettings {
    keysDown?: string[];
}

export class InstrumentElement extends MarkdownRenderChild {
    private inst: Instrument;
    
    constructor(
        private readonly el: HTMLElement,
        private readonly source: string
    ) {
        super(el);
    }
    
    createInstrument(): void {
        var settings: ExtendedInstrumentSettings = {};
        try {
            settings = this.parseSource(); 
        }
        catch (e) {
            console.log(e);
        }
        this.inst = new Instrument(this.el, settings);
        this.inst.create();
        
        if (settings.keysDown) {
            settings.keysDown.forEach(key => this.inst.keyDown(key));
        }
    }
    
    onload(): void {
        // Wait until the clientWidth is set, then create the instrument.
        // This is necessary because the instrument's width is based on the
        // clientWidth of the container element, and the clientWidth is not
        // set until the element is rendered.
        if (this.el.clientWidth > 0) {
            this.createInstrument();
        } else {
            setTimeout(() => this.createInstrument(), 0);
        }
    }
    
    onunload(): void {
        this.inst.destroy();
    }
    
    parseSource(): ExtendedInstrumentSettings {
        
        // First line can be comma separated list of keys to press.
        // The rest of the lines will be json.
        const lines = this.source.split("\n");
        if (lines.length === 0) {
            return {};
        }
        
        // The first line could be a comma separated list of keys to press.
        // But it could also be json.
        const firstLine = lines[0];
        if (firstLine[0] === "{") {
            return JSON.parse(this.source) as ExtendedInstrumentSettings;
        }
        
        const keysDown = firstLine.split(",");
        lines.shift();
        
        // Parse the rest of the lines as json.
        const json = lines.join("\n");
        if (json.length === 0) {
            return { keysDown };
        }
        const settings = JSON.parse(json) as ExtendedInstrumentSettings;
        settings.keysDown = keysDown;
        
        return settings;
    }
}
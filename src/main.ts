import { Plugin } from 'obsidian';
import { InstrumentElement } from './InstrumentElement';

function pianoCodeBlockProcessor(source: string, el: HTMLElement, ctx: any) {
	ctx.addChild(new InstrumentElement(el, source));
}

export default class PianoWidget extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor(
			"piano",
			pianoCodeBlockProcessor
		);
	}

	onunload() {}
}

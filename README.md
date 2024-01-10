# Obsidian Piano

Small plugin to add piano widgets to your notes using [piano-chart](https://github.com/ailon/piano-chart).

Syntax:

`````txt
```piano
G3,A3,C4,G4,A4,F#4
{
    "startOctave": 3,
    "endOctave": 5,
    "startNote": "F",
    "endNote": "C",
    "showNoteNames": "always",
    "showOctaveNumbers": true
}
```
`````

The first line is a comma-separated list of notes. The second line is a JSON object with the following properties:

* `startOctave: number` (default 2) - the first displayed octave;
* `startNote: Note` (default "C") - the first * displayed note in the first displayed octave;
* `endOctave: number` (default 6) - the last displayed octave;
* `endNote: Note` (default "C") - the last displayed note in the last displayed octave;
* `showNoteNames: NoteNameBehavior` (default "onpress") - when to show note labels on the keys. Available values:
  * `always` - labels are always on;
  * `onpress` - labels are displayed when a key is pressed;
  * `onhighlight` - labels are displayed only on highlighted keys;
  * `never` - labels are never displayed.
* `highlightedNotes: NoteValue[]` (default []) - an array of notes to highlight (octave number can be omitted);
* `highlightColor: string` (default "#0c0") - the base color for the highlight bubble;
* `specialHighlightedNotes: NoteValue[]` (default []) - an array of notes to highlight in a special way (eg. root notes)
* `specialHighlightColor: string` (default "#f00") - the base color of the special highlight bubbles;
* `showOctaveNumbers: boolean` (default false) - whether to show octave numbers on the keyboard or not;
* `keyPressStyle: KeyPressStyle` (default "subtle") (new in v.1.5) - the style of key press visualization. Values:
  * `subtle` - fills keys with a subtle gradient;
  * `vivid` - fills keys with a color specified via vividKeyPressColor.
* `vividKeyPressColor: string` (default "#f33") (new in v.1.5) - key fill color for key presses when keyPressStyle is set to vivid.

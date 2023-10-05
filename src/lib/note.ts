type PitchName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
type PitchGroup = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
type PitchExtra = '#' | 'b';
type Pitch = `${PitchName}${PitchExtra}${PitchGroup}` | `${PitchName}${PitchGroup}`;

export const MAX_NOTE_PITCH = 96;
export class Note {
  pitch: number;

  constructor(pitch: number);
  constructor(pitch: Pitch);

  constructor(pitch: number | Pitch) {
    if (typeof pitch === 'number') {
      this.pitch = pitch;
    } else {
      this.pitch = Note.parsePitch(pitch);
    }
  }

  static parsePitch(pitch: Pitch) {
    const pitchName = pitch[0];
    const pitchExtra = pitch[1];
    const pitchGroup = pitch[2];

    const pitchNameIndex = ['C', 'D', 'E', 'F', 'G', 'A', 'B'].indexOf(pitchName);
    const pitchGroupIndex = ['0', '1', '2', '3', '4', '5', '6', '7'].indexOf(pitchGroup);
    const pitchExtraIndex = ['#', 'b'].indexOf(pitchExtra);

    return pitchNameIndex + pitchGroupIndex * 12 + pitchExtraIndex;
  }

  toString() {
    const group = Math.floor(this.pitch / 12);
    const name = this.pitch % 12;
    const nameStr = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G', 'A', 'A#', 'B'][name];
    return `${nameStr}${group}`;
  }

  adaptTonejs() {
    return this.toString();
  }

  adaptVex() {
    const group = Math.floor(this.pitch / 12);
    const name = this.pitch % 12;
    const nameStr = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g', 'a', 'a#', 'b'][name];
    return {
      keys: [`${nameStr}/${group}`],
      duration: 'q'
    };
  }
}

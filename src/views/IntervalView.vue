<template>
  <p>Interval</p>
  <button @click="play">Play</button>
  <div ref="output"></div>
  <RouterLink to="/">[home]</RouterLink>
</template>

<script setup lang="ts">
import * as Tone from 'tone';
import { RenderContext, StaveNote, Tickable, Vex, Voice } from 'vexflow';
import { onMounted, ref } from 'vue';
import { MAX_NOTE_PITCH, Note } from '@/lib/note';

const { Renderer, Stave } = Vex.Flow;

const output = ref<HTMLDivElement>();

const renderer = ref(null as any as InstanceType<typeof Renderer>);
const context = ref(null as any as RenderContext);
const stave = ref(null as any as InstanceType<typeof Stave>);
const noteRoot = ref(null as any as Note);
const noteInterval = ref(null as any as Note);

const newStave = () => {
  renderer.value = new Renderer(output.value!, Renderer.Backends.SVG);
  context.value = renderer.value.getContext();
  renderer.value.resize(500, 500);
  stave.value = new Stave(10, 40, 400);
  stave.value.addClef('treble').addTimeSignature('4/4');
  stave.value.setContext(context.value).draw();
};

const addVoice = (notes: Tickable[]) => {
  const voice = new Voice({ num_beats: 2, beat_value: 4 });
  voice.addTickables(notes);

  new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 400);

  voice.draw(context.value, stave.value as any);
};

const randomNote = () => {
  const randomMath = Math.floor(Math.random() * 1000) % (MAX_NOTE_PITCH - 13);
  noteRoot.value = new Note(randomMath);
  noteInterval.value = new Note(randomMath + 7);
};

const play = () => {
  const synth = new Tone.Synth().toDestination();
  newStave();
  randomNote();
  const now = Tone.now();
  synth.triggerAttack(noteRoot.value.toString(), now);
  synth.triggerRelease(now + 0.5);
  synth.triggerAttack(noteInterval.value.toString(), now + 0.5);
  synth.triggerRelease(now + 1);
  addVoice([
    new StaveNote(noteRoot.value.adaptVex()),
    new StaveNote(noteInterval.value.adaptVex()),
  ]);
};

onMounted(newStave);
</script>

<style scoped></style>

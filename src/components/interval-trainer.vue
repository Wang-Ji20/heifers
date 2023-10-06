<template>
  <div class="container-fluid">
    <div class="col">
      <h1>Intervals</h1>
      <select name="Interval Types" class="form-select mb-4" v-model.number="noteRange">
        <option v-for="(interval, key) in IntervalNames" :key="key" :value="key">
          {{ interval }}
        </option>
      </select>
      <button @click="startOneSession" class="btn btn-primary">Next Test</button>
      <button @click="playIntervals" class="btn btn-secondary ms-4">Play Again</button>
      <div ref="output"></div>
      <RouterLink to="/">[home]</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Tone from 'tone';
import { RenderContext, StaveNote, Tickable, Vex, Voice } from 'vexflow';
import { onMounted, ref } from 'vue';
import { MAX_NOTE_PITCH, Note, IntervalNames } from '@/lib/note';

const { Renderer, Stave } = Vex.Flow;

const output = ref<HTMLDivElement>();

const renderer = ref(null as any as InstanceType<typeof Renderer>);
const context = ref(null as any as RenderContext);
const stave = ref(null as any as InstanceType<typeof Stave>);

const noteRoot = ref(null as any as Note);
const noteRange = ref(5);
const noteInterval = ref(null as any as Note);

const synth = new Tone.Synth().toDestination();

const setupSVG = () => {
  renderer.value = new Renderer(output.value!, Renderer.Backends.SVG);
  renderer.value.resize(500, 500);
  context.value = renderer.value.getContext();
};

const clearSVG = () => {
  context.value.clear();
};

const drawStaveToSVG = () => {
  stave.value = new Stave(10, 40, 400);
  stave.value.addClef('treble').addTimeSignature('4/4');
  stave.value.setContext(context.value).draw();
};

const drawNotesToStave = (notes: Tickable[]) => {
  const voice = new Voice({ num_beats: 2, beat_value: 4 });
  voice.addTickables(notes);
  new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 400);
  voice.draw(context.value, stave.value as any);
};

const generateRandomIntervals = () => {
  const randomMath = Math.floor(Math.random() * 1000) % (MAX_NOTE_PITCH - 16);
  noteRoot.value = new Note(randomMath);
  console.log(noteRange.value);
  noteInterval.value = new Note(randomMath + noteRange.value);
};

const playIntervals = () => {
  const now = Tone.now();
  synth.triggerAttack(noteRoot.value.toString(), now);
  synth.triggerRelease(now + 0.5);
  synth.triggerAttack(noteInterval.value.toString(), now + 0.5);
  synth.triggerRelease(now + 1);
};

const startOneSession = () => {
  generateRandomIntervals();
  playIntervals();
  clearSVG();
  drawStaveToSVG();
  drawNotesToStave([
    new StaveNote(noteRoot.value.adaptVex()),
    new StaveNote(noteInterval.value.adaptVex())
  ]);
};

onMounted(setupSVG);
</script>

<style scoped></style>

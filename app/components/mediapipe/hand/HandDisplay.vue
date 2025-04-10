<template>
  <section>
    <template v-for="[type, group] in entries" :key="type">
      <h1>{{ capitalize(type) }} Landmarks</h1>
      <template v-for="(landmarks, i) in group" :key="i">
        <h2>{{ type }} {{ i + 1 }}</h2>
        <ul>
          <li v-for="{ x, y, z } in landmarks" :key="`${x}-${y}-${z}`">
            X: {{ x }}, Y: {{ y }}, Z: {{ z }}
          </li>
        </ul>
      </template>
    </template>
  </section>
</template>

<script lang="ts" setup>
import type { NormalizedLandmark } from '@mediapipe/tasks-vision';
import type { LandmarkMap } from '@/types/MediapipeLandmark';

const props = defineProps<{ landmarkData: LandmarkMap }>();

const entries = computed(() =>
  Object.entries(props.landmarkData) as [string, NormalizedLandmark[][]][],
);

const capitalize = (str: string) => str[0]?.toUpperCase() + str.slice(1);
</script>

<style scoped>
section {
  margin-top: 20px;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}
</style>

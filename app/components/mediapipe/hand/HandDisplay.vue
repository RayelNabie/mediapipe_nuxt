<template>
  <section class="landmarks">
    <template v-for="[type, group] in entries" :key="type">
      <div class="landmark__group">
        <h1>{{ capitalize(type) }} Landmarks</h1>
        <template v-for="(landmarks, i) in group" :key="i">
          <div class="landmark__card">
            <h2>{{ type }} {{ i + 1 }}</h2>
            <ul>
              <li v-for="{ x, y, z } in landmarks" :key="`${x}-${y}-${z}`">
                X: {{ x }}, Y: {{ y }}, Z: {{ z }}
              </li>
            </ul>
          </div>
        </template>
      </div>
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

<style lang="scss" scoped>
.landmarks {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  &__group {
    margin-bottom: 2rem;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: $light;
    box-shadow: 0 4px 12px rgba($dark-gray, 0.1);
  }

  &__card {
    background-color: $white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba($dark-gray, 0.1);
    margin-bottom: 1rem;

    h2 {
      font-size: 1.5rem;
      color: $primary;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 1rem;
        color: $dark-gray;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>

<template>
  <div>
    <MediapipeWebcam @video-ready="poseData = $event" />
    <MediapipeHandDisplay :landmark-data="poseData" />
  </div>
</template>

<script lang="ts" setup>
import { MediapipeHandDisplay } from '#components';
import type { LandmarkMap } from '~/types/MediapipeLandmark';

const poseData = ref<LandmarkMap>({ hand: [], pose: [], face: [] });
</script>

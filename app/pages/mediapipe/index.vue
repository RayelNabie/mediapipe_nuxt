<template>
  <section class="mediapipe">
    <Card class="mediapipe__card">
      <template #header>
        <Button
          label="Start Recording" icon="pi pi-play"
          color="primary" :disabled="isRecording"
          variant="outlined"
          raised @click="startRecording"
        />
        <Button
          label="Stop Recording" icon="pi pi-stop"
          color="secondary" :disabled="!isRecording"
          variant="outlined"
          @click="stopRecording"
        />
      </template>
      <template #content>
        <BaseWebcam @video-ready="onPoseDataReceived" />
        <MediapipeHandDisplay :landmark-data="poseData" />
      </template>
    </Card>
  </section>
</template>

<script lang="ts" setup>
import type { LandmarkMap } from '@/types/MediapipeLandmark';

const poseData = ref<LandmarkMap>({ hand: [], pose: [], face: [] });
const isRecording = ref(false);
const recordingTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const { savePoseData } = usePoseStorage();

// Function to handle received pose data
const onPoseDataReceived = (newPoseData: LandmarkMap) => {
  if (isRecording.value) poseData.value = newPoseData;
};

// Start recording function (5 seconds)
const startRecording = () => {
  isRecording.value = true;
  recordingTimer.value = setTimeout(() => {
    isRecording.value = false;
    savePoseData(poseData.value, `User Pose ${new Date().toISOString()}`);
    alert('Pose recording saved!');
  }, 5000);
};

// Stop recording function
const stopRecording = () => {
  if (recordingTimer.value) clearTimeout(recordingTimer.value);
  isRecording.value = false;
};
</script>

<style lang="scss" scoped>
.mediapipe {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin-top: 3rem;
  padding: 2rem;

  .p-card {
    background-color: $white;
    border-radius: 1rem;
    box-shadow: 0 8px 20px rgba($dark-gray, 0.1);
    padding: 1.5rem;

    .p-card-header {
      background-color: $primary;
      color: $white;
      padding: 1rem;
      border-radius: 1rem 1rem 0 0;
      margin-bottom: 1rem;
    }

    .p-card-footer {
      padding: 1rem;
      text-align: right;
    }

    h1 {
      font-size: 2rem;
      color: $dark-gray;
    }

    h2 {
      font-size: 1.25rem;
      color: $dark-gray;
    }

  }
}
</style>

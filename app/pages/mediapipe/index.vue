<template>
  <section class="mediapipe">
    <Card class="mediapipe__card">
      <template #header>
        <h1>Pose Detection & Hand Tracking</h1>
        <h2>5 Seconds Pose Recording & Tracking Your Hand Movements</h2>
        <div class="buttons-container">
          <button
            class="record-button start-recording"
            :disabled="isRecording"
            @click="startRecording"
          >
            <span class="pi pi-play" /> Start Recording
          </button>
          <button
            class="record-button stop-recording"
            :disabled="!isRecording"
            @click="stopRecording"
          >
            <span class="pi pi-stop" /> Stop Recording
          </button>
        </div>
      </template>

      <template #content>
        <BaseWebcam @video-ready="onPoseDataReceived" />
        <MediapipeHandDisplay :landmark-data="poseData" />
      </template>
    </Card>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { LandmarkMap } from '@/types/MediapipeLandmark';

const poseData = ref<LandmarkMap>({ hand: [], pose: [], face: [] });
const isRecording = ref(false);
const recordingTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const { savePoseData } = usePoseStorage();

const onPoseDataReceived = (newPoseData: LandmarkMap) => {
  if (isRecording.value) poseData.value = newPoseData;
};

const startRecording = () => {
  isRecording.value = true;
  recordingTimer.value = setTimeout(() => {
    isRecording.value = false;
    savePoseData(poseData.value, `User Pose ${new Date().toISOString()}`);
    alert('Pose recording saved!');
  }, 5000);
};

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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

  .buttons-container {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }

  .record-button {
    padding: 12px 24px;
    font-size: 1.1rem;
    border-radius: 5px;
    cursor: pointer;
    border: 2px solid transparent;
    outline: none;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &.start-recording {
      background-color: $primary;
      color: $white;
    }

    &.stop-recording {
      background-color: $secondary;
      color: $white;
    }

    &:hover {
      background-color: darken($primary, 10%);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    &:disabled {
      background-color: $gray;
      color: $dark-gray;
      cursor: not-allowed;
      box-shadow: none;
    }

    &:active {
      transform: scale(0.98);
      background-color: darken($primary, 15%);
    }

    .pi {
      font-size: 1.5rem;
    }
  }
}
</style>

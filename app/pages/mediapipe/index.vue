<template>
  <section class="mediapipe">
    <!-- Card 1: Pose Detection -->
    <Card class="mediapipe__card">
      <CardHeader>
        <Text h1>
          Pose Detection
        </Text>
        <Text h2>
          Live WebCam Feed
        </Text>
      </CardHeader>
      <CardBody>
        <MediapipeWebcam @video-ready="poseData = $event" />
      </CardBody>
      <CardFooter>
        <Button color="primary" @click="onActionClick">
          Start
        </Button>
      </CardFooter>
    </Card>

    <!-- Card 2: Hand Tracking -->
    <Card class="mediapipe__card">
      <CardHeader>
        <Text h1>
          Hand Tracking
        </Text>
        <Text h2>
          Tracking Your Hand Movements
        </Text>
      </CardHeader>
      <CardBody>
        <MediapipeHandDisplay :landmark-data="poseData" />
      </CardBody>
      <CardFooter>
        <Button color="secondary" @click="onActionClick">
          Track Hands
        </Button>
      </CardFooter>
    </Card>

    <!-- Additional Cards can be added below -->
  </section>
</template>

<script lang="ts" setup>
import type { LandmarkMap } from '~/types/MediapipeLandmark';

const poseData = ref<LandmarkMap>({ hand: [], pose: [], face: [] });

const onActionClick = () => {
  console.log('Button clicked');
};
</script>

<style lang="scss" scoped>
.mediapipe {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  margin-top: 3rem;
  padding: 2rem;

  &__card {
    background-color: $white;
    border-radius: 1rem;
    box-shadow: 0 8px 20px rgba($dark-gray, 0.1);
    padding: 1.5rem;

    &__header {
      background-color: $primary;
      color: $white;
      padding: 1rem;
      border-radius: 1rem 1rem 0 0;
      margin-bottom: 1rem;
    }

    &__footer {
      padding: 1rem;
      text-align: right;
    }
  }

  /* Styling for text headers */
  h1 {
    font-size: 2rem;
    color: $dark-gray;
  }

  h2 {
    font-size: 1.25rem;
    color: $dark-gray;
  }
}

button {
  margin-top: 1rem;
}
</style>

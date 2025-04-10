<script setup lang="ts">
import type { NormalizedLandmark } from '@mediapipe/tasks-vision';

const props = defineProps<{
  video: HTMLVideoElement | null;
  canvasElement: HTMLCanvasElement | null;
  onRecordPose?: (landmarks: NormalizedLandmark[]) => void;
}>();

usePoseRenderer(
  computed(() => props.video),
  computed(() => props.canvasElement),
  props.onRecordPose,
);
</script>

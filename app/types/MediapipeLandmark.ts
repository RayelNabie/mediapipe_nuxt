import type { NormalizedLandmark } from '@mediapipe/tasks-vision';

export type LandmarkStyles = {
  lineColor?: string;
  pointColor?: string;
  lineWidth?: number;
  pointRadius?: number;
};

export type LandmarkMap = {
  hand: NormalizedLandmark[][];
  pose: NormalizedLandmark[][];
  face: NormalizedLandmark[][];
  [key: string]: NormalizedLandmark[][];
};

export interface PoseData {
  label: string;
  data: {
    x: number;
    y: number;
    z: number;
    visibility: number;
  }[];
  timestamp: string;
}

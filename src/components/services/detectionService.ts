import apiClient from './apiClient';

export interface DetectionResult {
  id: string;
  hasHelmet: boolean;
  hasVest: boolean;
  hasGloves: boolean;
  confidence: number;
  imageWithBBox?: string;
  timestamp?: string;
}

export const detectSafetyEquipment = async (file: File): Promise<DetectionResult> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await apiClient.post('/detect', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getDetectionHistory = async (): Promise<DetectionResult[]> => {
  const response = await apiClient.get('/detections/history');
  return response.data;
};
//export default DetectionResult;
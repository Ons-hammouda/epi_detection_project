import apiClient from './apiClient';
export const detectSafetyEquipment = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiClient.post('/detect', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
export const getDetectionHistory = async () => {
    const response = await apiClient.get('/detections/history');
    return response.data;
};
//export default DetectionResult;

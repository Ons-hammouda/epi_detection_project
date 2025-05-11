import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { UploadZone } from '../components/detection/UploadZone';
import { ResultVisualizer } from '../components/detection/ResultVisualizer';
import AlertModal from '../components/layout/AlertModal';
import { detectSafetyEquipment } from '../components/services/detectionService';
export const DetectionPage = () => {
    const [detectionResult, setDetectionResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alertModalOpen, setAlertModalOpen] = useState(false);
    const handleFileUpload = async (file) => {
        setIsLoading(true);
        try {
            const result = await detectSafetyEquipment(file);
            setDetectionResult(result);
        }
        catch (error) {
            console.error('Detection failed:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSendAlert = async (email, message) => {
        console.log('Alert sent to:', email, 'Message:', message);
        setAlertModalOpen(false);
    };
    const missingItems = [];
    if (detectionResult) {
        if (!detectionResult.hasHelmet)
            missingItems.push('Casque');
        if (!detectionResult.hasVest)
            missingItems.push('Gilet');
        if (!detectionResult.hasGloves)
            missingItems.push('Gants');
    }
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "D\u00E9tection des \u00E9quipements" }), _jsxs(Box, { sx: { my: 4 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Uploader une image" }), _jsx(UploadZone, { onFileAccepted: handleFileUpload, isLoading: isLoading })] }), _jsxs(Box, { sx: { my: 4 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "R\u00E9sultats" }), detectionResult ? (_jsx(ResultVisualizer, { result: detectionResult, onSendAlert: missingItems.length > 0 ? () => setAlertModalOpen(true) : undefined })) : (_jsx(Box, { sx: {
                            p: 4,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            textAlign: 'center',
                        }, children: _jsx(Typography, { color: "text.secondary", children: "Aucun r\u00E9sultat \u00E0 afficher. Veuillez uploader une image." }) }))] }), _jsx(AlertModal, { open: alertModalOpen, onClose: () => setAlertModalOpen(false), missingItems: missingItems, onSubmit: handleSendAlert })] }));
};

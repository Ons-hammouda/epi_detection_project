import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { UploadZone } from '../components/detection/UploadZone';
import { ResultVisualizer } from '../components/detection/ResultVisualizer';
import AlertModal from '../components/layout/AlertModal';
import { detectSafetyEquipment } from '../components/services/detectionService';

export const DetectionPage = () => {
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const result = await detectSafetyEquipment(file);
      setDetectionResult(result);
    } catch (error) {
      console.error('Detection failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAlert = async (email: string, message: string) => {
    console.log('Alert sent to:', email, 'Message:', message);
    setAlertModalOpen(false);
  };

  const missingItems = [];
  if (detectionResult) {
    if (!detectionResult.hasHelmet) missingItems.push('Casque');
    if (!detectionResult.hasVest) missingItems.push('Gilet');
    if (!detectionResult.hasGloves) missingItems.push('Gants');
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Détection des équipements
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>
          Uploader une image
        </Typography>
        <UploadZone onFileAccepted={handleFileUpload} isLoading={isLoading} />
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>
          Résultats
        </Typography>
        {detectionResult ? (
          <ResultVisualizer
            result={detectionResult}
            onSendAlert={missingItems.length > 0 ? () => setAlertModalOpen(true) : undefined}
          />
        ) : (
          <Box
            sx={{
              p: 4,
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography color="text.secondary">
              Aucun résultat à afficher. Veuillez uploader une image.
            </Typography>
          </Box>
        )}
      </Box>

      <AlertModal
        open={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        missingItems={missingItems}
        onSubmit={handleSendAlert}
      />
    </Container>
  );
};

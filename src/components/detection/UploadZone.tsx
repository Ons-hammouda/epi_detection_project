import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  styled,
} from '@mui/material';
import { CloudUpload, ChangeCircle } from '@mui/icons-material';

const DropzonePaper = styled(Paper)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

interface UploadZoneProps {
  onFileAccepted: (file: File) => void;
  isLoading: boolean;
}

export const UploadZone = ({ onFileAccepted, isLoading }: UploadZoneProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onFileAccepted(file);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <Box sx={{ mb: 4 }}>
      <DropzonePaper {...getRootProps()}>
        <input {...getInputProps()} />
        {isLoading ? (
          <Box
            sx={{
              py: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CircularProgress size={40} color="primary" />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Analyse en cours...
            </Typography>
          </Box>
        ) : preview ? (
          <Box
            sx={{
              position: 'relative',
              '&:hover .change-button': { opacity: 1 },
            }}
          >
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{ maxHeight: 300, mx: 'auto', borderRadius: 1 }}
            />
            <Box
              className="change-button"
              sx={{
                position: 'absolute',
                inset: 0,
                bgcolor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                borderRadius: 1,
              }}
            >
              <Button
                variant="contained"
                startIcon={<ChangeCircle />}
                sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
              >
                Changer d'image
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" component="p" sx={{ mb: 1 }}>
              {isDragActive ? 'Déposez votre image ici' : 'Glissez-déposez une image'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ou cliquez pour sélectionner
            </Typography>
            <Typography
              variant="caption"
              color="text.disabled"
              display="block"
              sx={{ mt: 2 }}
            >
              Formats supportés: JPG, PNG
            </Typography>
          </>
        )}
      </DropzonePaper>
    </Box>
  );
};
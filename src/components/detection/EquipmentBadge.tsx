import { Chip, Box, Typography } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import React from 'react';

interface EquipmentBadgeProps {
  name: string;
  present: boolean;
  confidence?: number;
}

const EquipmentBadge: React.FC<EquipmentBadgeProps> = ({ name, present, confidence }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Chip
        icon={present ? <CheckCircle /> : <Error />}
        label={name}
        color={present ? 'success' : 'error'}
        variant="outlined"
        sx={{
          minWidth: 120,
          fontSize: '0.875rem',
          padding: 1,
        }}
      />
      {confidence !== undefined && (
        <Typography variant="caption" color="text.secondary">
          {Math.round(confidence * 100)}% de confiance
        </Typography>
      )}
    </Box>
  );
};

export default EquipmentBadge;
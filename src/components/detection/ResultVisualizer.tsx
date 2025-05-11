import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
} from '@mui/material';
import { Grid as MuiGrid } from '@mui/material';
import { Warning } from '@mui/icons-material';
import EquipmentBadge from './EquipmentBadge';

interface DetectionResult {
  hasHelmet: boolean;
  hasVest: boolean;
  hasGloves: boolean;
  confidence: number;
  timestamp?: string;
  imageWithBBox?: string;
}

interface ResultVisualizerProps {
  result: DetectionResult;
  onSendAlert?: () => void;
}
const GridItem = (props: any) => (
  <MuiGrid item {...props} component="div" />
);


export const ResultVisualizer = ({ result, onSendAlert }: ResultVisualizerProps) => {
  const complianceRate =
    ([result.hasHelmet, result.hasVest, result.hasGloves].filter(Boolean).length / 3) * 100;

  return (
    <Card>
      {result.imageWithBBox && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box
            component="img"
            src={`data:image/jpeg;base64,${result.imageWithBBox}`}
            alt="Résultat de détection"
            sx={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
          />
        </Box>
      )}
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3,
          }}
        >
          <Typography variant="h6" component="h3">
            Résultats de la détection
          </Typography>
          <Chip
            label={complianceRate === 100 ? 'Conforme' : 'Non conforme'}
            color={complianceRate === 100 ? 'success' : 'error'}
            size="small"
          />
        </Box>
<GridItem xs={4}>
  <EquipmentBadge name="Casque" present={result.hasHelmet} />
</GridItem>

  <GridItem xs={4}>
    <EquipmentBadge name="Gilet" present={result.hasVest} />
</GridItem>

 <GridItem xs={4}>
    <EquipmentBadge name="Gants" present={result.hasGloves} />
</GridItem>


        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Confiance moyenne
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {(result.confidence * 100).toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={result.confidence * 100}
            color={
              result.confidence > 0.8 ? 'success' : result.confidence > 0.5 ? 'warning' : 'error'
            }
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {complianceRate < 100 && onSendAlert && (
          <Button
            variant="contained"
            color="error"
            fullWidth
            startIcon={<Warning />}
            onClick={onSendAlert}
            sx={{ mt: 2 }}
          >
            Envoyer une alerte
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
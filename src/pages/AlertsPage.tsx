import { Container, Typography, Box } from '@mui/material';
import { AlertFeed } from '../components/dashboard/AlertFeed';
import { Button } from '@mui/material';
import { Download, FilterList } from '@mui/icons-material';

export const AlertsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Historique des Alertes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visualisez l'historique complet des alertes envoyées
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
  <Button variant="outlined" startIcon={<FilterList />}>
    Filtrer
  </Button>
  <Button variant="contained" startIcon={<Download />}>
    Exporter
  </Button>
</Box>

      <AlertFeed />
    </Container>
  );
};

export default AlertsPage;
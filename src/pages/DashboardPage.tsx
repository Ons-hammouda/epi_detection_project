import { Box, Container, Typography } from '@mui/material';
import { StatsCard } from '../components/dashboard/StatsCard';
import { ComplianceChart } from '../components/dashboard/ComplianceChart';
import { AlertFeed } from '../components/dashboard/AlertFeed';

export const DashboardPage = () => {
  // Données simulées
  const stats = [
    {
      title: "Détections aujourd'hui",
      value: 42,
      change: 12,
      icon: '📊',
    },
    {
      title: "Taux de conformité",
      value: "78%",
      change: 5,
      icon: '✅',
    },
    {
      title: "Alertes envoyées",
      value: 9,
      change: -3,
      icon: '⚠️',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tableau de bord
      </Typography>

      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>
          Historique de conformité
        </Typography>
        <ComplianceChart />
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom>
          Alertes récentes
        </Typography>
        <AlertFeed />
      </Box>
    </Container>
  );
};
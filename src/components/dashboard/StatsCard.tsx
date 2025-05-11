import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown, Equalizer } from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

export const StatsCard = ({ title, value, change, icon }: StatsCardProps) => {
  const isPositive = change !== undefined ? change >= 0 : null;

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.main',
              p: 1.5,
              borderRadius: '50%',
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {value}
            </Typography>
          </Box>
        </Box>
        {change !== undefined && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: isPositive ? 'success.main' : 'error.main',
            }}
          >
            {isPositive ? (
              <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
            ) : change === 0 ? (
              <Equalizer fontSize="small" sx={{ mr: 0.5 }} />
            ) : (
              <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />
            )}
            <Typography variant="body2">
              {Math.abs(change)}% vs période précédente
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
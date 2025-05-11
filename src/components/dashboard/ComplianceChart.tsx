import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', conformité: 65 },
  { name: 'Fév', conformité: 70 },
  { name: 'Mar', conformité: 72 },
  { name: 'Avr', conformité: 75 },
  { name: 'Mai', conformité: 78 },
  { name: 'Jun', conformité: 80 },
];

export const ComplianceChart = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Évolution du taux de conformité
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[50, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="conformité"
                stroke="#3B82F6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Taux de conformité"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
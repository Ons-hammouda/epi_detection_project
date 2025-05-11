import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Typography, Box } from '@mui/material';
import { AlertFeed } from '../components/dashboard/AlertFeed';
import { Button } from '@mui/material';
import { Download, FilterList } from '@mui/icons-material';
export const AlertsPage = () => {
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsxs(Box, { sx: { mb: 4 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Historique des Alertes" }), _jsx(Typography, { variant: "body1", color: "text.secondary", children: "Visualisez l'historique complet des alertes envoy\u00E9es" })] }), _jsxs(Box, { sx: { display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }, children: [_jsx(Button, { variant: "outlined", startIcon: _jsx(FilterList, {}), children: "Filtrer" }), _jsx(Button, { variant: "contained", startIcon: _jsx(Download, {}), children: "Exporter" })] }), _jsx(AlertFeed, {})] }));
};
export default AlertsPage;

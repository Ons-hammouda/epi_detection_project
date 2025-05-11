import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Tableau de bord" }), _jsx(Box, { sx: { my: 4 }, children: _jsx(Box, { sx: {
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 3,
                    }, children: stats.map((stat, index) => (_jsx(StatsCard, { ...stat }, index))) }) }), _jsxs(Box, { sx: { my: 4 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Historique de conformit\u00E9" }), _jsx(ComplianceChart, {})] }), _jsxs(Box, { sx: { my: 4 }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Alertes r\u00E9centes" }), _jsx(AlertFeed, {})] })] }));
};

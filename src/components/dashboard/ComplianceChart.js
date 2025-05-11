import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
const data = [
    { name: 'Jan', conformité: 65 },
    { name: 'Fév', conformité: 70 },
    { name: 'Mar', conformité: 72 },
    { name: 'Avr', conformité: 75 },
    { name: 'Mai', conformité: 78 },
    { name: 'Jun', conformité: 80 },
];
export const ComplianceChart = () => {
    return (_jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "\u00C9volution du taux de conformit\u00E9" }), _jsx(Box, { sx: { height: 300 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: data, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, { domain: [50, 100] }), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "conformit\u00E9", stroke: "#3B82F6", strokeWidth: 2, activeDot: { r: 8 }, name: "Taux de conformit\u00E9" })] }) }) })] }) }));
};

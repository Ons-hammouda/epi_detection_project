import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown, Equalizer } from '@mui/icons-material';
export const StatsCard = ({ title, value, change, icon }) => {
    const isPositive = change !== undefined ? change >= 0 : null;
    return (_jsx(Card, { children: _jsxs(CardContent, { children: [_jsxs(Box, { display: "flex", alignItems: "center", mb: 2, children: [_jsx(Box, { sx: {
                                bgcolor: 'primary.light',
                                color: 'primary.main',
                                p: 1.5,
                                borderRadius: '50%',
                                mr: 2,
                            }, children: icon }), _jsxs(Box, { children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: title }), _jsx(Typography, { variant: "h5", fontWeight: "bold", children: value })] })] }), change !== undefined && (_jsxs(Box, { sx: {
                        display: 'flex',
                        alignItems: 'center',
                        color: isPositive ? 'success.main' : 'error.main',
                    }, children: [isPositive ? (_jsx(TrendingUp, { fontSize: "small", sx: { mr: 0.5 } })) : change === 0 ? (_jsx(Equalizer, { fontSize: "small", sx: { mr: 0.5 } })) : (_jsx(TrendingDown, { fontSize: "small", sx: { mr: 0.5 } })), _jsxs(Typography, { variant: "body2", children: [Math.abs(change), "% vs p\u00E9riode pr\u00E9c\u00E9dente"] })] }))] }) }));
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, CardContent, Typography, Button, LinearProgress, Chip, } from '@mui/material';
import { Grid as MuiGrid } from '@mui/material';
import { Warning } from '@mui/icons-material';
import EquipmentBadge from './EquipmentBadge';
const GridItem = (props) => (_jsx(MuiGrid, { item: true, ...props, component: "div" }));
export const ResultVisualizer = ({ result, onSendAlert }) => {
    const complianceRate = ([result.hasHelmet, result.hasVest, result.hasGloves].filter(Boolean).length / 3) * 100;
    return (_jsxs(Card, { children: [result.imageWithBBox && (_jsx(Box, { sx: { borderBottom: 1, borderColor: 'divider' }, children: _jsx(Box, { component: "img", src: `data:image/jpeg;base64,${result.imageWithBBox}`, alt: "R\u00E9sultat de d\u00E9tection", sx: { width: '100%', maxHeight: 400, objectFit: 'contain' } }) })), _jsxs(CardContent, { children: [_jsxs(Box, { sx: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 3,
                        }, children: [_jsx(Typography, { variant: "h6", component: "h3", children: "R\u00E9sultats de la d\u00E9tection" }), _jsx(Chip, { label: complianceRate === 100 ? 'Conforme' : 'Non conforme', color: complianceRate === 100 ? 'success' : 'error', size: "small" })] }), _jsx(GridItem, { xs: 4, children: _jsx(EquipmentBadge, { name: "Casque", present: result.hasHelmet }) }), _jsx(GridItem, { xs: 4, children: _jsx(EquipmentBadge, { name: "Gilet", present: result.hasVest }) }), _jsx(GridItem, { xs: 4, children: _jsx(EquipmentBadge, { name: "Gants", present: result.hasGloves }) }), _jsxs(Box, { sx: { mb: 3 }, children: [_jsxs(Box, { sx: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 1,
                                }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Confiance moyenne" }), _jsxs(Typography, { variant: "body2", fontWeight: "medium", children: [(result.confidence * 100).toFixed(1), "%"] })] }), _jsx(LinearProgress, { variant: "determinate", value: result.confidence * 100, color: result.confidence > 0.8 ? 'success' : result.confidence > 0.5 ? 'warning' : 'error', sx: { height: 8, borderRadius: 4 } })] }), complianceRate < 100 && onSendAlert && (_jsx(Button, { variant: "contained", color: "error", fullWidth: true, startIcon: _jsx(Warning, {}), onClick: onSendAlert, sx: { mt: 2 }, children: "Envoyer une alerte" }))] })] }));
};

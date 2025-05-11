import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Chip, Box, Typography } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
const EquipmentBadge = ({ name, present, confidence }) => {
    return (_jsxs(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
        }, children: [_jsx(Chip, { icon: present ? _jsx(CheckCircle, {}) : _jsx(Error, {}), label: name, color: present ? 'success' : 'error', variant: "outlined", sx: {
                    minWidth: 120,
                    fontSize: '0.875rem',
                    padding: 1,
                } }), confidence !== undefined && (_jsxs(Typography, { variant: "caption", color: "text.secondary", children: [Math.round(confidence * 100), "% de confiance"] }))] }));
};
export default EquipmentBadge;

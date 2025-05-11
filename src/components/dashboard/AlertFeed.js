import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Chip, Box, IconButton, Menu, MenuItem, Skeleton, useTheme, Button, ListItemIcon } from '@mui/material';
import { Warning as WarningIcon, MoreVert as MoreVertIcon, Email as EmailIcon, CheckCircle as CheckCircleIcon, Error as ErrorIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getAlertHistory } from '../services/alertService';
export const AlertFeed = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAlert, setSelectedAlert] = useState(null);
    const theme = useTheme();
    const fetchAlerts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getAlertHistory();
            // Assurez-vous que response.data est bien un tableau d'Alert
            const alertsData = response.data.map(alert => ({
                id: alert.id,
                recipient: alert.recipient,
                status: alert.status,
                timestamp: alert.timestamp,
                missingItems: alert.missingItems
            }));
            setAlerts(alertsData);
        }
        catch (err) {
            setError('Erreur lors du chargement des alertes');
            console.error('Error fetching alerts:', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAlerts();
    }, []);
    const handleMenuOpen = (event, alert) => {
        setAnchorEl(event.currentTarget);
        setSelectedAlert(alert);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedAlert(null);
    };
    const handleRefresh = () => {
        fetchAlerts();
    };
    const handleResend = () => {
        if (selectedAlert) {
            console.log('Resending alert to:', selectedAlert.recipient);
            // Ici vous ajouteriez la logique pour renvoyer l'alerte
        }
        handleMenuClose();
    };
    const getStatusConfig = (status) => {
        const config = {
            icon: _jsx(WarningIcon, {}),
            label: 'Inconnu',
            color: 'default',
        };
        switch (status) {
            case 'sent':
                return {
                    ...config,
                    icon: _jsx(EmailIcon, {}),
                    label: 'Envoyé',
                    color: 'info',
                };
            case 'delivered':
                return {
                    ...config,
                    icon: _jsx(CheckCircleIcon, {}),
                    label: 'Livré',
                    color: 'success',
                };
            case 'read':
                return {
                    ...config,
                    icon: _jsx(CheckCircleIcon, {}),
                    label: 'Lu',
                    color: 'success',
                };
            case 'failed':
                return {
                    ...config,
                    icon: _jsx(ErrorIcon, {}),
                    label: 'Échec',
                    color: 'error',
                };
            default:
                return config;
        }
    };
    if (error) {
        return (_jsx(Card, { children: _jsxs(CardContent, { children: [_jsx(Typography, { color: "error", align: "center", children: error }), _jsx(Box, { display: "flex", justifyContent: "center", mt: 2, children: _jsx(Button, { variant: "outlined", startIcon: _jsx(RefreshIcon, {}), onClick: handleRefresh, children: "R\u00E9essayer" }) })] }) }));
    }
    return (_jsxs(Card, { sx: { height: '100%' }, children: [_jsx(CardHeader, { title: _jsx(Typography, { variant: "h6", component: "div", children: "Historique des alertes" }), action: _jsx(IconButton, { onClick: handleRefresh, disabled: loading, children: _jsx(RefreshIcon, {}) }), sx: { borderBottom: `1px solid ${theme.palette.divider}` } }), _jsx(CardContent, { sx: { p: 0 }, children: loading && alerts.length === 0 ? (_jsx(Box, { p: 2, children: [...Array(3)].map((_, index) => (_jsxs(React.Fragment, { children: [_jsxs(Box, { display: "flex", alignItems: "center", py: 2, children: [_jsx(Skeleton, { variant: "circular", width: 40, height: 40 }), _jsxs(Box, { ml: 2, flexGrow: 1, children: [_jsx(Skeleton, { width: "60%", height: 24 }), _jsx(Skeleton, { width: "40%", height: 20 })] })] }), index < 2 && _jsx(Divider, {})] }, index))) })) : alerts.length === 0 ? (_jsxs(Box, { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 4, textAlign: "center", children: [_jsx(EmailIcon, { fontSize: "large", color: "disabled" }), _jsx(Typography, { variant: "body1", color: "textSecondary", mt: 2, children: "Aucune alerte envoy\u00E9e pour le moment" })] })) : (_jsx(List, { sx: { width: '100%' }, children: alerts.map((alert, index) => {
                        const statusConfig = getStatusConfig(alert.status);
                        return (_jsxs(React.Fragment, { children: [_jsxs(ListItem, { alignItems: "flex-start", secondaryAction: _jsx(IconButton, { edge: "end", "aria-label": "actions", onClick: (e) => handleMenuOpen(e, alert), children: _jsx(MoreVertIcon, {}) }), children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { sx: { bgcolor: `${statusConfig.color}.light` }, children: statusConfig.icon }) }), _jsx(ListItemText, { primary: _jsxs(Box, { sx: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mb: 1,
                                                    flexWrap: 'wrap',
                                                    gap: 1,
                                                }, children: [_jsx(Typography, { component: "span", variant: "subtitle2", sx: { fontWeight: 500 }, children: alert.recipient }), _jsx(Chip, { label: statusConfig.label, size: "small", color: statusConfig.color, variant: "outlined" })] }), secondary: _jsxs(_Fragment, { children: [_jsx(Typography, { component: "span", variant: "body2", color: "text.secondary", display: "block", children: formatDistanceToNow(new Date(alert.timestamp), {
                                                            addSuffix: true,
                                                            locale: fr,
                                                        }) }), _jsx(Box, { sx: {
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            gap: 0.5,
                                                            mt: 1,
                                                        }, children: alert.missingItems.map((item) => (_jsx(Chip, { label: item, size: "small", color: "error", variant: "outlined" }, item))) })] }) })] }), index < alerts.length - 1 && (_jsx(Divider, { variant: "inset", component: "li" }))] }, alert.id));
                    }) })) }), _jsxs(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleMenuClose, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, children: [_jsxs(MenuItem, { onClick: handleResend, disabled: selectedAlert?.status === 'read', children: [_jsx(ListItemIcon, { children: _jsx(EmailIcon, { fontSize: "small" }) }), _jsx(ListItemText, { children: "Renvoyer" })] }), _jsxs(MenuItem, { onClick: handleMenuClose, children: [_jsx(ListItemIcon, { children: _jsx(ErrorIcon, { fontSize: "small" }) }), _jsx(ListItemText, { children: "Marquer comme \u00E9chec" })] })] })] }));
};
export default AlertFeed;

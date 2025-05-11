import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
export const Header = () => {
    return (_jsx(AppBar, { position: "static", elevation: 0, children: _jsxs(Toolbar, { children: [_jsx(Typography, { variant: "h6", component: "div", sx: { flexGrow: 1 }, children: "Safety Equipment Detection" }), _jsx(IconButton, { color: "inherit", children: _jsx(Badge, { badgeContent: 4, color: "error", children: _jsx(NotificationsIcon, {}) }) })] }) }));
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { Header } from './components/layout/Header';
import { DashboardPage } from './pages/DashboardPage';
import { DetectionPage } from './pages/DetectionPage';
import { AlertsPage } from './pages/AlertsPage';
function App() {
    return (_jsxs(Router, { children: [_jsx(CssBaseline, {}), _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', minHeight: '100vh' }, children: [_jsx(Header, {}), _jsx(Box, { component: "main", sx: { flexGrow: 1, p: 3 }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/detection", element: _jsx(DetectionPage, {}) }), _jsx(Route, { path: "/alerts", element: _jsx(AlertsPage, {}) })] }) })] })] }));
}
export default App;

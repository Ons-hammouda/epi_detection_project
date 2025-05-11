import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { Header } from './components/layout/Header';
import { DashboardPage } from './pages/DashboardPage';
import { DetectionPage } from './pages/DetectionPage';
import { AlertsPage } from './pages/AlertsPage';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/detection" element={<DetectionPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  useTheme,
  Button,
  ListItemIcon
} from '@mui/material';
import {
  Warning as WarningIcon,
  MoreVert as MoreVertIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getAlertHistory } from '../services/alertService';

type AlertStatus = 'sent' | 'delivered' | 'read' | 'failed';

interface Alert {
  id: string;
  recipient: string;
  status: AlertStatus;
  timestamp: string;
  missingItems: string[];
}

interface AlertHistoryResponse {
  data: Alert[];
  total?: number;
  page?: number;
  limit?: number;
}

export const AlertFeed = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const theme = useTheme();

  const fetchAlerts = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await getAlertHistory();
    // Assurez-vous que response.data est bien un tableau d'Alert
    const alertsData: Alert[] = response.data.map(alert => ({
      id: alert.id,
      recipient: alert.recipient,
      status: alert.status,
      timestamp: alert.timestamp,
      missingItems: alert.missingItems
    }));
    setAlerts(alertsData);
  } catch (err) {
    setError('Erreur lors du chargement des alertes');
    console.error('Error fetching alerts:', err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, alert: Alert) => {
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

  const getStatusConfig = (status: AlertStatus) => {
    const config = {
      icon: <WarningIcon />,
      label: 'Inconnu',
      color: 'default' as const,
    };

    switch (status) {
      case 'sent':
        return {
          ...config,
          icon: <EmailIcon />,
          label: 'Envoyé',
          color: 'info',
        };
      case 'delivered':
        return {
          ...config,
          icon: <CheckCircleIcon />,
          label: 'Livré',
          color: 'success',
        };
      case 'read':
        return {
          ...config,
          icon: <CheckCircleIcon />,
          label: 'Lu',
          color: 'success',
        };
      case 'failed':
        return {
          ...config,
          icon: <ErrorIcon />,
          label: 'Échec',
          color: 'error',
        };
      default:
        return config;
    }
  };

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography color="error" align="center">
            {error}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
            >
              Réessayer
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            Historique des alertes
          </Typography>
        }
        action={
          <IconButton onClick={handleRefresh} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        }
        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
      />
      <CardContent sx={{ p: 0 }}>
        {loading && alerts.length === 0 ? (
          <Box p={2}>
            {[...Array(3)].map((_, index) => (
              <React.Fragment key={index}>
                <Box display="flex" alignItems="center" py={2}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box ml={2} flexGrow={1}>
                    <Skeleton width="60%" height={24} />
                    <Skeleton width="40%" height={20} />
                  </Box>
                </Box>
                {index < 2 && <Divider />}
              </React.Fragment>
            ))}
          </Box>
        ) : alerts.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            textAlign="center"
          >
            <EmailIcon fontSize="large" color="disabled" />
            <Typography variant="body1" color="textSecondary" mt={2}>
              Aucune alerte envoyée pour le moment
            </Typography>
          </Box>
        ) : (
          <List sx={{ width: '100%' }}>
            {alerts.map((alert, index) => {
              const statusConfig = getStatusConfig(alert.status);
              return (
                <React.Fragment key={alert.id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="actions"
                        onClick={(e: React.MouseEvent<HTMLElement>) => handleMenuOpen(e, alert)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: `${statusConfig.color}.light` }}>
                        {statusConfig.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            flexWrap: 'wrap',
                            gap: 1,
                          }}
                        >
                          <Typography
                            component="span"
                            variant="subtitle2"
                            sx={{ fontWeight: 500 }}
                          >
                            {alert.recipient}
                          </Typography>
                          <Chip
                            label={statusConfig.label}
                            size="small"
                            color={statusConfig.color as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            display="block"
                          >
                            {formatDistanceToNow(new Date(alert.timestamp), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 0.5,
                              mt: 1,
                            }}
                          >
                            {alert.missingItems.map((item) => (
                              <Chip
                                key={item}
                                label={item}
                                size="small"
                                color="error"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                  {index < alerts.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              );
            })}
          </List>
        )}
      </CardContent>

      {/* Menu contextuel */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleResend} disabled={selectedAlert?.status === 'read'}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Renvoyer</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ErrorIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Marquer comme échec</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default AlertFeed;
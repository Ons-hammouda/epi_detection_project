import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { Warning, Close, Send } from '@mui/icons-material';

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  missingItems: string[];
  onSubmit: (email: string, message: string) => Promise<void>;
}

export const AlertModal = ({ open, onClose, missingItems, onSubmit }: AlertModalProps) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setIsSending(true);
    try {
      await onSubmit(email, message || generateDefaultMessage());
      onClose();
    } catch (err) {
      setError('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSending(false);
    }
  };

  const generateDefaultMessage = () => {
    return `Alerte sécurité: Les équipements suivants sont manquants: ${missingItems.join(', ')}. 
Veuillez régulariser cette situation immédiatement.`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Warning color="error" sx={{ mr: 1 }} />
          <Typography variant="h6">Envoyer une alerte</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Équipements manquants:
          </Typography>
          <List dense>
            {missingItems.map((item) => (
              <ListItem key={item}>
                <ListItemIcon>
                  <Warning color="error" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        <TextField
          fullWidth
          margin="normal"
          label="Email du destinataire"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={generateDefaultMessage()}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<Close />} disabled={isSending}>
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          color="error"
          variant="contained"
          startIcon={isSending ? <CircularProgress size={20} /> : <Send />}
          disabled={isSending}
        >
          {isSending ? 'Envoi en cours...' : 'Envoyer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AlertModal;

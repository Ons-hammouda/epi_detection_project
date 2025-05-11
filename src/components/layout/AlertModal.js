import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress, } from '@mui/material';
import { Warning, Close, Send } from '@mui/icons-material';
export const AlertModal = ({ open, onClose, missingItems, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.includes('@')) {
            setError('Veuillez entrer une adresse email valide');
            return;
        }
        setIsSending(true);
        try {
            await onSubmit(email, message || generateDefaultMessage());
            onClose();
        }
        catch (err) {
            setError('Erreur lors de l\'envoi. Veuillez réessayer.');
        }
        finally {
            setIsSending(false);
        }
    };
    const generateDefaultMessage = () => {
        return `Alerte sécurité: Les équipements suivants sont manquants: ${missingItems.join(', ')}. 
Veuillez régulariser cette situation immédiatement.`;
    };
    return (_jsxs(Dialog, { open: open, onClose: onClose, maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { children: _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(Warning, { color: "error", sx: { mr: 1 } }), _jsx(Typography, { variant: "h6", children: "Envoyer une alerte" })] }) }), _jsxs(DialogContent, { children: [_jsxs(Box, { sx: { my: 2 }, children: [_jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: "\u00C9quipements manquants:" }), _jsx(List, { dense: true, children: missingItems.map((item) => (_jsxs(ListItem, { children: [_jsx(ListItemIcon, { children: _jsx(Warning, { color: "error" }) }), _jsx(ListItemText, { primary: item })] }, item))) })] }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Email du destinataire", variant: "outlined", required: true, value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "Message", variant: "outlined", multiline: true, rows: 4, value: message, onChange: (e) => setMessage(e.target.value), placeholder: generateDefaultMessage() }), error && (_jsx(Typography, { color: "error", variant: "body2", sx: { mt: 1 }, children: error }))] }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: onClose, startIcon: _jsx(Close, {}), disabled: isSending, children: "Annuler" }), _jsx(Button, { onClick: handleSubmit, color: "error", variant: "contained", startIcon: isSending ? _jsx(CircularProgress, { size: 20 }) : _jsx(Send, {}), disabled: isSending, children: isSending ? 'Envoi en cours...' : 'Envoyer' })] })] }));
};
export default AlertModal;

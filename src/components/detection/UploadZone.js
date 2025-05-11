import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress, Paper, Button, styled, } from '@mui/material';
import { CloudUpload, ChangeCircle } from '@mui/icons-material';
const DropzonePaper = styled(Paper)(({ theme }) => ({
    border: `2px dashed ${theme.palette.divider}`,
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
}));
export const UploadZone = ({ onFileAccepted, isLoading }) => {
    const [preview, setPreview] = useState(null);
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            onFileAccepted(file);
        }
    }, [onFileAccepted]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        maxFiles: 1,
        disabled: isLoading,
    });
    return (_jsx(Box, { sx: { mb: 4 }, children: _jsxs(DropzonePaper, { ...getRootProps(), children: [_jsx("input", { ...getInputProps() }), isLoading ? (_jsxs(Box, { sx: {
                        py: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }, children: [_jsx(CircularProgress, { size: 40, color: "primary" }), _jsx(Typography, { variant: "body1", sx: { mt: 2 }, children: "Analyse en cours..." })] })) : preview ? (_jsxs(Box, { sx: {
                        position: 'relative',
                        '&:hover .change-button': { opacity: 1 },
                    }, children: [_jsx(Box, { component: "img", src: preview, alt: "Preview", sx: { maxHeight: 300, mx: 'auto', borderRadius: 1 } }), _jsx(Box, { className: "change-button", sx: {
                                position: 'absolute',
                                inset: 0,
                                bgcolor: 'rgba(0,0,0,0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                borderRadius: 1,
                            }, children: _jsx(Button, { variant: "contained", startIcon: _jsx(ChangeCircle, {}), sx: { bgcolor: 'background.paper', color: 'text.primary' }, children: "Changer d'image" }) })] })) : (_jsxs(_Fragment, { children: [_jsx(CloudUpload, { sx: { fontSize: 48, color: 'text.secondary', mb: 2 } }), _jsx(Typography, { variant: "h6", component: "p", sx: { mb: 1 }, children: isDragActive ? 'Déposez votre image ici' : 'Glissez-déposez une image' }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "ou cliquez pour s\u00E9lectionner" }), _jsx(Typography, { variant: "caption", color: "text.disabled", display: "block", sx: { mt: 2 }, children: "Formats support\u00E9s: JPG, PNG" })] }))] }) }));
};

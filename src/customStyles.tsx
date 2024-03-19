import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Example primary color
        },
        secondary: {
            main: '#dc004e', // Example secondary color
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '1rem',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.2,
            marginBottom: '0.75rem',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            lineHeight: 1.2,
            marginBottom: '0.5rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '1rem',
        },
        button: {
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '5px',
                    color: "red"
                },
                containedPrimary: {
                    backgroundColor: '#1976d2',
                    '&:hover': {
                        backgroundColor: '#1565c0',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#dc004e',
                    '&:hover': {
                        backgroundColor: '#b20041',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: '100%',
                },
            },
        },
    },
});

export default customTheme;

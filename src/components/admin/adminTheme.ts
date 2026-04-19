import { defaultTheme } from 'react-admin';

export const adminTheme = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      main: '#7e22ce',
      light: '#9333ea',
      dark: '#6b21a8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    ...defaultTheme.typography,
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    ...defaultTheme.components,
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: '2px 8px',
          paddingLeft: 16,
          '&.RaMenuItemLink-active': {
            backgroundColor: '#f5f3ff',
            color: '#7e22ce',
            fontWeight: 600,
            '& .MuiSvgIcon-root': {
              color: '#7e22ce',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorSecondary: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          borderBottom: '1px solid #e2e8f0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none' as const,
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: '#475569',
          fontSize: '0.75rem',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.05em',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 600,
        },
      },
    },
  },
};

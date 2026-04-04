'use client';

import { Layout, Menu, useGetIdentity, Logout } from 'react-admin';
import {
  Construction, FolderOpen, Article, Category,
  People, Email, RequestQuote,
  Image as ImageIcon, Menu as MenuIcon, TravelExplore,
  Dashboard as DashboardIcon, Settings as SettingsIcon,
  Description, ExitToApp,
} from '@mui/icons-material';
import { Box, Typography, Divider, Avatar, alpha } from '@mui/material';

function AdminMenu() {
  return (
    <Menu>
      <Menu.DashboardItem primaryText="Kontrol Paneli" leftIcon={<DashboardIcon />} />

      <Box sx={{ px: 2, pt: 2.5, pb: 0.5 }}>
        <Typography variant="overline" sx={{
          color: 'text.disabled', fontSize: '0.6rem',
          fontWeight: 800, letterSpacing: '0.12em',
        }}>
          İçerik Yönetimi
        </Typography>
      </Box>
      <Menu.ResourceItem name="services" primaryText="Hizmetler" leftIcon={<Construction />} />
      <Menu.ResourceItem name="projects" primaryText="Projeler" leftIcon={<FolderOpen />} />
      <Menu.ResourceItem name="blog-posts" primaryText="Blog Yazıları" leftIcon={<Article />} />
      <Menu.ResourceItem name="team-members" primaryText="Ekip" leftIcon={<People />} />
      <Menu.ResourceItem name="page-contents" primaryText="Sayfa İçerikleri" leftIcon={<Description />} />

      <Box sx={{ px: 2, pt: 2.5, pb: 0.5 }}>
        <Typography variant="overline" sx={{
          color: 'text.disabled', fontSize: '0.6rem',
          fontWeight: 800, letterSpacing: '0.12em',
        }}>
          Kategoriler
        </Typography>
      </Box>
      <Menu.ResourceItem name="blog-categories" primaryText="Blog Kategorileri" leftIcon={<Category />} />
      <Menu.ResourceItem name="project-categories" primaryText="Proje Kategorileri" leftIcon={<Category />} />

      <Box sx={{ px: 2, pt: 2.5, pb: 0.5 }}>
        <Typography variant="overline" sx={{
          color: 'text.disabled', fontSize: '0.6rem',
          fontWeight: 800, letterSpacing: '0.12em',
        }}>
          Müşteri İlişkileri
        </Typography>
      </Box>
      <Menu.ResourceItem name="contact-messages" primaryText="Mesajlar" leftIcon={<Email />} />
      <Menu.ResourceItem name="quote-requests" primaryText="Teklif Talepleri" leftIcon={<RequestQuote />} />

      <Divider sx={{ my: 1.5, mx: 2, borderColor: alpha('#000', 0.06) }} />

      <Box sx={{ px: 2, pt: 1, pb: 0.5 }}>
        <Typography variant="overline" sx={{
          color: 'text.disabled', fontSize: '0.6rem',
          fontWeight: 800, letterSpacing: '0.12em',
        }}>
          Ayarlar
        </Typography>
      </Box>
      <Menu.ResourceItem name="seo-entries" primaryText="SEO" leftIcon={<TravelExplore />} />
      <Menu.ResourceItem name="media" primaryText="Medya" leftIcon={<ImageIcon />} />
      <Menu.ResourceItem name="menu-items" primaryText="Menüler" leftIcon={<MenuIcon />} />
      <Menu.Item to="/site-settings" primaryText="Site Ayarları" leftIcon={<SettingsIcon />} />
    </Menu>
  );
}

function CustomAppBar() {
  const { data } = useGetIdentity();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        ml: 'auto',
        pr: 2,
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 800,
          fontSize: 15,
          boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
        }}
      >
        T
      </Box>
      <Typography variant="subtitle1" fontWeight={700} color="text.primary">
        TechCo Yönetim
      </Typography>
      {data?.fullName && (
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          {data.fullName}
        </Typography>
      )}
    </Box>
  );
}

export function AdminLayout(props: { children: React.ReactNode }) {
  return (
    <Layout
      {...props}
      menu={AdminMenu}
      appBar={CustomAppBar}
      sx={{
        '& .RaSidebar-fixed': {
          backgroundColor: '#ffffff',
          borderRight: '1px solid',
          borderColor: alpha('#000', 0.06),
        },
        '& .RaLayout-content': {
          backgroundColor: '#f8fafc',
          padding: '24px !important',
        },
        '& .RaMenuItemLink-active': {
          borderRight: '3px solid #4f46e5',
          backgroundColor: alpha('#4f46e5', 0.06),
          color: '#4f46e5 !important',
          fontWeight: '600 !important',
        },
      }}
    />
  );
}

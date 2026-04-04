'use client';

import { useEffect, useState } from 'react';
import { useGetIdentity } from 'react-admin';
import {
  Box, Card, CardContent, Typography, Grid, Chip, Skeleton,
  Avatar, IconButton, LinearProgress, Paper, Stack, Tooltip,
  alpha,
} from '@mui/material';
import {
  Construction, FolderOpen, Article, People,
  Email, RequestQuote, OpenInNew, Add,
  CalendarMonth, AccessTime, ArrowForward,
  TrendingUp, Visibility, Circle,
  Web, Edit as EditIcon,
} from '@mui/icons-material';

interface DashboardData {
  stats: {
    totalServices: number;
    totalProjects: number;
    totalPosts: number;
    totalTeam: number;
    unreadMessages: number;
    pendingQuotes: number;
  };
  recentMessages: Array<{ id: string; name: string; subject: string; createdAt: string; status: string }>;
  recentQuotes: Array<{ id: string; name: string; company: string; createdAt: string; status: string }>;
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  UNREAD: { label: 'Okunmadı', color: '#ef4444', bg: '#fef2f2' },
  READ: { label: 'Okundu', color: '#3b82f6', bg: '#eff6ff' },
  REPLIED: { label: 'Yanıtlandı', color: '#10b981', bg: '#ecfdf5' },
  ARCHIVED: { label: 'Arşivlendi', color: '#6b7280', bg: '#f3f4f6' },
  PENDING: { label: 'Bekliyor', color: '#f59e0b', bg: '#fffbeb' },
  IN_REVIEW: { label: 'İnceleniyor', color: '#3b82f6', bg: '#eff6ff' },
  QUOTED: { label: 'Teklif Verildi', color: '#8b5cf6', bg: '#f5f3ff' },
  ACCEPTED: { label: 'Kabul Edildi', color: '#10b981', bg: '#ecfdf5' },
  REJECTED: { label: 'Reddedildi', color: '#ef4444', bg: '#fef2f2' },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 6) return 'İyi geceler';
  if (h < 12) return 'Günaydın';
  if (h < 18) return 'İyi günler';
  return 'İyi akşamlar';
}

function StatCard({ label, value, icon: Icon, gradient, loading }: {
  label: string; value: number; icon: React.ElementType; gradient: string; loading: boolean;
}) {
  return (
    <Card sx={{
      height: '100%',
      borderRadius: 3,
      border: 'none',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      transition: 'all 0.2s ease',
      '&:hover': {
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        transform: 'translateY(-2px)',
      },
    }}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        {loading ? (
          <Box>
            <Skeleton variant="circular" width={40} height={40} sx={{ mb: 1.5 }} />
            <Skeleton width="40%" height={32} />
            <Skeleton width="60%" height={18} />
          </Box>
        ) : (
          <>
            <Avatar sx={{
              width: 42, height: 42, mb: 1.5,
              background: gradient,
              boxShadow: `0 4px 12px ${alpha('#000', 0.1)}`,
            }}>
              <Icon sx={{ fontSize: 22, color: '#fff' }} />
            </Avatar>
            <Typography variant="h4" fontWeight={800} lineHeight={1} sx={{ mb: 0.5 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {label}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityItem({ name, subtitle, date, status, href }: {
  name: string; subtitle: string; date: string; status: string; href: string;
}) {
  const s = STATUS_MAP[status] || { label: status, color: '#6b7280', bg: '#f3f4f6' };
  return (
    <Box
      component="a"
      href={href}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 1.5,
        borderRadius: 2,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.15s ease',
        '&:hover': { bgcolor: '#f8fafc', '& .arrow': { opacity: 1, transform: 'translateX(0)' } },
      }}
    >
      <Avatar sx={{ width: 36, height: 36, bgcolor: s.bg, fontSize: '0.8rem', fontWeight: 700, color: s.color }}>
        {name.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" fontWeight={600} noWrap>
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Chip
          label={s.label}
          size="small"
          sx={{
            bgcolor: s.bg, color: s.color, fontWeight: 600,
            fontSize: '0.65rem', height: 22, mb: 0.5,
          }}
        />
        <Typography variant="caption" color="text.disabled" display="block">
          {formatDate(date)}
        </Typography>
      </Box>
      <ArrowForward className="arrow" sx={{ fontSize: 16, color: 'text.disabled', opacity: 0, transform: 'translateX(-4px)', transition: 'all 0.15s ease' }} />
    </Box>
  );
}

const QUICK_ACTIONS = [
  { label: 'Siteyi Görüntüle', href: '/tr', icon: Web, color: '#4f46e5' },
  { label: 'Yeni Yazı', href: '#/blog-posts/create', icon: Add, color: '#10b981' },
  { label: 'Yeni Proje', href: '#/projects/create', icon: FolderOpen, color: '#f59e0b' },
  { label: 'Yeni Hizmet', href: '#/services/create', icon: Construction, color: '#8b5cf6' },
  { label: 'SEO Düzenle', href: '#/seo-entries', icon: EditIcon, color: '#ec4899' },
];

const STAT_CONFIG = [
  { key: 'totalServices', label: 'Hizmetler', icon: Construction, gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' },
  { key: 'totalProjects', label: 'Projeler', icon: FolderOpen, gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)' },
  { key: 'totalPosts', label: 'Blog Yazıları', icon: Article, gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' },
  { key: 'totalTeam', label: 'Ekip Üyeleri', icon: People, gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' },
  { key: 'unreadMessages', label: 'Okunmamış Mesajlar', icon: Email, gradient: 'linear-gradient(135deg, #ef4444 0%, #f97171 100%)' },
  { key: 'pendingQuotes', label: 'Bekleyen Teklifler', icon: RequestQuote, gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' },
] as const;

export function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const { data: identity } = useGetIdentity();
  const loading = !data;

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const today = new Date();
  const dateStr = today.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = today.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3.5,
          mb: 3,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{
          position: 'absolute', top: -60, right: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: -30, right: 60,
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, opacity: 0.85 }}>
            <CalendarMonth sx={{ fontSize: 16 }} />
            <Typography variant="body2" fontWeight={500}>
              {dateStr}
            </Typography>
            <Box sx={{ mx: 0.5 }}>·</Box>
            <AccessTime sx={{ fontSize: 16 }} />
            <Typography variant="body2" fontWeight={500}>
              {timeStr}
            </Typography>
          </Box>

          <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
            {getGreeting()}{identity?.fullName ? `, ${identity.fullName}` : ''}!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            Sitenizde neler olduğuna göz atın ve içeriklerinizi yönetin.
          </Typography>
        </Box>
      </Paper>

      {/* Quick Actions */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ mb: 1.5, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.08em' }}>
          Hızlı İşlemler
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {QUICK_ACTIONS.map(({ label, href, icon: Icon, color }) => (
            <Chip
              key={label}
              label={label}
              icon={<Icon sx={{ fontSize: '16px !important', color: `${color} !important` }} />}
              component="a"
              href={href}
              clickable
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: 0.5,
                bgcolor: alpha(color, 0.08),
                color,
                border: `1px solid ${alpha(color, 0.15)}`,
                '&:hover': { bgcolor: alpha(color, 0.15) },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {STAT_CONFIG.map(({ key, label, icon, gradient }) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={key}>
            <StatCard
              label={label}
              value={data?.stats[key as keyof typeof data.stats] ?? 0}
              icon={icon}
              gradient={gradient}
              loading={loading}
            />
          </Grid>
        ))}
      </Grid>

      {/* Activity Section */}
      <Grid container spacing={3}>
        {/* Recent Messages */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                px: 2.5, pt: 2.5, pb: 1.5,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#fef2f2' }}>
                    <Email sx={{ fontSize: 18, color: '#ef4444' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>Son Mesajlar</Typography>
                    {data && (
                      <Typography variant="caption" color="text.disabled">
                        {data.stats.unreadMessages} okunmamış
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Tooltip title="Tümünü Gör">
                  <IconButton size="small" href="#/contact-messages" sx={{ color: 'text.secondary' }}>
                    <OpenInNew sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Box>

              {loading && (
                <Box sx={{ px: 2.5, pb: 2 }}>
                  <LinearProgress sx={{ borderRadius: 2, mb: 2 }} />
                  {[1, 2, 3].map(i => <Skeleton key={i} variant="rounded" height={52} sx={{ mb: 1, borderRadius: 2 }} />)}
                </Box>
              )}

              {data && data.recentMessages.length === 0 && (
                <Box sx={{ py: 5, textAlign: 'center' }}>
                  <Email sx={{ fontSize: 40, color: '#e2e8f0', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Henüz mesaj yok
                  </Typography>
                </Box>
              )}

              {data && data.recentMessages.length > 0 && (
                <Box sx={{ pb: 1 }}>
                  {data.recentMessages.map((m) => (
                    <ActivityItem
                      key={m.id}
                      name={m.name}
                      subtitle={m.subject}
                      date={m.createdAt}
                      status={m.status}
                      href={`#/contact-messages/${m.id}/show`}
                    />
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Quotes */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                px: 2.5, pt: 2.5, pb: 1.5,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#f5f3ff' }}>
                    <TrendingUp sx={{ fontSize: 18, color: '#8b5cf6' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>Son Teklif Talepleri</Typography>
                    {data && (
                      <Typography variant="caption" color="text.disabled">
                        {data.stats.pendingQuotes} bekliyor
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Tooltip title="Tümünü Gör">
                  <IconButton size="small" href="#/quote-requests" sx={{ color: 'text.secondary' }}>
                    <OpenInNew sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Box>

              {loading && (
                <Box sx={{ px: 2.5, pb: 2 }}>
                  <LinearProgress sx={{ borderRadius: 2, mb: 2 }} />
                  {[1, 2, 3].map(i => <Skeleton key={i} variant="rounded" height={52} sx={{ mb: 1, borderRadius: 2 }} />)}
                </Box>
              )}

              {data && data.recentQuotes.length === 0 && (
                <Box sx={{ py: 5, textAlign: 'center' }}>
                  <RequestQuote sx={{ fontSize: 40, color: '#e2e8f0', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Henüz teklif talebi yok
                  </Typography>
                </Box>
              )}

              {data && data.recentQuotes.length > 0 && (
                <Box sx={{ pb: 1 }}>
                  {data.recentQuotes.map((q) => (
                    <ActivityItem
                      key={q.id}
                      name={q.name}
                      subtitle={q.company || 'Bireysel'}
                      date={q.createdAt}
                      status={q.status}
                      href={`#/quote-requests/${q.id}/show`}
                    />
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

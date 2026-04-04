'use client';

import { useEffect, useState } from 'react';
import { Title, useNotify } from 'react-admin';
import {
  Box, Card, CardContent, CardHeader, TextField, Button,
  Grid, Typography, CircularProgress, Divider,
} from '@mui/material';
import { Save } from '@mui/icons-material';

interface SettingValue {
  [key: string]: unknown;
}

interface SettingItem {
  id: string;
  key: string;
  value: SettingValue;
  group: string;
}

const SETTING_FIELDS: Record<string, { label: string; fields: { key: string; label: string; path: string }[] }> = {
  contact: {
    label: 'Contact Information',
    fields: [
      { key: 'contact_address', label: 'Address', path: 'display' },
      { key: 'contact_phone', label: 'Phone (Display)', path: 'display' },
      { key: 'contact_phone', label: 'Phone (Link)', path: 'href' },
      { key: 'contact_email', label: 'Email (Display)', path: 'display' },
      { key: 'contact_email', label: 'Email (Link)', path: 'href' },
      { key: 'contact_hours', label: 'Business Hours', path: 'display' },
      { key: 'contact_map_url', label: 'Google Maps Embed URL', path: 'url' },
    ],
  },
  social: {
    label: 'Social Media Links',
    fields: [
      { key: 'social_linkedin', label: 'LinkedIn URL', path: 'url' },
      { key: 'social_twitter', label: 'Twitter URL', path: 'url' },
      { key: 'social_instagram', label: 'Instagram URL', path: 'url' },
      { key: 'social_github', label: 'GitHub URL', path: 'url' },
    ],
  },
  branding: {
    label: 'Branding',
    fields: [
      { key: 'company_name', label: 'Company Name', path: 'name' },
      { key: 'company_name', label: 'Logo Text', path: 'logoText' },
      { key: 'whatsapp', label: 'WhatsApp Phone', path: 'phone' },
      { key: 'whatsapp', label: 'WhatsApp Message (TR)', path: 'messageTr' },
      { key: 'whatsapp', label: 'WhatsApp Message (EN)', path: 'messageEn' },
    ],
  },
  stats: {
    label: 'Statistics',
    fields: [
      { key: 'stats_projects', label: 'Projects Count', path: 'value' },
      { key: 'stats_projects', label: 'Projects Suffix', path: 'suffix' },
      { key: 'stats_clients', label: 'Clients Count', path: 'value' },
      { key: 'stats_clients', label: 'Clients Suffix', path: 'suffix' },
      { key: 'stats_years', label: 'Years Count', path: 'value' },
      { key: 'stats_years', label: 'Years Suffix', path: 'suffix' },
      { key: 'stats_team', label: 'Team Count', path: 'value' },
      { key: 'stats_team', label: 'Team Suffix', path: 'suffix' },
    ],
  },
};

export function SiteSettingsPage() {
  const [settings, setSettings] = useState<SettingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const notify = useNotify();

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then((data: SettingItem[]) => { setSettings(data); setLoading(false); })
      .catch(() => { notify('Failed to load settings', { type: 'error' }); setLoading(false); });
  }, [notify]);

  const getFieldValue = (key: string, path: string): string => {
    const setting = settings.find(s => s.key === key);
    if (!setting) return '';
    const val = (setting.value as Record<string, unknown>)?.[path];
    return val != null ? String(val) : '';
  };

  const setFieldValue = (key: string, path: string, value: string) => {
    setSettings(prev => {
      const existing = prev.find(s => s.key === key);
      if (existing) {
        return prev.map(s =>
          s.key === key
            ? { ...s, value: { ...(s.value as Record<string, unknown>), [path]: isNaN(Number(value)) ? value : Number(value) } }
            : s
        );
      }
      // Create new
      const group = Object.entries(SETTING_FIELDS).find(([, v]) => v.fields.some(f => f.key === key))?.[0] || 'general';
      return [...prev, { id: '', key, value: { [path]: value }, group }];
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = settings.map(s => ({ key: s.key, value: s.value, group: s.group }));
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        notify('Settings saved successfully', { type: 'success' });
      } else {
        notify('Failed to save settings', { type: 'error' });
      }
    } catch {
      notify('Failed to save settings', { type: 'error' });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Title title="Site Settings" />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Site Settings</Typography>
        <Button
          variant="contained"
          startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <Save />}
          onClick={handleSave}
          disabled={saving}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 3 }}
        >
          {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {Object.entries(SETTING_FIELDS).map(([group, config]) => (
          <Grid item xs={12} md={6} key={group}>
            <Card>
              <CardHeader
                title={config.label}
                titleTypographyProps={{ variant: 'subtitle1', fontWeight: 700 }}
                sx={{ pb: 0 }}
              />
              <Divider sx={{ mx: 2, mt: 1 }} />
              <CardContent>
                <Grid container spacing={2}>
                  {config.fields.map((field, idx) => (
                    <Grid item xs={12} key={`${field.key}-${field.path}-${idx}`}>
                      <TextField
                        label={field.label}
                        value={getFieldValue(field.key, field.path)}
                        onChange={(e) => setFieldValue(field.key, field.path, e.target.value)}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

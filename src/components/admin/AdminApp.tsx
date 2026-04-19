'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Admin, Resource, CustomRoutes,
  List, Datagrid, TextField, DateField, BooleanField, NumberField,
  FunctionField, ImageField,
  Edit, Create,
  Show, SimpleShowLayout,
  TabbedForm, FormTab,
  TextInput, BooleanInput, NumberInput, SelectInput,
  ArrayInput, SimpleFormIterator,
  SearchInput, DateInput, NullableBooleanInput,
  BulkUpdateButton, BulkDeleteButton,
  useInput,
} from 'react-admin';
import { Route } from 'react-router-dom';
import {
  Construction, FolderOpen, Category,
  Email, RequestQuote,
  Image as ImageIcon, Menu as MenuIcon, TravelExplore,
  Description, CloudUpload, PhotoLibrary, DeleteOutline,
  MarkEmailUnread, Drafts, Reply, Archive,
  HourglassEmpty, Visibility, DescriptionOutlined, CheckCircle, Cancel,
  ManageAccounts,
} from '@mui/icons-material';
import {
  Chip, Box, Button, Typography, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, Stack,
  Grid as MuiGrid,
} from '@mui/material';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { AdminDashboard } from './Dashboard';
import { AdminLayout } from './AdminLayout';
import { adminTheme } from './adminTheme';
import { SiteSettingsPage } from './SiteSettingsPage';

// ─── Status Chip Helper ──────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'secondary'> = {
  UNREAD: 'error', READ: 'info', REPLIED: 'success', ARCHIVED: 'default',
  PENDING: 'warning', IN_REVIEW: 'info', QUOTED: 'primary', ACCEPTED: 'success', REJECTED: 'error',
};

// Turkish labels for all enum values shown in the admin UI.
const ENUM_LABELS: Record<string, string> = {
  // ContactMessage / QuoteRequest status
  UNREAD: 'Okunmadı',
  READ: 'Okundu',
  REPLIED: 'Yanıtlandı',
  ARCHIVED: 'Arşivlendi',
  PENDING: 'Bekliyor',
  IN_REVIEW: 'İnceleniyor',
  QUOTED: 'Teklif Verildi',
  ACCEPTED: 'Kabul Edildi',
  REJECTED: 'Reddedildi',
  // MenuLocation
  HEADER: 'Üst Menü (Header)',
  FOOTER_COL1: 'Alt Menü — 1. Sütun',
  FOOTER_COL2: 'Alt Menü — 2. Sütun',
  FOOTER_COL3: 'Alt Menü — 3. Sütun',
  // ContentType
  RICH_TEXT: 'Zengin Metin',
  STATS: 'İstatistikler',
  VALUES_LIST: 'Değerler Listesi',
  FAQ: 'Sıkça Sorulan Sorular',
  FEATURE_LIST: 'Özellikler Listesi',
};

const MENU_LOCATION_CHOICES = [
  { id: 'HEADER', name: ENUM_LABELS.HEADER },
  { id: 'FOOTER_COL1', name: ENUM_LABELS.FOOTER_COL1 },
  { id: 'FOOTER_COL2', name: ENUM_LABELS.FOOTER_COL2 },
  { id: 'FOOTER_COL3', name: ENUM_LABELS.FOOTER_COL3 },
];

const CONTENT_TYPE_CHOICES = [
  { id: 'RICH_TEXT', name: ENUM_LABELS.RICH_TEXT },
  { id: 'STATS', name: ENUM_LABELS.STATS },
  { id: 'VALUES_LIST', name: ENUM_LABELS.VALUES_LIST },
  { id: 'FAQ', name: ENUM_LABELS.FAQ },
  { id: 'FEATURE_LIST', name: ENUM_LABELS.FEATURE_LIST },
];

const USER_ROLE_CHOICES = [
  { id: 'SUPER_ADMIN', name: 'Süper Admin' },
  { id: 'ADMIN', name: 'Admin' },
  { id: 'EDITOR', name: 'Editör' },
];

const USER_ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Süper Admin',
  ADMIN: 'Admin',
  EDITOR: 'Editör',
};

const USER_ROLE_COLORS: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  SUPER_ADMIN: 'error',
  ADMIN: 'warning',
  EDITOR: 'primary',
};

const STATUS_ICONS: Record<string, React.ReactElement> = {
  UNREAD: <MarkEmailUnread fontSize="small" />,
  READ: <Drafts fontSize="small" />,
  REPLIED: <Reply fontSize="small" />,
  ARCHIVED: <Archive fontSize="small" />,
  PENDING: <HourglassEmpty fontSize="small" />,
  IN_REVIEW: <Visibility fontSize="small" />,
  QUOTED: <DescriptionOutlined fontSize="small" />,
  ACCEPTED: <CheckCircle fontSize="small" />,
  REJECTED: <Cancel fontSize="small" />,
};

const StatusChip = ({ source }: { source: string }) => (
  <FunctionField
    source={source}
    render={(record: Record<string, string>) => {
      const val = record[source];
      return (
        <Chip
          icon={STATUS_ICONS[val]}
          label={ENUM_LABELS[val] || val}
          size="small"
          color={STATUS_COLORS[val] || 'default'}
          sx={{ fontWeight: 500, '& .MuiChip-icon': { ml: 0.75 } }}
        />
      );
    }}
  />
);

// Displays an enum value as its Turkish label.
const EnumLabel = ({ source, label }: { source: string; label?: string }) => (
  <FunctionField
    source={source}
    label={label}
    render={(record: Record<string, string>) => ENUM_LABELS[record[source]] || record[source]}
  />
);

// Small square image thumbnail used in list datagrids.
const Thumbnail = ({ source, label, size = 48 }: { source: string; label?: string; size?: number }) => (
  <FunctionField
    source={source}
    label={label}
    render={(record: Record<string, string>) => {
      const url = record[source];
      if (!url) {
        return (
          <Box sx={{ width: size, height: size, bgcolor: 'grey.100', borderRadius: 1, border: '1px dashed #cbd5e1' }} />
        );
      }
      return (
        <Box
          component="img"
          src={url}
          alt=""
          sx={{ width: size, height: size, objectFit: 'cover', borderRadius: 1, border: '1px solid #e2e8f0', display: 'block' }}
        />
      );
    }}
  />
);

// Pulls a translated field (e.g. title, name) from the translations[] array, preferring Turkish.
const TranslatedField = ({ source, label }: { source: string; label?: string }) => (
  <FunctionField
    source={source}
    label={label}
    render={(record: Record<string, unknown>) => {
      const translations = record.translations as Array<Record<string, unknown>> | undefined;
      if (!translations?.length) return '—';
      const tr = translations.find(t => t.locale === 'tr') || translations[0];
      const value = tr?.[source];
      return value ? String(value) : '—';
    }}
  />
);

// Renders the icon name as a small chip (for services).
const IconChip = ({ source, label }: { source: string; label?: string }) => (
  <FunctionField
    source={source}
    label={label}
    render={(record: Record<string, string>) => (
      <Chip label={record[source] || '—'} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontSize: 12 }} />
    )}
  />
);

// ─── Form Helpers (parse/format for list-style inputs) ─────────────────────

// Converts between an array of strings and a newline-separated string for textarea editing.
const arrayLineFormat = (v: unknown): string =>
  Array.isArray(v) ? v.join('\n') : (typeof v === 'string' ? v : '');

const arrayLineParse = (v: string): string[] =>
  typeof v === 'string' ? v.split('\n').map(s => s.trim()).filter(Boolean) : [];

// Converts between an array of strings and a comma-separated string.
const arrayCommaFormat = (v: unknown): string =>
  Array.isArray(v) ? v.join(', ') : (typeof v === 'string' ? v : '');

const arrayCommaParse = (v: string): string[] =>
  typeof v === 'string' ? v.split(',').map(s => s.trim()).filter(Boolean) : [];

// ─── Image Upload Component ─────────────────────────────────────────────────

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt?: string | null;
  mimeType: string;
  createdAt: string;
}

function MediaPickerDialog({ open, onClose, onSelect }: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch('/api/admin/media?_perPage=100&_sortField=createdAt&_sortDir=DESC')
      .then(r => r.json())
      .then((data: MediaItem[]) => { setMedia(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Medya Kitaplığından Seç</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : media.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 6 }}>
            Henüz yüklenmiş bir görsel yok. Önce "Yeni Yükle" ile görsel yükleyin.
          </Typography>
        ) : (
          <MuiGrid container spacing={2}>
            {media.map(m => (
              <MuiGrid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={m.id}>
                <Box
                  onClick={() => onSelect(m.url)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 1.5,
                    overflow: 'hidden',
                    border: '2px solid transparent',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={m.url}
                    alt={m.alt || ''}
                    sx={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block', bgcolor: 'grey.100' }}
                  />
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{ display: 'block', px: 1, py: 0.5, bgcolor: 'grey.50' }}
                  >
                    {m.filename}
                  </Typography>
                </Box>
              </MuiGrid>
            ))}
          </MuiGrid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: 'none' }}>İptal</Button>
      </DialogActions>
    </Dialog>
  );
}

function ImageUploadInput({ source, label }: { source: string; label?: string }) {
  const { field } = useInput({ source });
  const [uploading, setUploading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'uploads');
    try {
      const res = await fetch('/api/media/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        field.onChange(data.url);
      }
    } catch { /* handled */ }
    setUploading(false);
  }, [field]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        {label || source}
      </Typography>
      {field.value && (
        <Box sx={{ mb: 1.5, borderRadius: 2, overflow: 'hidden', maxWidth: 300, border: '1px solid #e2e8f0' }}>
          <img src={field.value} alt="" style={{ width: '100%', display: 'block' }} />
        </Box>
      )}
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
        <Button
          variant="outlined"
          component="label"
          startIcon={uploading ? <CircularProgress size={18} /> : <CloudUpload />}
          disabled={uploading}
          size="small"
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          {uploading ? 'Yükleniyor...' : 'Yeni Yükle'}
          <input type="file" hidden accept="image/*" onChange={handleUpload} />
        </Button>
        <Button
          variant="outlined"
          startIcon={<PhotoLibrary />}
          onClick={() => setPickerOpen(true)}
          size="small"
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Kitaplıktan Seç
        </Button>
        {field.value && (
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteOutline />}
            onClick={() => field.onChange(null)}
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Kaldır
          </Button>
        )}
      </Stack>
      {field.value && (
        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 1, wordBreak: 'break-all' }}>
          {field.value}
        </Typography>
      )}
      <MediaPickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(url) => { field.onChange(url); setPickerOpen(false); }}
      />
    </Box>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

const serviceFilters = [
  <SearchInput key="q" source="q" placeholder="Ara (başlık, slug)..." alwaysOn />,
  <NullableBooleanInput key="isActive" source="isActive" label="Aktif" />,
];

const ServiceList = () => (
  <List filters={serviceFilters}>
    <Datagrid rowClick="edit">
      <IconChip source="icon" label="İkon" />
      <TranslatedField source="title" label="Başlık" />
      <TextField source="slug" label="URL" />
      <NumberField source="order" label="Sıra" />
      <BooleanField source="isActive" label="Aktif" />
      <DateField source="createdAt" showTime label="Oluşturma" />
    </Datagrid>
  </List>
);

const ServiceEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Genel">
        <TextInput source="slug" label="URL Kısaltması (slug)" />
        <TextInput source="icon" label="İkon" helperText="Lucide ikon adı: Globe, Smartphone, Code2, Database, Bot, Server, BarChart3, Wrench" />
        <NumberInput source="order" label="Sıra" />
        <BooleanInput source="isActive" label="Aktif" />
      </FormTab>
      <FormTab label="İçerik">
        <ArrayInput source="translations" label="Çeviriler">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled label="Dil" />
            <TextInput source="title" fullWidth label="Başlık" />
            <TextInput source="description" multiline rows={3} fullWidth label="Açıklama" />
            <TextInput
              source="features"
              multiline
              rows={4}
              fullWidth
              label="Özellikler"
              helperText="Her satıra bir özellik yazın (örn: 7/24 Destek)"
              format={arrayLineFormat}
              parse={arrayLineParse}
            />
            <TextInput source="ctaText" label="Buton Metni" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const ServiceCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="Genel">
        <TextInput source="slug" required label="URL Kısaltması (slug)" helperText="Örn: mobil-uygulama-gelistirme" />
        <TextInput source="icon" defaultValue="Zap" label="İkon" helperText="Lucide ikon adı (örn: Globe, Smartphone, Code2)" />
        <NumberInput source="order" defaultValue={0} label="Sıra" />
        <BooleanInput source="isActive" defaultValue={true} label="Aktif" />
      </FormTab>
      <FormTab label="İçerik">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled label="Dil" />
        <TextInput source="translations[0].title" required fullWidth label="Başlık" />
        <TextInput source="translations[0].description" multiline rows={3} fullWidth label="Açıklama" />
        <TextInput
          source="translations[0].features"
          multiline
          rows={4}
          fullWidth
          label="Özellikler"
          helperText="Her satıra bir özellik yazın (örn: 7/24 Destek)"
          format={arrayLineFormat}
          parse={arrayLineParse}
        />
        <TextInput source="translations[0].ctaText" label="Buton Metni" />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Projects ────────────────────────────────────────────────────────────────

const projectFilters = [
  <SearchInput key="q" source="q" placeholder="Ara (başlık, slug)..." alwaysOn />,
  <NullableBooleanInput key="isActive" source="isActive" label="Aktif" />,
  <NullableBooleanInput key="isFeatured" source="isFeatured" label="Öne Çıkan" />,
];

const ProjectList = () => (
  <List filters={projectFilters}>
    <Datagrid rowClick="edit">
      <Thumbnail source="image" label="Görsel" />
      <TranslatedField source="title" label="Başlık" />
      <TextField source="slug" label="URL" />
      <BooleanField source="isFeatured" label="Öne Çıkan" />
      <BooleanField source="isActive" label="Aktif" />
      <NumberField source="order" label="Sıra" />
      <DateField source="createdAt" label="Oluşturma" />
    </Datagrid>
  </List>
);

const ProjectEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Genel">
        <TextInput source="slug" required label="URL Kısaltması (slug)" />
        <ImageUploadInput source="image" label="Proje Görseli" />
        <TextInput source="externalUrl" fullWidth label="Dış Bağlantı (URL)" helperText="Projenin canlı bağlantısı (opsiyonel)" />
        <TextInput
          source="technologies"
          fullWidth
          label="Teknolojiler"
          helperText="Virgülle ayırarak yazın (örn: Next.js, Prisma, PostgreSQL, TypeScript)"
          format={arrayCommaFormat}
          parse={arrayCommaParse}
        />
        <NumberInput source="order" label="Sıra" />
        <BooleanInput source="isFeatured" label="Öne Çıkan" />
        <BooleanInput source="isActive" label="Aktif" />
      </FormTab>
      <FormTab label="İçerik">
        <ArrayInput source="translations" label="Çeviriler">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled label="Dil" />
            <TextInput source="title" fullWidth label="Başlık" />
            <TextInput source="description" multiline rows={4} fullWidth label="Açıklama" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const ProjectCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="Genel">
        <TextInput source="slug" required label="URL Kısaltması (slug)" helperText="Örn: kurumsal-web-sitesi-projesi" />
        <ImageUploadInput source="image" label="Proje Görseli" />
        <TextInput source="externalUrl" fullWidth label="Dış Bağlantı (URL)" helperText="Projenin canlı bağlantısı (opsiyonel)" />
        <TextInput
          source="technologies"
          fullWidth
          label="Teknolojiler"
          helperText="Virgülle ayırarak yazın (örn: Next.js, Prisma, PostgreSQL)"
          format={arrayCommaFormat}
          parse={arrayCommaParse}
        />
        <NumberInput source="order" defaultValue={0} label="Sıra" />
        <BooleanInput source="isFeatured" defaultValue={false} label="Öne Çıkan" />
        <BooleanInput source="isActive" defaultValue={true} label="Aktif" />
      </FormTab>
      <FormTab label="İçerik">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled label="Dil" />
        <TextInput source="translations[0].title" required fullWidth label="Başlık" />
        <TextInput source="translations[0].description" multiline rows={4} fullWidth label="Açıklama" />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Project Categories ───────────────────────────────────────────────────────

const ProjectCategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TranslatedField source="name" label="Kategori Adı" />
      <TextField source="slug" label="URL" />
      <DateField source="createdAt" label="Oluşturma" />
    </Datagrid>
  </List>
);

const ProjectCategoryEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Genel"><TextInput source="slug" /></FormTab>
      <FormTab label="İçerik">
        <ArrayInput source="translations">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled />
            <TextInput source="name" fullWidth label="Kategori Adı" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const ProjectCategoryCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="Genel"><TextInput source="slug" required /></FormTab>
      <FormTab label="İçerik">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled />
        <TextInput source="translations[0].name" required fullWidth label="Kategori Adı" />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Contact Messages ────────────────────────────────────────────────────────

const messageStatusChoices = [
  { id: 'UNREAD', name: ENUM_LABELS.UNREAD },
  { id: 'READ', name: ENUM_LABELS.READ },
  { id: 'REPLIED', name: ENUM_LABELS.REPLIED },
  { id: 'ARCHIVED', name: ENUM_LABELS.ARCHIVED },
];

const messageFilters = [
  <SearchInput key="q" source="q" placeholder="Ara (ad, e-posta, konu)..." alwaysOn />,
  <SelectInput key="status" source="status" label="Durum" choices={messageStatusChoices} />,
  <DateInput key="createdAt_gte" source="createdAt_gte" label="Başlangıç tarihi" />,
  <DateInput key="createdAt_lte" source="createdAt_lte" label="Bitiş tarihi" />,
];

const MessageBulkActions = () => (
  <>
    <BulkUpdateButton label="Okundu İşaretle" data={{ status: 'READ' }} icon={<Drafts />} />
    <BulkUpdateButton label="Yanıtlandı İşaretle" data={{ status: 'REPLIED' }} icon={<Reply />} />
    <BulkUpdateButton label="Arşivle" data={{ status: 'ARCHIVED' }} icon={<Archive />} />
    <BulkDeleteButton />
  </>
);

const MessageList = () => (
  <List filters={messageFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="show" bulkActionButtons={<MessageBulkActions />}>
      <TextField source="name" label="Ad" />
      <TextField source="email" label="E-posta" />
      <TextField source="subject" label="Konu" />
      <StatusChip source="status" />
      <DateField source="createdAt" showTime label="Tarih" />
    </Datagrid>
  </List>
);

const MessageShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" label="Ad" />
      <TextField source="email" label="E-posta" />
      <TextField source="phone" label="Telefon" />
      <TextField source="subject" label="Konu" />
      <TextField source="message" label="Mesaj" />
      <TextField source="status" label="Durum" />
      <DateField source="createdAt" showTime label="Tarih" />
    </SimpleShowLayout>
  </Show>
);

const MessageEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Detay">
        <TextField source="name" />
        <TextField source="email" />
        <TextField source="phone" />
        <TextField source="subject" />
        <TextField source="message" />
        <SelectInput source="status" label="Durum" choices={[
          { id: 'UNREAD', name: 'Okunmadı' },
          { id: 'READ', name: 'Okundu' },
          { id: 'REPLIED', name: 'Yanıtlandı' },
          { id: 'ARCHIVED', name: 'Arşivlendi' },
        ]} />
      </FormTab>
    </TabbedForm>
  </Edit>
);

// ─── Quote Requests ──────────────────────────────────────────────────────────

const quoteStatusChoices = [
  { id: 'PENDING', name: ENUM_LABELS.PENDING },
  { id: 'IN_REVIEW', name: ENUM_LABELS.IN_REVIEW },
  { id: 'QUOTED', name: ENUM_LABELS.QUOTED },
  { id: 'ACCEPTED', name: ENUM_LABELS.ACCEPTED },
  { id: 'REJECTED', name: ENUM_LABELS.REJECTED },
];

const quoteFilters = [
  <SearchInput key="q" source="q" placeholder="Ara (ad, e-posta, şirket)..." alwaysOn />,
  <SelectInput key="status" source="status" label="Durum" choices={quoteStatusChoices} />,
  <DateInput key="createdAt_gte" source="createdAt_gte" label="Başlangıç tarihi" />,
  <DateInput key="createdAt_lte" source="createdAt_lte" label="Bitiş tarihi" />,
];

const QuoteBulkActions = () => (
  <>
    <BulkUpdateButton label="İncelemeye Al" data={{ status: 'IN_REVIEW' }} icon={<Visibility />} />
    <BulkUpdateButton label="Teklif Verildi" data={{ status: 'QUOTED' }} icon={<DescriptionOutlined />} />
    <BulkUpdateButton label="Reddet" data={{ status: 'REJECTED' }} icon={<Cancel />} />
    <BulkDeleteButton />
  </>
);

const QuoteList = () => (
  <List filters={quoteFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="show" bulkActionButtons={<QuoteBulkActions />}>
      <TextField source="name" label="Ad" />
      <TextField source="email" label="E-posta" />
      <TextField source="company" label="Şirket" />
      <TextField source="budget" label="Bütçe" />
      <StatusChip source="status" />
      <DateField source="createdAt" label="Tarih" />
    </Datagrid>
  </List>
);

const QuoteShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" label="Ad" />
      <TextField source="email" label="E-posta" />
      <TextField source="phone" label="Telefon" />
      <TextField source="company" label="Şirket" />
      <TextField source="budget" label="Bütçe" />
      <TextField source="deadline" label="Süre" />
      <TextField source="description" label="Açıklama" />
      <TextField source="status" label="Durum" />
      <DateField source="createdAt" showTime label="Tarih" />
    </SimpleShowLayout>
  </Show>
);

const QuoteEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Detay">
        <TextField source="name" />
        <TextField source="email" />
        <TextField source="company" />
        <TextField source="description" />
        <SelectInput source="status" label="Durum" choices={[
          { id: 'PENDING', name: 'Bekliyor' },
          { id: 'IN_REVIEW', name: 'İnceleniyor' },
          { id: 'QUOTED', name: 'Teklif Verildi' },
          { id: 'ACCEPTED', name: 'Kabul Edildi' },
          { id: 'REJECTED', name: 'Reddedildi' },
        ]} />
      </FormTab>
    </TabbedForm>
  </Edit>
);

// ─── SEO Entries ──────────────────────────────────────────────────────────────

const SeoList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="page" label="Sayfa" />
      <TextField source="locale" label="Dil" />
      <TextField source="title" label="Başlık" />
      <DateField source="updatedAt" label="Güncelleme" />
    </Datagrid>
  </List>
);

const SeoEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="SEO">
        <TextInput source="page" label="Sayfa" />
        <TextInput source="locale" label="Dil" />
        <TextInput source="title" fullWidth label="Başlık" />
        <TextInput source="description" multiline rows={2} fullWidth label="Açıklama" />
        <TextInput source="ogTitle" fullWidth label="OG Başlık" />
        <TextInput source="ogDescription" multiline rows={2} fullWidth label="OG Açıklama" />
        <ImageUploadInput source="ogImage" label="OG Görsel" />
        <TextInput source="keywords" fullWidth label="Anahtar Kelimeler" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

const SeoCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="SEO">
        <SelectInput source="page" required label="Sayfa" choices={[
          { id: 'home', name: 'Ana Sayfa' },
          { id: 'services', name: 'Hizmetler' },
          { id: 'about', name: 'Hakkımızda' },
          { id: 'projects', name: 'Projeler' },
          { id: 'contact', name: 'İletişim' },
        ]} />
        <SelectInput source="locale" required label="Dil" defaultValue="tr" choices={[
          { id: 'tr', name: 'Türkçe' },
        ]} />
        <TextInput source="title" fullWidth required label="Başlık" />
        <TextInput source="description" multiline rows={2} fullWidth required label="Açıklama" />
        <TextInput source="ogTitle" fullWidth label="OG Başlık" />
        <TextInput source="ogDescription" multiline rows={2} fullWidth label="OG Açıklama" />
        <ImageUploadInput source="ogImage" label="OG Görsel" />
        <TextInput source="keywords" fullWidth label="Anahtar Kelimeler" />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Media ────────────────────────────────────────────────────────────────────

// Formats bytes as a human-readable KB/MB string.
const FileSizeField = ({ source, label }: { source: string; label?: string }) => (
  <FunctionField
    source={source}
    label={label}
    render={(record: Record<string, unknown>) => {
      const bytes = Number(record[source] ?? 0);
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }}
  />
);

const MediaList = () => (
  <List>
    <Datagrid rowClick="edit">
      <Thumbnail source="url" label="Önizleme" size={56} />
      <TextField source="filename" label="Dosya Adı" />
      <TextField source="alt" label="Alt Metni" />
      <TextField source="mimeType" label="Tür" />
      <FileSizeField source="size" label="Boyut" />
      <DateField source="createdAt" label="Yüklenme" />
    </Datagrid>
  </List>
);

const MediaEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Detay">
        <ImageField source="url" title="filename" />
        <TextField source="filename" label="Dosya Adı" />
        <TextField source="url" label="URL" />
        <TextField source="mimeType" label="MIME Türü" />
        <TextInput source="alt" fullWidth label="Alt Metni (Erişilebilirlik)" helperText="Görsel için açıklama (SEO ve erişilebilirlik için önemli)" />
        <TextInput source="folder" label="Klasör" helperText="Opsiyonel klasör etiketi" />
      </FormTab>
    </TabbedForm>
  </Edit>
);

// ─── Menu Items ───────────────────────────────────────────────────────────────

const menuItemFilters = [
  <SelectInput key="location" source="location" label="Konum" choices={MENU_LOCATION_CHOICES} alwaysOn />,
  <NullableBooleanInput key="isActive" source="isActive" label="Aktif" />,
];

const MenuItemList = () => (
  <List filters={menuItemFilters}>
    <Datagrid rowClick="edit">
      <EnumLabel source="location" label="Konum" />
      <TextField source="url" label="URL" />
      <NumberField source="order" label="Sıra" />
      <BooleanField source="isActive" label="Aktif" />
    </Datagrid>
  </List>
);

const MenuItemEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Genel">
        <SelectInput source="location" label="Konum" choices={MENU_LOCATION_CHOICES} />
        <TextInput source="url" fullWidth label="URL" helperText="Örn: /hizmetler, /iletisim" />
        <NumberInput source="order" label="Sıra" />
        <BooleanInput source="isActive" label="Aktif" />
        <BooleanInput source="openInNew" label="Yeni Sekmede Aç" />
      </FormTab>
      <FormTab label="İçerik">
        <ArrayInput source="translations" label="Çeviriler">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled label="Dil" />
            <TextInput source="label" fullWidth label="Menü Adı" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const MenuItemCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="Genel">
        <SelectInput source="location" required label="Konum" choices={MENU_LOCATION_CHOICES} />
        <TextInput source="url" fullWidth required label="URL" helperText="Örn: /hizmetler, /iletisim" />
        <NumberInput source="order" defaultValue={0} label="Sıra" />
        <BooleanInput source="isActive" defaultValue={true} label="Aktif" />
        <BooleanInput source="openInNew" defaultValue={false} label="Yeni Sekmede Aç" />
      </FormTab>
      <FormTab label="İçerik">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled label="Dil" />
        <TextInput source="translations[0].label" required fullWidth label="Menü Adı" />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Page Content ─────────────────────────────────────────────────────────────

const pageContentFilters = [
  <TextInput key="page" source="page" label="Sayfa" alwaysOn />,
  <SelectInput key="contentType" source="contentType" label="İçerik Türü" choices={CONTENT_TYPE_CHOICES} />,
  <NullableBooleanInput key="isActive" source="isActive" label="Aktif" />,
];

const PageContentList = () => (
  <List filters={pageContentFilters}>
    <Datagrid rowClick="edit">
      <TextField source="page" label="Sayfa" />
      <TextField source="section" label="Bölüm" />
      <EnumLabel source="contentType" label="Tür" />
      <NumberField source="order" label="Sıra" />
      <BooleanField source="isActive" label="Aktif" />
      <DateField source="updatedAt" label="Güncelleme" />
    </Datagrid>
  </List>
);

const PageContentEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Genel">
        <TextInput source="page" label="Sayfa" helperText="Örn: about, home, contact" />
        <TextInput source="section" label="Bölüm" helperText="Örn: story, mission, values" />
        <SelectInput source="contentType" label="İçerik Türü" choices={CONTENT_TYPE_CHOICES} />
        <NumberInput source="order" label="Sıra" />
        <BooleanInput source="isActive" label="Aktif" />
        <TextInput source="metadata" multiline rows={6} fullWidth helperText="JSON formatında ek veri (opsiyonel)" label="Ek Veri (Metadata)" />
      </FormTab>
      <FormTab label="İçerik">
        <ArrayInput source="translations" label="Çeviriler">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled label="Dil" />
            <TextInput source="title" fullWidth label="Başlık" />
            <TextInput source="subtitle" fullWidth label="Alt Başlık" />
            <TextInput source="body" multiline rows={8} fullWidth label="İçerik Metni" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const PageContentCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="Genel">
        <TextInput source="page" required label="Sayfa" helperText="Örn: about, home, contact" />
        <TextInput source="section" required label="Bölüm" helperText="Örn: story, mission, values" />
        <SelectInput source="contentType" defaultValue="RICH_TEXT" label="İçerik Türü" choices={CONTENT_TYPE_CHOICES} />
        <NumberInput source="order" defaultValue={0} label="Sıra" />
        <BooleanInput source="isActive" defaultValue={true} label="Aktif" />
      </FormTab>
      <FormTab label="İçerik">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled label="Dil" />
        <TextInput source="translations[0].title" fullWidth label="Başlık" />
        <TextInput source="translations[0].subtitle" fullWidth label="Alt Başlık" />
        <TextInput source="translations[0].body" multiline rows={8} fullWidth label="İçerik Metni" />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Users ────────────────────────────────────────────────────────────────────

const UserRoleBadge = ({ source }: { source: string }) => (
  <FunctionField
    source={source}
    render={(record: Record<string, string>) => {
      const val = record[source];
      return (
        <Chip
          label={USER_ROLE_LABELS[val] || val}
          size="small"
          color={USER_ROLE_COLORS[val] || 'default'}
          sx={{ fontWeight: 500 }}
        />
      );
    }}
  />
);

const userFilters = [
  <SearchInput key="q" source="q" placeholder="Ara (ad, e-posta)..." alwaysOn />,
  <SelectInput key="role" source="role" label="Yetki Seviyesi" choices={USER_ROLE_CHOICES} />,
];

const UserList = () => (
  <List filters={userFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <Thumbnail source="avatar" label="Avatar" size={40} />
      <TextField source="name" label="Ad Soyad" />
      <TextField source="email" label="E-posta" />
      <UserRoleBadge source="role" />
      <DateField source="createdAt" showTime label="Kayıt Tarihi" />
    </Datagrid>
  </List>
);

const UserEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Genel">
        <TextInput source="name" required fullWidth label="Ad Soyad" />
        <TextInput source="email" required fullWidth label="E-posta" type="email" />
        <SelectInput source="role" required label="Yetki Seviyesi" choices={USER_ROLE_CHOICES} />
        <ImageUploadInput source="avatar" label="Avatar" />
      </FormTab>
      <FormTab label="Şifre Değiştir">
        <TextInput
          source="password"
          type="password"
          fullWidth
          label="Yeni Şifre"
          helperText="Sadece değiştirmek isterseniz doldurun. En az 8 karakter."
        />
      </FormTab>
    </TabbedForm>
  </Edit>
);

const UserCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="Genel">
        <TextInput source="name" required fullWidth label="Ad Soyad" />
        <TextInput source="email" required fullWidth label="E-posta" type="email" />
        <TextInput
          source="password"
          type="password"
          required
          fullWidth
          label="Şifre"
          helperText="En az 8 karakter"
        />
        <SelectInput source="role" required defaultValue="EDITOR" label="Yetki Seviyesi" choices={USER_ROLE_CHOICES} />
        <ImageUploadInput source="avatar" label="Avatar" />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Main Admin App ───────────────────────────────────────────────────────────

export default function AdminApp() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={AdminDashboard}
      layout={AdminLayout}
      theme={adminTheme}
      loginPage={false}
      title="Dahi Teknoloji Admin"
      requireAuth
    >
      {/* İçerik */}
      <Resource name="services"           list={ServiceList}         edit={ServiceEdit}         create={ServiceCreate}         icon={Construction}   options={{ label: 'Hizmetler' }} />
      <Resource name="projects"           list={ProjectList}         edit={ProjectEdit}         create={ProjectCreate}         icon={FolderOpen}     options={{ label: 'Projeler' }} />
      <Resource name="page-contents"      list={PageContentList}     edit={PageContentEdit}     create={PageContentCreate}     icon={Description}    options={{ label: 'Sayfa İçerikleri' }} />

      {/* Kategoriler */}
      <Resource name="project-categories" list={ProjectCategoryList} edit={ProjectCategoryEdit} create={ProjectCategoryCreate} icon={Category}       options={{ label: 'Proje Kategorileri' }} />

      {/* Müşteri İlişkileri */}
      <Resource name="contact-messages"   list={MessageList}         show={MessageShow}         edit={MessageEdit}             icon={Email}          options={{ label: 'Mesajlar' }} />
      <Resource name="quote-requests"     list={QuoteList}           show={QuoteShow}           edit={QuoteEdit}               icon={RequestQuote}   options={{ label: 'Teklifler' }} />

      {/* Ayarlar */}
      <Resource name="seo-entries"        list={SeoList}             edit={SeoEdit}             create={SeoCreate}             icon={TravelExplore}  options={{ label: 'SEO' }} />
      <Resource name="media"              list={MediaList}           edit={MediaEdit}                                          icon={ImageIcon}      options={{ label: 'Medya' }} />
      <Resource name="menu-items"         list={MenuItemList}        edit={MenuItemEdit}        create={MenuItemCreate}        icon={MenuIcon}       options={{ label: 'Menüler' }} />
      <Resource name="users"              list={UserList}            edit={UserEdit}            create={UserCreate}            icon={ManageAccounts} options={{ label: 'Yöneticiler' }} />

      {/* Özel Sayfalar */}
      <CustomRoutes>
        <Route path="/site-settings" element={<SiteSettingsPage />} />
      </CustomRoutes>
    </Admin>
  );
}

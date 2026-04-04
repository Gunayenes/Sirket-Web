'use client';

import {
  Admin, Resource, CustomRoutes,
  List, Datagrid, TextField, DateField, BooleanField, NumberField,
  FunctionField,
  Edit, Create,
  Show, SimpleShowLayout,
  TabbedForm, FormTab,
  TextInput, BooleanInput, NumberInput, SelectInput,
  ArrayInput, SimpleFormIterator,
} from 'react-admin';
import { Route } from 'react-router-dom';
import {
  Construction, FolderOpen, Article, Category,
  People, Email, RequestQuote, Search as SearchIcon,
  Image as ImageIcon, Menu as MenuIcon, TravelExplore,
  Description,
} from '@mui/icons-material';
import { Chip } from '@mui/material';
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

const StatusChip = ({ source }: { source: string }) => {
  return (
    <FunctionField
      source={source}
      render={(record: Record<string, string>) => {
        const val = record[source];
        return <Chip label={val} size="small" color={STATUS_COLORS[val] || 'default'} />;
      }}
    />
  );
};

// ─── Services ────────────────────────────────────────────────────────────────

const ServiceList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="slug" />
      <TextField source="icon" />
      <NumberField source="order" />
      <BooleanField source="isActive" />
      <DateField source="createdAt" showTime />
    </Datagrid>
  </List>
);

const ServiceEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="slug" />
        <TextInput source="icon" helperText="Lucide icon name e.g. Code2" />
        <NumberInput source="order" />
        <BooleanInput source="isActive" />
      </FormTab>
      <FormTab label="Translations">
        <ArrayInput source="translations">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled />
            <TextInput source="title" fullWidth />
            <TextInput source="description" multiline rows={3} fullWidth />
            <TextInput source="ctaText" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const ServiceCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="slug" required />
        <TextInput source="icon" defaultValue="Zap" />
        <NumberInput source="order" defaultValue={0} />
        <BooleanInput source="isActive" defaultValue={true} />
      </FormTab>
      <FormTab label="Turkish">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled />
        <TextInput source="translations[0].title" required fullWidth />
        <TextInput source="translations[0].description" multiline rows={3} fullWidth />
      </FormTab>
      <FormTab label="English">
        <TextInput source="translations[1].locale" defaultValue="en" disabled />
        <TextInput source="translations[1].title" required fullWidth />
        <TextInput source="translations[1].description" multiline rows={3} fullWidth />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Projects ────────────────────────────────────────────────────────────────

const ProjectList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="slug" />
      <BooleanField source="isFeatured" label="Featured" />
      <BooleanField source="isActive" />
      <NumberField source="order" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

const ProjectEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="slug" required />
        <TextInput source="image" fullWidth required />
        <TextInput source="externalUrl" fullWidth />
        <TextInput source="technologies" helperText="Comma-separated" />
        <NumberInput source="order" />
        <BooleanInput source="isFeatured" />
        <BooleanInput source="isActive" />
      </FormTab>
      <FormTab label="Translations">
        <ArrayInput source="translations">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled />
            <TextInput source="title" fullWidth />
            <TextInput source="description" multiline rows={4} fullWidth />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const ProjectCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="slug" required />
        <TextInput source="image" fullWidth required />
        <TextInput source="externalUrl" fullWidth />
        <TextInput source="technologies" helperText="Comma-separated" />
        <NumberInput source="order" defaultValue={0} />
        <BooleanInput source="isFeatured" defaultValue={false} />
        <BooleanInput source="isActive" defaultValue={true} />
      </FormTab>
      <FormTab label="Turkish">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled />
        <TextInput source="translations[0].title" required fullWidth />
        <TextInput source="translations[0].description" multiline rows={4} fullWidth />
      </FormTab>
      <FormTab label="English">
        <TextInput source="translations[1].locale" defaultValue="en" disabled />
        <TextInput source="translations[1].title" required fullWidth />
        <TextInput source="translations[1].description" multiline rows={4} fullWidth />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Blog Posts ───────────────────────────────────────────────────────────────

const PostList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="slug" />
      <BooleanField source="isPublished" />
      <BooleanField source="isFeatured" />
      <DateField source="publishedAt" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

const PostEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="slug" required />
        <TextInput source="coverImage" fullWidth />
        <TextInput source="tags" helperText="Comma-separated" />
        <BooleanInput source="isPublished" />
        <BooleanInput source="isFeatured" />
      </FormTab>
      <FormTab label="Translations">
        <ArrayInput source="translations">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled />
            <TextInput source="title" fullWidth />
            <TextInput source="excerpt" multiline rows={2} fullWidth />
            <TextInput source="content" multiline rows={12} fullWidth helperText="HTML content" />
            <TextInput source="metaTitle" fullWidth />
            <TextInput source="metaDesc" fullWidth />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const PostCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="slug" required />
        <TextInput source="coverImage" fullWidth />
        <TextInput source="tags" helperText="Comma-separated" />
        <BooleanInput source="isPublished" defaultValue={false} />
        <BooleanInput source="isFeatured" defaultValue={false} />
      </FormTab>
      <FormTab label="Turkish">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled />
        <TextInput source="translations[0].title" required fullWidth />
        <TextInput source="translations[0].excerpt" multiline rows={2} fullWidth />
        <TextInput source="translations[0].content" multiline rows={10} fullWidth />
      </FormTab>
      <FormTab label="English">
        <TextInput source="translations[1].locale" defaultValue="en" disabled />
        <TextInput source="translations[1].title" required fullWidth />
        <TextInput source="translations[1].excerpt" multiline rows={2} fullWidth />
        <TextInput source="translations[1].content" multiline rows={10} fullWidth />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Blog Categories ──────────────────────────────────────────────────────────

const BlogCategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="slug" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

const BlogCategoryEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="General"><TextInput source="slug" /></FormTab>
      <FormTab label="Translations">
        <ArrayInput source="translations">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled />
            <TextInput source="name" fullWidth />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const BlogCategoryCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="General"><TextInput source="slug" required /></FormTab>
      <FormTab label="Turkish">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled />
        <TextInput source="translations[0].name" required fullWidth />
      </FormTab>
      <FormTab label="English">
        <TextInput source="translations[1].locale" defaultValue="en" disabled />
        <TextInput source="translations[1].name" required fullWidth />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Project Categories ───────────────────────────────────────────────────────

const ProjectCategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="slug" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

const ProjectCategoryEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="General"><TextInput source="slug" /></FormTab>
      <FormTab label="Translations">
        <ArrayInput source="translations">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled />
            <TextInput source="name" fullWidth />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const ProjectCategoryCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="General"><TextInput source="slug" required /></FormTab>
      <FormTab label="Turkish">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled />
        <TextInput source="translations[0].name" required fullWidth />
      </FormTab>
      <FormTab label="English">
        <TextInput source="translations[1].locale" defaultValue="en" disabled />
        <TextInput source="translations[1].name" required fullWidth />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Team Members ─────────────────────────────────────────────────────────────

const TeamList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="email" />
      <BooleanField source="isActive" />
      <NumberField source="order" />
    </Datagrid>
  </List>
);

const TeamEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="photo" fullWidth />
        <TextInput source="email" />
        <TextInput source="linkedin" fullWidth />
        <TextInput source="twitter" fullWidth />
        <NumberInput source="order" />
        <BooleanInput source="isActive" />
      </FormTab>
      <FormTab label="Translations">
        <ArrayInput source="translations">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled />
            <TextInput source="name" required fullWidth />
            <TextInput source="role" required fullWidth />
            <TextInput source="bio" multiline rows={3} fullWidth />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const TeamCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="photo" fullWidth />
        <TextInput source="email" />
        <TextInput source="linkedin" fullWidth />
        <TextInput source="twitter" fullWidth />
        <NumberInput source="order" defaultValue={0} />
        <BooleanInput source="isActive" defaultValue={true} />
      </FormTab>
      <FormTab label="Turkish">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled />
        <TextInput source="translations[0].name" required fullWidth />
        <TextInput source="translations[0].role" required fullWidth />
        <TextInput source="translations[0].bio" multiline rows={3} fullWidth />
      </FormTab>
      <FormTab label="English">
        <TextInput source="translations[1].locale" defaultValue="en" disabled />
        <TextInput source="translations[1].name" required fullWidth />
        <TextInput source="translations[1].role" required fullWidth />
        <TextInput source="translations[1].bio" multiline rows={3} fullWidth />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Contact Messages ────────────────────────────────────────────────────────

const MessageList = () => (
  <List>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="subject" />
      <StatusChip source="status" />
      <DateField source="createdAt" showTime />
    </Datagrid>
  </List>
);

const MessageShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="subject" />
      <TextField source="message" />
      <TextField source="status" />
      <DateField source="createdAt" showTime />
    </SimpleShowLayout>
  </Show>
);

const MessageEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Details">
        <TextField source="name" />
        <TextField source="email" />
        <TextField source="phone" />
        <TextField source="subject" />
        <TextField source="message" />
        <SelectInput source="status" choices={[
          { id: 'UNREAD', name: 'Unread' },
          { id: 'READ', name: 'Read' },
          { id: 'REPLIED', name: 'Replied' },
          { id: 'ARCHIVED', name: 'Archived' },
        ]} />
      </FormTab>
    </TabbedForm>
  </Edit>
);

// ─── Quote Requests ──────────────────────────────────────────────────────────

const QuoteList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="company" />
      <TextField source="budget" />
      <StatusChip source="status" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

const QuoteShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="company" />
      <TextField source="budget" />
      <TextField source="deadline" />
      <TextField source="description" />
      <TextField source="status" />
      <DateField source="createdAt" showTime />
    </SimpleShowLayout>
  </Show>
);

const QuoteEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Details">
        <TextField source="name" />
        <TextField source="email" />
        <TextField source="company" />
        <TextField source="description" />
        <SelectInput source="status" choices={[
          { id: 'PENDING', name: 'Pending' },
          { id: 'IN_REVIEW', name: 'In Review' },
          { id: 'QUOTED', name: 'Quoted' },
          { id: 'ACCEPTED', name: 'Accepted' },
          { id: 'REJECTED', name: 'Rejected' },
        ]} />
      </FormTab>
    </TabbedForm>
  </Edit>
);

// ─── SEO Entries ──────────────────────────────────────────────────────────────

const SeoList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="page" />
      <TextField source="locale" />
      <TextField source="title" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

const SeoEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="SEO">
        <TextInput source="page" />
        <TextInput source="locale" />
        <TextInput source="title" fullWidth />
        <TextInput source="description" multiline rows={2} fullWidth />
        <TextInput source="ogTitle" fullWidth />
        <TextInput source="ogDescription" multiline rows={2} fullWidth />
        <TextInput source="ogImage" fullWidth />
        <TextInput source="keywords" fullWidth />
      </FormTab>
    </TabbedForm>
  </Edit>
);

const SeoCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="SEO">
        <SelectInput source="page" required choices={[
          { id: 'home', name: 'Home' },
          { id: 'services', name: 'Services' },
          { id: 'about', name: 'About' },
          { id: 'projects', name: 'Projects' },
          { id: 'blog', name: 'Blog' },
          { id: 'contact', name: 'Contact' },
        ]} />
        <SelectInput source="locale" required choices={[
          { id: 'tr', name: 'Turkish' },
          { id: 'en', name: 'English' },
        ]} />
        <TextInput source="title" fullWidth required />
        <TextInput source="description" multiline rows={2} fullWidth required />
        <TextInput source="ogTitle" fullWidth />
        <TextInput source="ogDescription" multiline rows={2} fullWidth />
        <TextInput source="ogImage" fullWidth />
        <TextInput source="keywords" fullWidth />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Media ────────────────────────────────────────────────────────────────────

const MediaList = () => (
  <List>
    <Datagrid>
      <TextField source="filename" />
      <TextField source="url" />
      <TextField source="mimeType" />
      <NumberField source="size" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

// ─── Menu Items ───────────────────────────────────────────────────────────────

const MenuItemList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="location" />
      <TextField source="url" />
      <NumberField source="order" />
      <BooleanField source="isActive" />
    </Datagrid>
  </List>
);

const MenuItemEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="General">
        <SelectInput source="location" choices={[
          { id: 'HEADER', name: 'Header' },
          { id: 'FOOTER_COL1', name: 'Footer Col 1' },
          { id: 'FOOTER_COL2', name: 'Footer Col 2' },
          { id: 'FOOTER_COL3', name: 'Footer Col 3' },
        ]} />
        <TextInput source="url" fullWidth />
        <NumberInput source="order" />
        <BooleanInput source="isActive" />
        <BooleanInput source="openInNew" />
      </FormTab>
      <FormTab label="Translations">
        <ArrayInput source="translations">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled />
            <TextInput source="label" fullWidth />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const MenuItemCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="General">
        <SelectInput source="location" required choices={[
          { id: 'HEADER', name: 'Header' },
          { id: 'FOOTER_COL1', name: 'Footer Col 1' },
          { id: 'FOOTER_COL2', name: 'Footer Col 2' },
          { id: 'FOOTER_COL3', name: 'Footer Col 3' },
        ]} />
        <TextInput source="url" fullWidth required />
        <NumberInput source="order" defaultValue={0} />
        <BooleanInput source="isActive" defaultValue={true} />
        <BooleanInput source="openInNew" defaultValue={false} />
      </FormTab>
      <FormTab label="Turkish">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled />
        <TextInput source="translations[0].label" required fullWidth />
      </FormTab>
      <FormTab label="English">
        <TextInput source="translations[1].locale" defaultValue="en" disabled />
        <TextInput source="translations[1].label" required fullWidth />
      </FormTab>
    </TabbedForm>
  </Create>
);

// ─── Page Content ─────────────────────────────────────────────────────────────

const PageContentList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="page" />
      <TextField source="section" />
      <TextField source="contentType" label="Type" />
      <NumberField source="order" />
      <BooleanField source="isActive" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

const PageContentEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="page" />
        <TextInput source="section" />
        <SelectInput source="contentType" choices={[
          { id: 'RICH_TEXT', name: 'Rich Text' },
          { id: 'STATS', name: 'Stats' },
          { id: 'VALUES_LIST', name: 'Values List' },
          { id: 'FAQ', name: 'FAQ' },
          { id: 'FEATURE_LIST', name: 'Feature List' },
        ]} />
        <NumberInput source="order" />
        <BooleanInput source="isActive" />
        <TextInput source="metadata" multiline rows={6} fullWidth helperText="JSON format" />
      </FormTab>
      <FormTab label="Translations">
        <ArrayInput source="translations">
          <SimpleFormIterator disableAdd disableRemove>
            <TextInput source="locale" disabled />
            <TextInput source="title" fullWidth />
            <TextInput source="subtitle" fullWidth />
            <TextInput source="body" multiline rows={8} fullWidth helperText="Text or JSON content" />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const PageContentCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="General">
        <TextInput source="page" required helperText="e.g. about, home, contact" />
        <TextInput source="section" required helperText="e.g. story, mission, values" />
        <SelectInput source="contentType" defaultValue="RICH_TEXT" choices={[
          { id: 'RICH_TEXT', name: 'Rich Text' },
          { id: 'STATS', name: 'Stats' },
          { id: 'VALUES_LIST', name: 'Values List' },
          { id: 'FAQ', name: 'FAQ' },
          { id: 'FEATURE_LIST', name: 'Feature List' },
        ]} />
        <NumberInput source="order" defaultValue={0} />
        <BooleanInput source="isActive" defaultValue={true} />
      </FormTab>
      <FormTab label="Turkish">
        <TextInput source="translations[0].locale" defaultValue="tr" disabled />
        <TextInput source="translations[0].title" fullWidth />
        <TextInput source="translations[0].subtitle" fullWidth />
        <TextInput source="translations[0].body" multiline rows={8} fullWidth />
      </FormTab>
      <FormTab label="English">
        <TextInput source="translations[1].locale" defaultValue="en" disabled />
        <TextInput source="translations[1].title" fullWidth />
        <TextInput source="translations[1].subtitle" fullWidth />
        <TextInput source="translations[1].body" multiline rows={8} fullWidth />
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
      title="TechCo Admin"
      requireAuth
    >
      {/* Content */}
      <Resource name="services"           list={ServiceList}         edit={ServiceEdit}         create={ServiceCreate}         icon={Construction} />
      <Resource name="projects"           list={ProjectList}         edit={ProjectEdit}         create={ProjectCreate}         icon={FolderOpen} />
      <Resource name="blog-posts"         list={PostList}            edit={PostEdit}            create={PostCreate}            icon={Article}        options={{ label: 'Blog Posts' }} />
      <Resource name="team-members"       list={TeamList}            edit={TeamEdit}            create={TeamCreate}            icon={People}         options={{ label: 'Team' }} />
      <Resource name="page-contents"      list={PageContentList}     edit={PageContentEdit}     create={PageContentCreate}     icon={Description}    options={{ label: 'Page Content' }} />

      {/* Categories */}
      <Resource name="blog-categories"    list={BlogCategoryList}    edit={BlogCategoryEdit}    create={BlogCategoryCreate}    icon={Category}       options={{ label: 'Blog Categories' }} />
      <Resource name="project-categories" list={ProjectCategoryList} edit={ProjectCategoryEdit} create={ProjectCategoryCreate} icon={Category}       options={{ label: 'Project Categories' }} />

      {/* CRM */}
      <Resource name="contact-messages"   list={MessageList}         show={MessageShow}         edit={MessageEdit}             icon={Email}          options={{ label: 'Messages' }} />
      <Resource name="quote-requests"     list={QuoteList}           show={QuoteShow}           edit={QuoteEdit}               icon={RequestQuote}   options={{ label: 'Quotes' }} />

      {/* Settings */}
      <Resource name="seo-entries"        list={SeoList}             edit={SeoEdit}             create={SeoCreate}             icon={TravelExplore}  options={{ label: 'SEO' }} />
      <Resource name="media"              list={MediaList}                                                                     icon={ImageIcon}      options={{ label: 'Media' }} />
      <Resource name="menu-items"         list={MenuItemList}        edit={MenuItemEdit}        create={MenuItemCreate}        icon={MenuIcon}       options={{ label: 'Menu' }} />

      {/* Custom Routes */}
      <CustomRoutes>
        <Route path="/site-settings" element={<SiteSettingsPage />} />
      </CustomRoutes>
    </Admin>
  );
}

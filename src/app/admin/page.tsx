'use client';

import dynamic from 'next/dynamic';

// React Admin must be loaded client-side only
const AdminApp = dynamic(() => import('@/components/admin/AdminApp'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function AdminPage() {
  return <AdminApp />;
}

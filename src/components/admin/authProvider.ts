import { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || 'Giriş başarısız');
    }
    const data = await res.json();
    localStorage.setItem('admin_user', JSON.stringify(data.user));
    // Store CSRF token for mutating requests
    if (data.csrfToken) {
      sessionStorage.setItem('csrf_token', data.csrfToken);
    }
  },

  logout: async () => {
    const csrf = sessionStorage.getItem('csrf_token');
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: csrf ? { 'x-csrf-token': csrf } : {},
    });
    localStorage.removeItem('admin_user');
    sessionStorage.removeItem('csrf_token');
  },

  checkAuth: async () => {
    const res = await fetch('/api/auth/me');
    if (!res.ok) throw new Error('Not authenticated');
  },

  checkError: async ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('admin_user');
      sessionStorage.removeItem('csrf_token');
      throw new Error('Unauthorized');
    }
  },

  getPermissions: async () => {
    const userStr = localStorage.getItem('admin_user');
    const user = userStr ? JSON.parse(userStr) : null;
    return user?.role || 'EDITOR';
  },

  getIdentity: async () => {
    const userStr = localStorage.getItem('admin_user');
    const user = userStr ? JSON.parse(userStr) : null;
    return {
      id: user?.id || '',
      fullName: user?.name || 'Admin',
      avatar: undefined,
    };
  },
};

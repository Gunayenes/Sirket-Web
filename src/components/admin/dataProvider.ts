import { DataProvider, fetchUtils } from 'react-admin';

const apiUrl = '/api/admin';

function httpClient(url: string, options: fetchUtils.Options = {}) {
  const csrf = typeof sessionStorage === 'undefined' ? null : sessionStorage.getItem('csrf_token');
  const headers = new Headers(options.headers || {});
  if (csrf) {
    headers.set('x-csrf-token', csrf);
  }
  return fetchUtils.fetchJson(url, { ...options, headers });
}

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const url = `${apiUrl}/${resource}?_page=${page}&_perPage=${perPage}`;
    const { headers, json } = await httpClient(url);
    const contentRange = headers.get('content-range') || '';
    const total = parseInt(contentRange.split('/').pop() || '0', 10);
    return { data: json, total };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const results = await Promise.all(
      params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`))
    );
    return { data: results.map(r => r.json) };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const url = `${apiUrl}/${resource}?_page=${page}&_perPage=${perPage}&${params.target}=${params.id}`;
    const { headers, json } = await httpClient(url);
    const contentRange = headers.get('content-range') || '';
    const total = parseInt(contentRange.split('/').pop() || '0', 10);
    return { data: json, total };
  },

  create: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  update: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  updateMany: async (resource, params) => {
    const results = await Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })
      )
    );
    return { data: results.map(r => r.json.id) };
  },

  delete: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    });
    return { data: json };
  },

  deleteMany: async (resource, params) => {
    const results = await Promise.all(
      params.ids.map(id =>
        httpClient(`${apiUrl}/${resource}/${id}`, { method: 'DELETE' })
      )
    );
    return { data: results.map(r => r.json.id) };
  },
};

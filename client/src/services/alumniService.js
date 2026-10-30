import api from '@/services/api';

export async function fetchAlumniList(params) {
  const { data } = await api.get('/alumni', { params });
  return data; // { success, data, pagination }
}

export async function searchAlumniList(params) {
  const { data } = await api.get('/alumni/search', { params });
  return data;
}

export async function fetchAlumniById(id) {
  const { data } = await api.get(`/alumni/${id}`);
  return data.data;
}

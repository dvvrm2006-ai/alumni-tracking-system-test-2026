import api from '@/services/api';

export async function fetchProfile() {
  const { data } = await api.get('/profile');
  return data.data;
}

export async function saveProfile(updates) {
  const { data } = await api.put('/profile', updates);
  return data.data;
}

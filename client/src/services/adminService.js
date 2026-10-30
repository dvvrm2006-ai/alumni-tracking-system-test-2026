import api from '@/services/api';

export async function fetchDashboardStats() {
  const { data } = await api.get('/admin/stats');
  return data.data;
}

export async function fetchAdminUsers() {
  const { data } = await api.get('/admin/users');
  return data.data;
}

export async function updateUserStatus(id, accountStatus) {
  const { data } = await api.put(`/admin/users/${id}/status`, { accountStatus });
  return data.data;
}

export async function deleteAdminUser(id) {
  await api.delete(`/admin/users/${id}`);
}

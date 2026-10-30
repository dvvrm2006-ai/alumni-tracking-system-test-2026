import api from '@/services/api';

export async function fetchEvents(params) {
  const { data } = await api.get('/events', { params });
  return data.data;
}

export async function fetchEventById(id) {
  const { data } = await api.get(`/events/${id}`);
  return data.data;
}

export async function createEvent(payload) {
  const { data } = await api.post('/events', payload);
  return data.data;
}

export async function updateEvent(id, payload) {
  const { data } = await api.put(`/events/${id}`, payload);
  return data.data;
}

export async function deleteEvent(id) {
  await api.delete(`/events/${id}`);
}

export async function registerForEvent(id) {
  const { data } = await api.post(`/events/register/${id}`);
  return data.data;
}

export async function fetchMyEvents() {
  const { data } = await api.get('/events/my-events');
  return data.data;
}

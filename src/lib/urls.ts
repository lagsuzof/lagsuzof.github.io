export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const path = (value = '') => `${base}/${value.replace(/^\//, '')}`;
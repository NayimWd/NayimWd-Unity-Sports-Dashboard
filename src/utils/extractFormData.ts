export const extractFormData = (data: Record<string, any>) => {
  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      fd.append(key, value);
    } else if (Array.isArray(value) && value[0] instanceof File) {
      fd.append(key, value[0]);
    } else {
      fd.append(key, String(value)); // covers string, number, boolean
    }
  });

  return fd;
};

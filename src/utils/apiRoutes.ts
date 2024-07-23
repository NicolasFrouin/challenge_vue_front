export const apiRoutes = {
  auth: {
    login: `${import.meta.env.VITE_API_URL}/auth/login`,
    register: `${import.meta.env.VITE_API_URL}/auth/register`,
    me: `${import.meta.env.VITE_API_URL}/auth/me`,
  },
  products: {
    all: `${import.meta.env.VITE_API_URL}/products`,
    bySlug: (slug: string) => `${import.meta.env.VITE_API_URL}/products/${slug}`,
    byId: (id: string) => `${import.meta.env.VITE_API_URL}/products/id/${id}`,
    delete: (id: string) => `${import.meta.env.VITE_API_URL}/products/${id}`,
    edit: (id: string) => `${import.meta.env.VITE_API_URL}/products/${id}`,
  },
  categories: {
    all: `${import.meta.env.VITE_API_URL}/categories`,
    bySlug: (slug: string) => `${import.meta.env.VITE_API_URL}/categories/${slug}`,
    delete: (id: string) => `${import.meta.env.VITE_API_URL}/categories/${id}`,
  },
  users: {
    all: `${import.meta.env.VITE_API_URL}/users`,
    byId: (id: string) => `${import.meta.env.VITE_API_URL}/users/${id}`,
    delete: (id: string) => `${import.meta.env.VITE_API_URL}/users/${id}`,
    edit: (id: string) => `${import.meta.env.VITE_API_URL}/users/${id}`,
  },
  order: {
    all: `${import.meta.env.VITE_API_URL}/orders`,
    byId: (id: string) => `${import.meta.env.VITE_API_URL}/orders/${id}`,
    delete: (id: string) => `${import.meta.env.VITE_API_URL}/orders/${id}`,
    edit: (id: string) => `${import.meta.env.VITE_API_URL}/orders/${id}`,
    new: `${import.meta.env.VITE_API_URL}/orders`,
  },
};

export const apiRoutes = {
  auth: {
    login: `${import.meta.env.VITE_API_URL}/auth/login`,
    register: `${import.meta.env.VITE_API_URL}/auth/register`,
    me: `${import.meta.env.VITE_API_URL}/auth/me`,
  },
  products: {
    all: `${import.meta.env.VITE_API_URL}/products`,
    bySlug: (slug: string) => `${import.meta.env.VITE_API_URL}/products/${slug}`,
  },
  categories: {
    all: `${import.meta.env.VITE_API_URL}/categories`,
    bySlug: (slug: string) => `${import.meta.env.VITE_API_URL}/categories/${slug}`,
  },
};

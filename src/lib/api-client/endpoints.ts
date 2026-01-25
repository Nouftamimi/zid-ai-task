export const endpoints = {
  products: {
    list: '/products',
    details: (id: string) => `/products/${id}`,
  },
};

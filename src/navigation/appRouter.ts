export const appRouter = {
  home: () => '/',
  aiCopilot: () => '/ai-copilot',

  product: (id: string) => ({ // this is exmple in how we can use it with the query
    pathname: '/product/[id]',
    params: { id },
  }),

  cart: () => '/cart',

  checkout: (orderId: string) => ({
    pathname: '/checkout/[orderId]',
    params: { orderId },
  }),
} as const;
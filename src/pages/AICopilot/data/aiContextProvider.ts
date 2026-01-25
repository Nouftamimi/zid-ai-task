import ordersData from '@/src/pages/order/data/mock/order.mock.json';
import productsData from '@/src/pages/product/data/mock/product.mock.json';

export const getAIContext = () => {
  const orders = ordersData.orders;
  const products = productsData.products;

  return {
    orders,
    products,
  };
};

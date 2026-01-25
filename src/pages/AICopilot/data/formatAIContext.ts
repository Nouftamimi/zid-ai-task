// export const formatAIContext = (
//   orders: any[],
//   products: any[],
// ) => {
//   const totalOrders = orders.length;
//   const delivered = orders.filter(o => o.statusId === 1).length;
//   const pending = orders.filter(o => o.statusId === 2).length;
//   const failed = orders.filter(o => o.statusId === 3).length;

//   const lowStock = products.filter(p => p.stock < 10);
//   const bestSeller = products.reduce((prev, curr) =>
//     curr.sold > prev.sold ? curr : prev
//   );

//   return `
// STORE SNAPSHOT:

// ORDERS:
// - Total orders: ${totalOrders}
// - Delivered: ${delivered}
// - In transit: ${pending}
// - Failed: ${failed}

// PRODUCTS:
// - Total products: ${products.length}
// - Low stock products: ${lowStock.map(p => p.name).join(', ') || 'None'}
// - Best selling product: ${bestSeller.name} (${bestSeller.sold} sold)
// `;
// };


export const formatAIContext = (
  orders: any[],
  products: any[],
) => {
  const deliveredOrders = orders.filter(o => o.statusId === 1);
  const pendingOrders = orders.filter(o => o.statusId === 2);
  const failedOrders = orders.filter(o => o.statusId === 3);

  const lowStock = products.filter(p => p.stock < 10);
  const bestSeller = products.reduce((prev, curr) =>
    curr.sold > prev.sold ? curr : prev
  );

  return `
STORE SNAPSHOT

ORDERS:

Delivered orders:
${deliveredOrders.map(o =>
  `• ${o.id} | Customer: ${o.customer} | Total: $${o.total}`
).join('\n') || '• None'}

Pending (In Transit) orders:
${pendingOrders.map(o =>
  `• ${o.id} | Customer: ${o.customer} | Total: $${o.total}`
).join('\n') || '• None'}

Failed / Cancelled orders:
${failedOrders.map(o =>
  `• ${o.id} | Customer: ${o.customer} | Total: $${o.total}`
).join('\n') || '• None'}

PRODUCTS:
- Total products: ${products.length}
- Low stock products: ${lowStock.map(p => p.name).join(', ') || 'None'}
- Best selling product: ${bestSeller.name} (${bestSeller.sold} sold)

RULES:
- When asked about an order, always mention:
  Order ID, customer name, and total amount.
- Use ONLY the data above.
`;
};

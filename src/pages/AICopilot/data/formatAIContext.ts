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

Pending orders:
${pendingOrders.map(o =>
  `• ${o.id} | Customer: ${o.customer} | Total: $${o.total}`
).join('\n') || '• None'}

Cancelled orders:
${failedOrders.map(o =>
  `• ${o.id} | Customer: ${o.customer} | Total: $${o.total}`
).join('\n') || '• None'}

PRODUCTS:
- Total products: ${products.length}
- Low stock products: ${lowStock.map(p => p.name).join(', ') || 'None'}
- Best selling product: ${bestSeller.name} (${bestSeller.sold} sold)

IMPORTANT RULES (MUST FOLLOW):

1. ❌ NEVER respond with JSON, code blocks, or structured objects.
2. ✅ ALWAYS respond with clear human-readable sentences.
3. Allowed order statuses are ONLY:
   - Delivered
   - Pending
   - Cancelled
4. When changing an order status, respond EXACTLY in this format:

   ✅ ORD-XXXX has been successfully marked as <STATUS>.

   Example:
   ✅ ORD-1003 has been successfully marked as Cancelled.

5. When asked about orders, always include:
   - Order ID
   - Customer name
   - Total amount

6. Use ONLY the data above. Do not invent data.
IMPORTANT BUSINESS INSIGHT RULES:

7. When asked about business performance or insights, respond with:
   - Overall store health (Good / Average / Needs attention)
   - Order activity summary
   - Product performance summary
   - One short actionable recommendation

8. Use this response structure for insights:

📊 Store Performance Summary

• Orders:
  - Total orders: X
  - Delivered: X
  - Pending: X
  - Cancelled: X

• Products:
  - Best seller: <Product name>
  - Low stock products: <Names or "None">

• Overall assessment:
  <Short sentence about performance>

• Recommendation:
  <One actionable suggestion>

9. NEVER use JSON, lists with brackets, or code blocks.
10. Keep insights concise, clear, and business-focused.
`;
};

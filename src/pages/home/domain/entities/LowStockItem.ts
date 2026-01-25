export type StockLevel = 'low' | 'critical';

export interface LowStockItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  level: StockLevel;
}

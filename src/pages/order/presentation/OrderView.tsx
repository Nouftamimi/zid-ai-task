import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './OrderViewStyle.styles';
import { orderUseCase } from '../domain/usecase/orderUseCase';
import { orderRepositoryImpl } from '../data/orderRepositoryImpl';
import { Order } from '../domain/entities/Order';
import OrderStatus from '@/src/component/OrderStatus/OrderStatus';
import SearchBar from '@/src/component/SearchBar/SearchBar';
import { useTranslation } from 'react-i18next';
import { simulateOrderUpdate } from '@/src/notifications/pushSimulator';

export default function OrderView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filtered, setFiltered] = useState<Order[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
  orderUseCase(orderRepositoryImpl).getOrders().then(data => {
    setOrders(data);
    setFiltered(data); 

    if (data.length > 0) {
      simulateOrderUpdate(data[0].id);
    }
  });
}, []);


  const handleSearch = (text: string) => {
    if (!text) {
      setFiltered(orders);
      return;
    }

    const lower = text.toLowerCase();

    const result = orders.filter(order =>
      order.id.toLowerCase().includes(lower) ||
      order.customer.toLowerCase().includes(lower)
    );

    setFiltered(result);
  };

  return (
    <View style={styles.fullView}>
      <Text style={styles.title}>{t('Orders')}</Text>

      <SearchBar
        placeholder={t('searchOrders')}
        onSearch={handleSearch}
      />

      <ScrollView style={styles.container}>
        {filtered.map(order => (
          <View key={order.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.id}>{order.id}</Text>
              <Text style={styles.total}>${order.total}</Text>
            </View>

            <Text>{order.customer}</Text>

            <OrderStatus
              status={order.status}
              statusId={order.statusId}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

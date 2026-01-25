import { View, Text } from 'react-native';
import { styles } from './ProductCardStyle.styles';

type Props = {
  name: string;
  price: number;
  stock: number;
};

export default function ProductCard({ name, price, stock }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.stock}>
        Stock: {stock} units
      </Text>
    </View>
  );
}

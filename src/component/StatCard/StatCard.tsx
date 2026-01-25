import { View, Text } from 'react-native';
import { styles } from './StatCard.styles';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  value: string | number;
  change: number;
  icon: string;
};

export default function StatCard({
  title,
  value,
  change,
  icon,
}: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>

      {/* Icon */}
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Value */}
      <Text style={styles.value}>{value}</Text>

      {/* Change */}
      <Text style={styles.change}>
        +{change}%{' '}
        <Text style={styles.sub}>
          {t('vsLastMonth')}
        </Text>
      </Text>

    </View>
  );
}

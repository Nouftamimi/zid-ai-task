import { View, Text } from 'react-native';
import { styles } from './LowStockCard.styles';
import { useTranslation } from 'react-i18next';

type Props = {
  name: string;
  sku: string;
  stock: number;
  level: 'critical' | 'low';
};

export default function LowStockCard({
  name,
  sku,
  stock,
  level,
}: Props) {
  const { t } = useTranslation();
  const isCritical = level === 'critical';

  return (
    <View
      style={[
        styles.card,
        isCritical ? styles.criticalBorder : styles.lowBorder,
      ]}
    >
      {/* Icon */}
      <View
        style={[
          styles.iconBox,
          isCritical ? styles.criticalIconBg : styles.lowIconBg,
        ]}
      >
        <Text style={styles.icon}>
          {isCritical ? '⚠️' : '❗'}
        </Text>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{name}</Text>

          <View
            style={[
              styles.badge,
              isCritical ? styles.criticalBadge : styles.lowBadge,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isCritical
                  ? styles.criticalText
                  : styles.lowText,
              ]}
            >
              {isCritical ? t('critical') : t('low')}
            </Text>
          </View>
        </View>

        <Text style={styles.sku}>
          {t('sku')}: {sku}
        </Text>

        <View style={styles.footerRow}>
          <Text style={styles.stockText}>
            {t('stock')}:{' '}
            <Text style={styles.stockNumber}>
              {stock} {t('units')}
            </Text>
          </Text>

          <Text style={styles.reorder}>
            {t('reorder')}
          </Text>
        </View>
      </View>
    </View>
  );
}

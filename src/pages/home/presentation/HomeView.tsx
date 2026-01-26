
import * as Updates from 'expo-updates';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  I18nManager,
  Pressable,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getHomeDashboard } from '../domain/usecases/homeUseCase';
import { homeRepositoryImpl } from '../data/homeRepositoryImpl';
import { styles } from './HomeViewStyle.styles';
import { LineChart } from 'react-native-gifted-charts';
import LowStockCard from '@/src/component/LowStockCard/LowStockCard';
import StatCard from '@/src/component/StatCard/StatCard';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/src/i18n';

const screenWidth = Dimensions.get('window').width;
const isRTL = I18nManager.isRTL;

export default function HomeView() {
  const [data, setData] = useState<any>(null);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLang = i18n.language as 'en' | 'ar';
  const nextLang = currentLang === 'en' ? 'ar' : 'en';
  const switchLang = async (lang: 'en' | 'ar') => {
    const rtl = lang === 'ar';
    await setLanguage(lang);
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(rtl);
    await Updates.reloadAsync();
  };

  useEffect(() => {
    getHomeDashboard(homeRepositoryImpl)().then(setData);
  }, []);

  if (!data) return <Text>Loading...</Text>;

  const lineChartData = data.revenueOverview.map((item: any) => ({
    value: item.amount,
    label: item.day,
  }));

  return (
    <View style={{ flex: 1 }}>
      {/* ================= SCROLL CONTENT ================= */}
      <ScrollView style={styles.container}>
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.headerTitle}>{t('dashboard')}</Text>
              <Text style={styles.headerSubtitle}>
                {t('welcome', { name: data.user.name })}
              </Text>
            </View>

            <View style={styles.headerIcons}>
              <View style={styles.langSwitcher}>
                <Pressable
                  onPress={() => switchLang(nextLang)}
                  style={styles.langButton}
                >
                  <Text style={styles.langText}>
                    {nextLang.toUpperCase()}
                  </Text>
                </Pressable>
              </View>


              <View style={styles.avatarCircle}>
                <Text style={{ color: 'white' }}>👤</Text>
              </View>
            </View>
          </View>

          <View style={styles.balanceCard}>
            <View>
              <Text style={styles.balanceLabel}>
                {t('totalBalance')}
              </Text>
              <Text style={styles.balanceValue}>
                ${data.balance.total}
              </Text>
            </View>

            <View style={styles.balanceBadge}>
              <Text style={styles.badgeText}>
                ↑ {data.balance.changePercent}%
              </Text>
            </View>
          </View>
        </View>

        {/* ---------- CONTENT ---------- */}
        <View style={styles.content}>
          {/* Stats */}
          <View style={styles.row}>
            <StatCard
              title={t('totalOrders')}
              value={data.stats.orders.total}
              change={data.stats.orders.changePercent}
              icon="🛒"
            />
            <StatCard
              title={t('totalRevenue')}
              value={`$${data.stats.revenue.total / 1000}K`}
              change={data.stats.revenue.changePercent}
              icon="$"
            />
          </View>

          {/* Low Stock */}
          <Text style={styles.sectionTitle}>{t('lowStock')}</Text>
          {data.lowStock.map((item: any) => (
            <LowStockCard
              key={item.id}
              name={item.name}
              sku={item.sku}
              stock={item.stock}
              level={item.level}
            />
          ))}

          {/* Chart */}
          <Text style={styles.sectionTitle}>
            {t('revenueOverview')}
          </Text>

        <View style={styles.chartCard}>
            <LineChart
              data={lineChartData}
              width={screenWidth - 84}
              height={220}
              curved
              isAnimated
              adjustToWidth
              animationDuration={1000}
              endSpacing={10}
              spacing={25}
              thickness={3}
              color="#6366F1"
              hideDataPoints
              hideRules={false}
              rulesColor="#E5E7EB"

              yAxisColor="#fff"
              xAxisColor="#fff"
              yAxisTextStyle={{ color: '#6B7280' }}
              xAxisLabelTextStyle={{
                fontSize: 10,
                color: '#6B7280',
              }}

              areaChart
              startFillColor="#6366F1"
              endFillColor="#6366F1"
              startOpacity={0.2}
              endOpacity={0.02}

              pointerConfig={{
                pointerStripHeight: 180,
                pointerStripColor: '#6366F1',
                pointerStripWidth: 2,
                pointerColor: '#6366F1',
                radius: 5,
                pointerLabelWidth: 80,
                pointerLabelHeight: 40,
                autoAdjustPointerLabelPosition: true,
                pointerLabelComponent: (items: any[]) => (
                  <View
                    style={{
                      transform: [{ scaleX: isRTL ? -1 : 1 }], // 👈 unflip tooltip
                      backgroundColor: '#111',
                      padding: 6,
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: '600' }}>
                      ${items[0].value}
                    </Text>
                  </View>
                ),
              }}
            />
        </View>
        </View>
      </ScrollView>

      {/* ================= FLOATING AI BUTTON ================= */}
      <Pressable
        onPress={() => router.push('/ai-copilot')}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#F5D547',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 6,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 6,
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: '700' }}>+</Text>
      </Pressable>
    </View>
  );
}

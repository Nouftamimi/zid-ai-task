import { View, Text } from 'react-native';

type Props = {
  status: string;
  statusId: number;
};

export default function OrderStatus({ status, statusId }: Props) {
  let bgColor = '#E5E7EB';
  let textColor = '#374151';

  if (statusId === 1) {
    bgColor = '#DCFCE7';   // green
    textColor = '#166534';
  }

  if (statusId === 2) {
    bgColor = '#FEF3C7';   // orange
    textColor = '#92400E';
  }

  if (statusId === 3) {
    bgColor = '#FEE2E2';   // red
    textColor = '#991B1B';
  }

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        backgroundColor: bgColor,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        marginTop: 8,
      }}
    >
      <Text style={{ color: textColor, fontSize: 12, fontWeight: '600' }}>
        {status}
      </Text>
    </View>
  );
}

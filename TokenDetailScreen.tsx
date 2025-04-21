import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import styles from './styles';

// Định nghĩa kiểu dữ liệu cho token
interface Token {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  price: number;
  value: number;
  change: number;
  changePercent: number;
  logo: any;
}

interface TokenDetailScreenProps {
  route: { params: { token: Token } };
  navigation: any;
}

const TokenDetailScreen: React.FC<TokenDetailScreenProps> = ({ route, navigation }) => {
  const { token } = route.params;

  // Giả lập dữ liệu biểu đồ (giá trong 1 ngày)
  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        data: [
          token.price * 0.95,
          token.price * 0.98,
          token.price * 0.90,
          token.price * 1.05,
          token.price * 1.02,
          token.price * 0.99,
          token.price,
        ],
        color: () => '#34C759', // Màu đường biểu đồ
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#131A2A',
    backgroundGradientTo: '#131A2A',
    decimalPlaces: 2,
    color: () => '#FFFFFF',
    labelColor: () => '#A6B0C3',
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#34C759',
    },
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.detailTitle}>{token.name}</Text>
      </View>

      {/* Giá và thay đổi */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${token.price.toFixed(2)}</Text>
        <Text style={[styles.priceChange, { color: token.changePercent >= 0 ? '#34C759' : '#FF3B30' }]}>
          {token.change >= 0 ? '+' : ''}${token.change.toFixed(2)} ({token.changePercent.toFixed(2)}%)
        </Text>
      </View>

      {/* Biểu đồ giá */}
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Tabs thời gian */}
      <View style={styles.timeTabs}>
        <TouchableOpacity style={styles.timeTab}><Text style={styles.timeTabText}>1H</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.timeTab, styles.activeTimeTab]}><Text style={styles.timeTabText}>1D</Text></TouchableOpacity>
        <TouchableOpacity style={styles.timeTab}><Text style={styles.timeTabText}>1W</Text></TouchableOpacity>
        <TouchableOpacity style={styles.timeTab}><Text style={styles.timeTabText}>1M</Text></TouchableOpacity>
        <TouchableOpacity style={styles.timeTab}><Text style={styles.timeTabText}>YTD</Text></TouchableOpacity>
        <TouchableOpacity style={styles.timeTab}><Text style={styles.timeTabText}>TẤT CẢ</Text></TouchableOpacity>
      </View>

      {/* Số dư của bạn */}
      <View style={styles.balanceSection}>
        <Text style={styles.sectionTitle}>Số dư của bạn</Text>
        <View style={styles.balanceRow}>
          <Image source={token.logo} style={styles.tokenLogo} />
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceName}>{token.name}</Text>
            <Text style={styles.balanceAmount}>{token.balance.toFixed(2)} {token.symbol}</Text>
          </View>
          <Text style={styles.balanceValue}>${token.value.toFixed(2)}</Text>
        </View>
      </View>

      {/* Nút hành động */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="arrow-down-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="swap-horizontal-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Hoán đổi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="card-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Mua tiền mặt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Nhiều hơn</Text>
        </TouchableOpacity>
      </View>

      {/* Nút Mua */}
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Mua</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TokenDetailScreen;
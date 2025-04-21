import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
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

    // State để quản lý tab thời gian được chọn
    const [selectedTimeTab, setSelectedTimeTab] = useState('1D');

    // Giả lập dữ liệu biểu đồ cho các khoảng thời gian khác nhau
    const chartDataMap = {
        '1H': [
            token.price * 0.99,
            token.price * 0.995,
            token.price * 0.98,
            token.price * 1.01,
            token.price * 1.005,
            token.price,
        ],
        '1D': [
            token.price * 0.95,
            token.price * 0.98,
            token.price * 0.90,
            token.price * 1.05,
            token.price * 1.02,
            token.price,
        ],
        '1W': [
            token.price * 0.85,
            token.price * 0.90,
            token.price * 0.88,
            token.price * 0.95,
            token.price * 1.00,
            token.price,
        ],
        '1M': [
            token.price * 0.80,
            token.price * 0.85,
            token.price * 0.90,
            token.price * 0.95,
            token.price * 1.00,
            token.price,
        ],
        'YTD': [
            token.price * 0.70,
            token.price * 0.80,
            token.price * 0.85,
            token.price * 0.90,
            token.price * 0.95,
            token.price,
        ],
        'ALL': [
            token.price * 0.60,
            token.price * 0.70,
            token.price * 0.80,
            token.price * 0.90,
            token.price * 0.95,
            token.price,
        ],
    };

    // Dữ liệu biểu đồ dựa trên tab được chọn
    const chartData = {
        labels: [], // Bỏ nhãn trục X
        datasets: [
            {
                data: chartDataMap[selectedTimeTab],
                color: () => '#34C759', // Màu đường biểu đồ
                strokeWidth: 2,
            },
        ],
    };

    const chartConfig = {
        backgroundColor: 'transparent', // Nền trong suốt
        backgroundGradientFrom: 'transparent',
        backgroundGradientTo: 'transparent',
        decimalPlaces: 2,
        color: () => '#34C759', // Màu đường
        labelColor: () => 'transparent', // Ẩn nhãn trục
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#34C759', // Viền điểm màu xanh
            fill: '#FFFFFF', // Điểm màu trắng
        },
        propsForBackgroundLines: {
            strokeWidth: 0, // Ẩn lưới
        },
    };

    // State để điều khiển hiển thị thêm nội dung giới thiệu
    const [showMore, setShowMore] = useState(false);

    // Giả lập thông tin token (có thể thay thế bằng API thực tế)
    const tokenInfo = {
        description: "Solana is a highly functional open source project that banks on blockchain technology’s permissionless nature to provide decentralized finance (DeFi) solutions.",
        marketCap: 7147000000, // $7.147B
        totalSupply: 599030000, // 599.03M
        circulatingSupply: 516880000, // 516.88M
        website: "https://solana.com",
        telegram: "https://t.me/solana",
        twitter: "https://twitter.com/solana",
        volume24h: 2428000000, // $2.428B
        volumeChange24h: 15.774, // +15.774%
        transactions24h: 25460000, // 25.46M
        transactionsChange24h: 4.226, // +4.226%
        traders24h: 2724000, // 2.724M
        tradersChange24h: 56.629, // +56.629%
    };

    // Hàm xử lý mở liên kết
    const openLink = (url: string) => {
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };

    return (
        <View style={styles.container}>
            {/* Header cố định */}
            <View style={styles.detailHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.detailTitle}>{token.name}</Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
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
                    width={Dimensions.get('window').width - 30}
                    height={150} // Giảm chiều cao biểu đồ
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                    withHorizontalLines={false} // Ẩn lưới ngang
                    withVerticalLines={false} // Ẩn lưới dọc
                    withHorizontalLabels={false} // Ẩn nhãn trục X
                    withVerticalLabels={false} // Ẩn nhãn trục Y
                />

                {/* Tabs thời gian */}
                <View style={styles.timeTabs}>
                    <TouchableOpacity
                        style={[styles.timeTab, selectedTimeTab === '1H' && styles.activeTimeTab]}
                        onPress={() => setSelectedTimeTab('1H')}
                    >
                        <Text style={styles.timeTabText}>1H</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.timeTab, selectedTimeTab === '1D' && styles.activeTimeTab]}
                        onPress={() => setSelectedTimeTab('1D')}
                    >
                        <Text style={styles.timeTabText}>1D</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.timeTab, selectedTimeTab === '1W' && styles.activeTimeTab]}
                        onPress={() => setSelectedTimeTab('1W')}
                    >
                        <Text style={styles.timeTabText}>1W</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.timeTab, selectedTimeTab === '1M' && styles.activeTimeTab]}
                        onPress={() => setSelectedTimeTab('1M')}
                    >
                        <Text style={styles.timeTabText}>1M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.timeTab, selectedTimeTab === 'YTD' && styles.activeTimeTab]}
                        onPress={() => setSelectedTimeTab('YTD')}
                    >
                        <Text style={styles.timeTabText}>YTD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.timeTab, selectedTimeTab === 'ALL' && styles.activeTimeTab]}
                        onPress={() => setSelectedTimeTab('ALL')}
                    >
                        <Text style={styles.timeTabText}>TẤT CẢ</Text>
                    </TouchableOpacity>
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

                {/* Phần Đặt cọc */}
                <View style={styles.stakingSection}>
                    <View style={styles.stakingHeader}>
                        <Ionicons name="trending-up" size={24} color="#34C759" />
                        <Text style={styles.stakingTitle}>Bắt đầu kiếm {token.symbol}</Text>
                    </View>
                    <Text style={styles.stakingDescription}>Cọc token và kiếm phần thưởng</Text>
                </View>

                {/* Phần Giới thiệu */}
                <View style={styles.introductionSection}>
                    <Text style={styles.sectionTitle}>Giới thiệu</Text>
                    <Text style={styles.introductionText} numberOfLines={showMore ? undefined : 2}>
                        {tokenInfo.description}
                    </Text>
                    <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                        <Text style={styles.showMoreText}>
                            {showMore ? 'Ẩn bớt' : 'Hiển thị thêm'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Liên kết */}
                <View style={styles.linksSection}>
                    <TouchableOpacity style={styles.linkButton} onPress={() => openLink(tokenInfo.website)}>
                        <Ionicons name="globe-outline" size={20} color="#FFFFFF" />
                        <Text style={styles.linkText}>Website</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkButton} onPress={() => openLink(tokenInfo.telegram)}>
                        <Ionicons name="paper-plane-outline" size={20} color="#FFFFFF" />
                        <Text style={styles.linkText}>Telegram</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkButton} onPress={() => openLink(tokenInfo.twitter)}>
                        <Ionicons name="logo-twitter" size={20} color="#FFFFFF" />
                        <Text style={styles.linkText}>X</Text>
                    </TouchableOpacity>
                </View>

                {/* Phần Thông tin */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Thông tin</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Biểu tượng</Text>
                        <Text style={styles.infoValue}>{token.symbol}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Mạng lưới</Text>
                        <Text style={styles.infoValue}>{token.name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Vốn hóa thị trường</Text>
                        <Text style={styles.infoValue}>${(tokenInfo.marketCap / 1e9).toFixed(3)}B</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Tổng lượng cung</Text>
                        <Text style={styles.infoValue}>{(tokenInfo.totalSupply / 1e6).toFixed(2)}M</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Lượng cung đang lưu hành</Text>
                        <Text style={styles.infoValue}>{(tokenInfo.circulatingSupply / 1e6).toFixed(2)}M</Text>
                    </View>
                </View>

                {/* Phần Hiệu quả 24 giờ */}
                <View style={styles.performanceSection}>
                    <Text style={styles.sectionTitle}>Hiệu quả 24 giờ</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Khối lượng</Text>
                        <Text style={styles.infoValue}>
                            ${(tokenInfo.volume24h / 1e9).toFixed(3)}B{' '}
                            <Text style={[styles.changePercent, { color: tokenInfo.volumeChange24h >= 0 ? '#34C759' : '#FF3B30' }]}>
                                {tokenInfo.volumeChange24h >= 0 ? '+' : ''}{tokenInfo.volumeChange24h.toFixed(3)}%
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Giao dịch</Text>
                        <Text style={styles.infoValue}>
                            {(tokenInfo.transactions24h / 1e6).toFixed(2)}M{' '}
                            <Text style={[styles.changePercent, { color: tokenInfo.transactionsChange24h >= 0 ? '#34C759' : '#FF3B30' }]}>
                                {tokenInfo.transactionsChange24h >= 0 ? '+' : ''}{tokenInfo.transactionsChange24h.toFixed(3)}%
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Nhà giao dịch</Text>
                        <Text style={styles.infoValue}>
                            {(tokenInfo.traders24h / 1e6).toFixed(3)}M{' '}
                            <Text style={[styles.changePercent, { color: tokenInfo.tradersChange24h >= 0 ? '#34C759' : '#FF3B30' }]}>
                                {tokenInfo.tradersChange24h >= 0 ? '+' : ''}{tokenInfo.tradersChange24h.toFixed(3)}%
                            </Text>
                        </Text>
                    </View>
                </View>

                {/* Nút Mua */}
                <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Mua</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default TokenDetailScreen;
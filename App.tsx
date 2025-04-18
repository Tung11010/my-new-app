import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Alert, Platform, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
  logo: string;
}

// Danh sách logo mẫu
const sampleLogos = [
  'https://cryptologos.cc/logos/solana-sol-logo.png',
  'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
  'https://cryptologos.cc/logos/serum-srm-logo.png',
  'https://via.placeholder.com/40',
];

// Dữ liệu giả lập
const initialMockData = {
  totalBalance: 0,
  balanceChange: 0,
  balanceChangePercent: 0,
  sol: {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    balance: 0.5,
    price: 145,
    value: 0,
    change: 0,
    changePercent: 0,
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
  },
  tokens: [
    { id: '1', name: 'USDC', symbol: 'USDC', balance: 100, price: 1, value: 100, change: 0, changePercent: 0, logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png' },
    { id: '2', name: 'Serum', symbol: 'SRM', balance: 200, price: 0.03, value: 6, change: 0, changePercent: 0, logo: 'https://cryptologos.cc/logos/serum-srm-logo.png' },
    { id: '3', name: 'Raydium', symbol: 'RAY', balance: 50, price: 1.5, value: 75, change: 0, changePercent: 0, logo: 'https://cryptologos.cc/logos/raydium-ray-logo.png' },
    { id: '4', name: 'Saber', symbol: 'SBR', balance: 1000, price: 0.002, value: 2, change: 0, changePercent: 0, logo: 'https://via.placeholder.com/40' },
    { id: '5', name: 'Orca', symbol: 'ORCA', balance: 20, price: 2.5, value: 50, change: 0, changePercent: 0, logo: 'https://via.placeholder.com/40' },
    { id: '6', name: 'Mango', symbol: 'MNGO', balance: 300, price: 0.02, value: 6, change: 0, changePercent: 0, logo: 'https://via.placeholder.com/40' },
    { id: '7', name: 'Jito', symbol: 'JTO', balance: 10, price: 3, value: 30, change: 0, changePercent: 0, logo: 'https://via.placeholder.com/40' },
    { id: '8', name: 'Bonfida', symbol: 'FIDA', balance: 150, price: 0.25, value: 37.5, change: 0, changePercent: 0, logo: 'https://via.placeholder.com/40' },
    { id: '9', name: 'Marinade', symbol: 'MNDE', balance: 200, price: 0.1, value: 20, change: 0, changePercent: 0, logo: 'https://via.placeholder.com/40' },
    { id: '10', name: 'Drift', symbol: 'DRIFT', balance: 80, price: 0.5, value: 40, change: 0, changePercent: 0, logo: 'https://via.placeholder.com/40' },
  ],
};

// Màn hình Home
const HomeScreen: React.FC = () => {
  const [walletName, setWalletName] = useState<string>('@dynh');
  const [walletNameInput, setWalletNameInput] = useState<string>('Tài khoản 1');
  const [walletLogo, setWalletLogo] = useState<string>('https://via.placeholder.com/40');
  const [solBalance, setSolBalance] = useState<number>(0.5);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [balanceChange, setBalanceChange] = useState<number>(0);
  const [balanceChangePercent, setBalanceChangePercent] = useState<number>(0);
  const [sol, setSol] = useState<Token>(initialMockData.sol);
  const [tokens, setTokens] = useState<Token[]>(initialMockData.tokens);
  const [tokenDisplayCount, setTokenDisplayCount] = useState<number>(10);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tempWalletName, setTempWalletName] = useState<string>('');
  const [tempWalletNameInput, setTempWalletNameInput] = useState<string>('');
  const [tempWalletLogo, setTempWalletLogo] = useState<string>('');
  const [tempSolBalance, setTempSolBalance] = useState<string>('0.5');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Tải dữ liệu từ AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const savedWalletName = await AsyncStorage.getItem('walletName');
        const savedWalletNameInput = await AsyncStorage.getItem('walletNameInput');
        const savedWalletLogo = await AsyncStorage.getItem('walletLogo');
        const savedSolBalance = await AsyncStorage.getItem('solBalance');
        const savedTokenCount = await AsyncStorage.getItem('tokenDisplayCount');
        if (savedWalletName) setWalletName(savedWalletName);
        if (savedWalletNameInput) setWalletNameInput(savedWalletNameInput);
        if (savedWalletLogo) setWalletLogo(savedWalletLogo);
        if (savedSolBalance) {
          setSolBalance(parseFloat(savedSolBalance) || 0.5);
          setTempSolBalance(savedSolBalance);
        }
        if (savedTokenCount) setTokenDisplayCount(parseInt(savedTokenCount) || 10);
      } catch (error) {
        console.error('Error loading user data:', error);
        Alert.alert('Lỗi', 'Không thể tải dữ liệu ví');
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  // Cập nhật giá thị trường
  useEffect(() => {
    const updateMarketPrices = () => {
      setIsLoading(true);
      setSol((prev) => {
        const newPrice = prev.price * (1 + (Math.random() * 0.2 - 0.1));
        const newValue = solBalance * newPrice;
        const newChange = newValue - prev.value;
        const newChangePercent = prev.value ? (newChange / prev.value) * 100 : 0;
        return { ...prev, price: newPrice, value: newValue, change: newChange, changePercent: newChangePercent, balance: solBalance };
      });

      setTokens((prev) =>
        prev.map((token) => {
          const newPrice = token.price * (1 + (Math.random() * 0.2 - 0.1));
          const newValue = token.balance * newPrice;
          const newChange = newValue - token.value;
          const newChangePercent = token.value ? (newChange / token.value) * 100 : 0;
          return { ...token, price: newPrice, value: newValue, change: newChange, changePercent: newChangePercent };
        })
      );
      setIsLoading(false);
    };

    updateMarketPrices();
    const interval = setInterval(updateMarketPrices, 5000); // Cập nhật mỗi 5 giây
    return () => clearInterval(interval);
  }, [solBalance]);

  // Tính tổng số dư
  useEffect(() => {
    const newTotalBalance = sol.value + tokens.reduce((sum, token) => sum + token.value, 0);
    const prevTotalBalance = totalBalance || newTotalBalance;
    const newBalanceChange = newTotalBalance - prevTotalBalance;
    const newBalanceChangePercent = prevTotalBalance ? (newBalanceChange / prevTotalBalance) * 100 : 0;
    setTotalBalance(newTotalBalance);
    setBalanceChange(newBalanceChange);
    setBalanceChangePercent(newBalanceChangePercent);
  }, [sol, tokens, totalBalance]);

  // Lưu dữ liệu vào AsyncStorage
  const saveUserData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Lỗi', 'Không thể lưu dữ liệu ví');
    }
  };

  // Xử lý thay đổi số lượng token hiển thị
  const handleTokenCountChange = (value: string) => {
    const count = parseInt(value);
    if (isNaN(count) || count < 1 || count > 10) {
      Alert.alert('Lỗi', 'Vui lòng nhập số từ 1 đến 10');
      return;
    }
    setTokenDisplayCount(count);
    saveUserData('tokenDisplayCount', count.toString());
  };

  // Xử lý lưu thông tin ví
  const handleSaveWalletInfo = () => {
    const newWalletName = tempWalletName || `@user${Math.floor(Math.random() * 1000)}`;
    const newWalletNameInput = tempWalletNameInput || `Tài khoản ${Math.floor(Math.random() * 100)}`;
    const newWalletLogo = tempWalletLogo || sampleLogos[Math.floor(Math.random() * sampleLogos.length)];
    const newSolBalance = parseFloat(tempSolBalance) || 0.5;

    if (newSolBalance < 0) {
      Alert.alert('Lỗi', 'Số dư SOL không thể âm');
      return;
    }

    setWalletName(newWalletName);
    setWalletNameInput(newWalletNameInput);
    setWalletLogo(newWalletLogo);
    setSolBalance(newSolBalance);
    saveUserData('walletName', newWalletName);
    saveUserData('walletNameInput', newWalletNameInput);
    saveUserData('walletLogo', newWalletLogo);
    saveUserData('solBalance', newSolBalance.toString());
    setModalVisible(false);
    setTempWalletName('');
    setTempWalletNameInput('');
    setTempWalletLogo('');
    setTempSolBalance(newSolBalance.toString());
  };

  // Render Solana
  const renderSol = useCallback(() => {
    const changeColor = sol.changePercent >= 0 ? '#34C759' : '#FF3B30';
    return (
      <View style={styles.tokenContainer}>
        <View style={styles.tokenLogoContainer}>
          <Image source={{ uri: sol.logo }} style={styles.tokenLogo} />
          <Text style={styles.sIcon}>S</Text>
        </View>
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenName}>{sol.name}</Text>
          <Text style={styles.tokenBalance}>
            {sol.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {sol.symbol}
          </Text>
        </View>
        <View style={styles.tokenValue}>
          <Text style={styles.tokenPrice}>${sol.value.toFixed(2)}</Text>
          {sol.change !== 0 && (
            <Text style={[styles.tokenChange, { color: changeColor }]}>
              {sol.change >= 0 ? '+' : ''}${sol.change.toFixed(2)} ({sol.changePercent.toFixed(2)}%)
            </Text>
          )}
        </View>
      </View>
    );
  }, [sol]);

  // Render token
  const renderToken = useCallback(({ item }: { item: Token }) => {
    const changeColor = item.changePercent >= 0 ? '#34C759' : '#FF3B30';
    return (
      <View style={styles.tokenContainer}>
        <View style={styles.tokenLogoContainer}>
          <Image source={{ uri: item.logo }} style={styles.tokenLogo} />
          <Text style={styles.sIcon}>S</Text>
        </View>
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenName}>{item.name}</Text>
          <Text style={styles.tokenBalance}>
            {item.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {item.symbol}
          </Text>
        </View>
        <View style={styles.tokenValue}>
          <Text style={styles.tokenPrice}>${item.value.toFixed(2)}</Text>
          {item.change !== 0 && (
            <Text style={[styles.tokenChange, { color: changeColor }]}>
              {item.change >= 0 ? '+' : ''}${item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
            </Text>
          )}
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh sửa thông tin ví</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên ví (để trống để tạo ngẫu nhiên)"
              value={tempWalletName}
              onChangeText={setTempWalletName}
            />
            <TextInput
              style={styles.input}
              placeholder="Tên tài khoản (để trống để tạo ngẫu nhiên)"
              value={tempWalletNameInput}
              onChangeText={setTempWalletNameInput}
            />
            <TextInput
              style={styles.input}
              placeholder="URL logo ví (để trống để chọn ngẫu nhiên)"
              value={tempWalletLogo}
              onChangeText={setTempWalletLogo}
            />
            <TextInput
              style={styles.input}
              placeholder="Số dư SOL"
              keyboardType="numeric"
              value={tempSolBalance}
              onChangeText={setTempSolBalance}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveWalletInfo}>
                <Text style={styles.modalButtonText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity style={styles.walletNameContainer} onPress={() => setModalVisible(true)}>
          <Image source={{ uri: walletLogo }} style={styles.tokenLogo} />
          <View style={styles.walletNameWrapper}>
            <Text style={styles.walletName}>{walletName}</Text>
            <Text style={styles.walletNameInput}>{walletNameInput}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="qr-code-outline" size={24} color="#FFFFFF" style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#FFFFFF" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>${totalBalance.toFixed(2)}</Text>
        <Text style={[styles.balanceChange, { color: balanceChangePercent >= 0 ? '#34C759' : '#FF3B30' }]}>
          {balanceChange >= 0 ? '+' : ''}${balanceChange.toFixed(2)} ({balanceChangePercent.toFixed(2)}%)
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="arrow-down-outline" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="arrow-up-outline" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="swap-horizontal-outline" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Swap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="card-outline" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tokenCountContainer}>
        <Text style={styles.tokenCountLabel}>Số token hiển thị (1-10):</Text>
        <TextInput
          style={styles.tokenCountInput}
          keyboardType="numeric"
          value={tokenDisplayCount.toString()}
          onChangeText={handleTokenCountChange}
        />
      </View>

      {renderSol()}

      <FlatList
        data={tokens.slice(0, tokenDisplayCount)}
        renderItem={renderToken}
        keyExtractor={(item) => item.id}
        style={styles.tokenList}
      />
    </View>
  );
};

// Các màn hình placeholder
const AppsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Apps Screen</Text>
  </View>
);

const ReloadScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Reload Screen</Text>
  </View>
);

const ClockScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Clock Screen</Text>
  </View>
);

const CompassScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Compass Screen</Text>
  </View>
);

// Tạo Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Apps') iconName = 'apps';
            else if (route.name === 'Reload') iconName = 'reload';
            else if (route.name === 'Clock') iconName = 'time';
            else if (route.name === 'Compass') iconName = 'compass';
            return <Ionicons name={iconName} size={size + 4} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#A6B0C3',
          tabBarStyle: {
            backgroundColor: '#131A2A',
            borderTopColor: '#242E42',
            borderTopWidth: 1,
            height: Platform.OS === 'ios' ? 80 : 70,
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
            paddingTop: 5,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Apps" component={AppsScreen} />
        <Tab.Screen name="Reload" component={ReloadScreen} />
        <Tab.Screen name="Clock" component={ClockScreen} />
        <Tab.Screen name="Compass" component={CompassScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131A2A',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  walletNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletNameWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  walletLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  walletName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  walletNameInput: {
    color: '#A6B0C3',
    fontSize: 14,
    marginRight: 5,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 15,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  balanceChange: {
    fontSize: 16,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#242E42',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
  },
  tokenCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tokenCountLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 10,
  },
  tokenCountInput: {
    backgroundColor: '#242E42',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 5,
    width: 50,
    textAlign: 'center',
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242E42',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  tokenLogoContainer: {
    position: 'relative',
    marginRight: 10,
  },
  tokenLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: '#131A2A',
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tokenBalance: {
    color: '#A6B0C3',
    fontSize: 14,
  },
  tokenValue: {
    alignItems: 'flex-end',
  },
  tokenPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tokenChange: {
    fontSize: 14,
  },
  tokenList: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#242E42',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#242E42',
    color: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
  },
  modalButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
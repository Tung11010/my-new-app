import { StyleSheet } from 'react-native';

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
    marginRight: 3,
  },
  walletName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 1,
  },
  walletNameInput: {
    color: '#A6B0C3',
    fontSize: 14,
    marginRight: 1,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#131A2A',
    width: 16,
    height: 16,
    resizeMode: 'contain',
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
    borderWidth: 1,
    borderColor: '#A6B0C3',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    padding: 10,
  },
  modalButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    alignSelf: 'center',
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
  tokenDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Styles cho TokenDetailScreen
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#131A2A',
  },
  detailTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  priceContainer: {
    alignItems: 'center',
    padding: 20,
  },
  price: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  priceChange: {
    fontSize: 16,
    marginTop: 5,
  },
  chart: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 16,
  },
  timeTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  timeTab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#242E42',
  },
  activeTimeTab: {
    backgroundColor: '#007AFF',
  },
  timeTabText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  balanceSection: {
    padding: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242E42',
    borderRadius: 10,
    padding: 10,
  },
  balanceInfo: {
    flex: 1,
    marginLeft: 10,
  },
  balanceName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  balanceAmount: {
    color: '#A6B0C3',
    fontSize: 14,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
  },
  buyButton: {
    backgroundColor: '#A855F7',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
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
    marginRight: 3, // Giảm từ 5 xuống 3 để các hình ảnh gần nhau hơn
  },
  walletName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 1, // Giảm từ 2 xuống 1
  },
  walletNameInput: {
    color: '#A6B0C3',
    fontSize: 14,
    marginRight: 1, // Giảm từ 2 xuống 1
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

export default styles;
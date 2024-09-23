import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, SafeAreaView, StatusBar, Dimensions, Platform, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      NetInfo.fetch().then(state => {
        setIsConnected(state.isConnected);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWebViewLoad = () => {
    setLoading(false);
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
  };

  if (!isConnected) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.noInternetText}>No Internet Connection</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => NetInfo.fetch().then(state => setIsConnected(state.isConnected))}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={true} />
      {showLoading && (
        <View style={styles.loadingContainer}>
          <Image source={require('./assets/2.png')} style={styles.largeLogo} />
          <ActivityIndicator size="large" color="#1e90ff" style={styles.spinner} />
        </View>
      )}
      <WebView 
        source={{ uri: 'https://fastclock.dexignzone.com/mobile/xhtml/sign-in.html' }} 
        onLoad={handleWebViewLoad} 
        onError={() => setIsConnected(false)} 
        style={styles.webView}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Background for overall container
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: "100%",
  },
  largeLogo: {
    width: 300,
    height: 300,
    marginBottom: 50,
  },
  spinner: {
    marginTop: 30,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  errorImage: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  noInternetText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  webView: {
    flex: 1,
    marginTop: +StatusBar.currentHeight,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  footerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  /* Styles for dark mode */
  darkModeBackground: {
    backgroundColor: '#1a1a1a',
  },
  darkModeText: {
    color: '#ccc',
  },
  errorDarkContainer: {
    backgroundColor: '#343a40',
  },
  darkSpinner: {
    color: '#ffb74d',
  },
  /* Button styles */
  primaryButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 15,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  secondaryButtonText: {
    color: '#f8f9fa',
    fontSize: 16,
    fontWeight: '500',
  },
  /* Adding additional margin */
  contentMargin: {
    marginHorizontal: 30,
  },
  extraMargin: {
    marginTop: 50,
  },
  extraPadding: {
    padding: 40,
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  footerSecondaryText: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 5,
  },
  /* Flex alignments for perfection */
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexStretch: {
    justifyContent: 'space-around',
  },
  gridThree: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  roundedCorners: {
    borderRadius: 25,
  },
  shadowEffect: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  /* Spacer helpers */
  spacerSm: {
    height: 15,
  },
  spacerMd: {
    height: 25,
  },
  spacerLg: {
    height: 50,
  },
  /* Fancy gradients */
  gradientBackground: {
    background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 100%)',
  },
  gradientHeader: {
    background: 'linear-gradient(90deg, #4c4c4c 0%, #000000 100%)',
  },
  gradientFooter: {
    background: 'linear-gradient(180deg, #000000 0%, #343a40 100%)',
  },
});

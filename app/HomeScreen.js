import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  return (
    <LinearGradient colors={['#192655', '#121212']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.title}>HalalCheck</Text>
          <Text style={styles.subtitle}>Snabb halalbedömning från alla rättsskolor</Text>
        </View>
        <View style={styles.buttonSection}>
          <Pressable
            style={({ pressed }) => [styles.button, styles.blueButton, pressed && styles.buttonPressed]}
            android_ripple={{ color: '#1976D2' }}
            onPress={() => router.push('/SearchScreen')}
          >
            <Icon name="magnify" size={26} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Sök produkt manuellt</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.button, styles.greenButton, pressed && styles.buttonPressed]}
            android_ripple={{ color: '#388E3C' }}
            onPress={() => router.push('/ScannerScreen')}
          >
            <Icon name="qrcode-scan" size={26} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Skanna produktkod</Text>
          </Pressable>
        </View>
        <Text style={styles.footer}>© 2025 HalalCheck. Alla rättigheter förbehållna.</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    minHeight: '100%',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 6,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B8C1',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    gap: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 8,
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    opacity: 1,
    transition: 'opacity 0.2s',
  },
  blueButton: {
    backgroundColor: '#1E88E5',
  },
  greenButton: {
    backgroundColor: '#43A047',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  lottieContainer: {
    alignItems: 'center',
    marginVertical: 18,
  },
  lottie: {
    width: 150,
    height: 150,
  },
  footer: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 8,
  },
}); 
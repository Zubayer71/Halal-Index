import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const isProcessing = useRef(false); 

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Appen behöver kameratillstånd</Text>
        <Button onPress={requestPermission} title="Ge tillstånd" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }) => {
    if (isProcessing.current) return;
    isProcessing.current = true;
    setScanned(true);
    setLoading(true);

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      const json = await res.json();

      if (json.status === 1) {
        // navigera till rätt skärm med produktens kod
        router.push({
          pathname: '/ProductScreen', // ändra till '/product' om du byter filnamn
          params: { code: data }
        });
      } else {
        Alert.alert('Produkten hittades inte');
        setScanned(false);
        isProcessing.current = false;
      }
    } catch (error) {
      Alert.alert('Fel vid hämtning', 'Kunde inte hämta produktdata.');
      setScanned(false);
      isProcessing.current = false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'upc_a']
        }}
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Hämtar produkt...</Text>
        </View>
      )}

      {scanned && !loading && (
        <View style={styles.rescanContainer}>
          <Button
            title="Skanna igen"
            onPress={() => {
              setScanned(false);
              isProcessing.current = false;
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  message: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16
  },
  loadingOverlay: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16
  },
  rescanContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center'
  }
});

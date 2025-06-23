import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ProductInfo from '../components/ProductInfo';
import SchoolOpinionCard from '../components/SchoolOpinionCard';

const opinions = [
  { school: 'Hanafi', status: 'halal', reason: 'Inga otillåtna ingredienser.' },
  { school: 'Shafi', status: 'haram', reason: 'Innehåller gelatin.' },
  { school: 'Maliki', status: 'tveksamt', reason: 'Otydlig källa till vissa tillsatser.' },
  { school: 'Hanbali', status: 'halal', reason: 'Alla ingredienser tillåtna.' },
];

export default function ProductScreen() {
  const { code } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    setError('');
    fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 1) {
          setProduct(data.product);
        } else {
          setError('Produkten hittades inte.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Kunde inte hämta produktdata.');
        setLoading(false);
      });
  }, [code]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E88E5" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <ProductInfo product={product} />
      )}

      <View style={styles.opinionsSection}>
        {opinions.map((op) => (
          <SchoolOpinionCard key={op.school} {...op} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#121212' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  error: { color: '#e53935', fontSize: 16, textAlign: 'center' },
  opinionsSection: { marginTop: 12 },
});

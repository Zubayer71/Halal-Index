import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProductInfo({ product }) {
  if (!product) return null;
  return (
    <View style={styles.container}>
      {product.image_url ? (
        <Image source={{ uri: product.image_url }} style={styles.image} />
      ) : null}
      <Text style={styles.name}>{product.product_name || 'Namn saknas'}</Text>
      <Text style={styles.ingredients}>{product.ingredients_text || 'Inga ingredienser angivna'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 16 },
  image: { width: 150, height: 150, borderRadius: 8, marginBottom: 8 },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 8, color: '#fff', textAlign: 'center' },
  ingredients: { fontSize: 14, marginTop: 4, color: '#bbb', textAlign: 'center' },
}); 
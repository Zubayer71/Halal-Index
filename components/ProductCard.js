import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const CARD_SIZE = Math.floor(Dimensions.get('window').width / 3) - 18;

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: product.image_url }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>{product.product_name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE + 32,
    backgroundColor: '#23272f',
    borderRadius: 16,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    padding: 8,
  },
  image: {
    width: CARD_SIZE - 24,
    height: CARD_SIZE - 24,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#333',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 2,
  },
}); 
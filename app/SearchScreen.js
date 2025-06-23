import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const EXAMPLE_URL = 'https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page_size=12';

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [examples, setExamples] = useState([]);
  const router = useRouter();
  const debouncedSearch = useRef(
    debounce(async (text) => {
      if (!text.trim()) return;
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(text)}&search_simple=1&action=process&json=1&page_size=30`);
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setResults(data.products.filter(p => p.product_name && p.image_url));
        } else {
          setResults([]);
          setError('Inga produkter matchade din sökning');
        }
      } catch (e) {
        setError('Kunde inte hämta data. Försök igen.');
        setResults([]);
      }
      setLoading(false);
    }, 350)
  ).current;

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError('');
      setLoading(true);
      fetch(EXAMPLE_URL)
        .then(res => res.json())
        .then(data => {
          setExamples(data.products.filter(p => p.product_name && p.image_url));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      debouncedSearch(query);
    }
  }, [query]);

  const renderCard = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => router.push({ pathname: '/ProductScreen', params: { code: item.code } })}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={Keyboard.dismiss}
          placeholder="Skriv produktnamn eller E-nummer"
        />
        {loading && <ActivityIndicator size="large" color="#1E88E5" style={{ marginVertical: 24 }} />}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <FlatList
          data={query.trim() ? results : examples}
          keyExtractor={item => item.code}
          renderItem={renderCard}
          numColumns={3}
          contentContainerStyle={styles.grid}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={!loading && !error ? <Text style={styles.empty}>Inga produkter att visa</Text> : null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  grid: {
    paddingBottom: 32,
    paddingTop: 8,
    alignItems: 'center',
  },
  error: {
    color: '#e53935',
    textAlign: 'center',
    marginVertical: 12,
    fontSize: 15,
  },
  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 15,
  },
}); 
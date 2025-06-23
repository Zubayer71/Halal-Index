import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const statusColors = {
  halal: 'green',
  haram: 'red',
  tveksamt: 'orange',
};

export default function SchoolOpinionCard({ school, status, reason }) {
  return (
    <View style={[styles.card, { borderColor: statusColors[status] || 'gray' }] }>
      <Text style={styles.school}>{school}</Text>
      <Text style={[styles.status, { color: statusColors[status] || 'gray' }]}>{status.toUpperCase()}</Text>
      <Text style={styles.reason}>{reason}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 2, borderRadius: 8, padding: 16, marginVertical: 10, backgroundColor: '#181c22' },
  school: { fontWeight: 'bold', fontSize: 18, color: '#fff', marginBottom: 2 },
  status: { fontWeight: 'bold', fontSize: 16, marginVertical: 4 },
  reason: { fontSize: 14, color: '#fff', marginTop: 2 },
}); 
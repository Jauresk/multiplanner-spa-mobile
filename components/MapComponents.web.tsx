// Web stub: react-native-maps is not supported on web.
// These stub components render a placeholder so the app doesn't crash.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    minHeight: 240,
    backgroundColor: '#EEF7F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B1630',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
});

// MapView stub
const MapView: React.FC<any> = ({ style, children }) => (
  <View style={[styles.placeholder, style]}>
    <Text style={styles.title}>🗺️ Carte disponible sur mobile</Text>
    <Text style={styles.subtitle}>
      La carte native sera affichée sur iOS et Android.
    </Text>
  </View>
);

// Marker stub (renders nothing — parent MapView is the placeholder)
const Marker: React.FC<any> = () => null;

// Callout stub
const Callout: React.FC<any> = () => null;

// Other commonly used exports
const Polyline: React.FC<any> = () => null;
const Polygon: React.FC<any> = () => null;
const Circle: React.FC<any> = () => null;

export default MapView;
export { Marker, Callout, Polyline, Polygon, Circle };
export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
export type LatLng = { latitude: number; longitude: number };
export type MapMarkerProps = any;
export type MapViewProps = any;


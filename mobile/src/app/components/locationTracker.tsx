import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid, Platform, StyleSheet, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  timestamp: number;
}

const LocationTracker = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  // Solicita permissão no Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão para acessar localização',
            message: 'Este app precisa acessar sua localização para registrar o ponto.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Permitir',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS já pede permissão automaticamente
  };

  const startTracking = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Erro', 'Permissão de localização negada');
      return;
    }

    const id = Geolocation.watchPosition(
      (position) => {
        console.log('Nova posição:', position);
        setLocation(position);
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
        Alert.alert('Erro', 'Não foi possível obter a localização');
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // atualiza se mover mais de 10 metros
        interval: 5000, // a cada 5 segundos
        fastestInterval: 2000,
        showLocationDialog: true,
        forceRequestLocation: true,
      }
    );

    setWatchId(id);
    setIsTracking(true);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Posição atual:', position);
        setLocation(position);
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
        Alert.alert('Erro', 'Não foi possível obter a localização');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Localização Atual</Text>
      
      {location ? (
        <View style={styles.locationInfo}>
          <Text style={styles.locationText}>
            Latitude: {location.coords.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Longitude: {location.coords.longitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Precisão: {location.coords.accuracy.toFixed(2)}m
          </Text>
          <Text style={styles.locationText}>
            Atualizado: {new Date(location.timestamp).toLocaleTimeString()}
          </Text>
        </View>
      ) : (
        <Text style={styles.noLocation}>Nenhuma localização encontrada</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={getCurrentLocation}
        >
          <Text style={styles.buttonText}>Obter Localização</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, isTracking ? styles.stopButton : styles.startButton]} 
          onPress={isTracking ? stopTracking : startTracking}
        >
          <Text style={styles.buttonText}>
            {isTracking ? 'Parar Rastreamento' : 'Iniciar Rastreamento'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  locationInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    marginBottom: 5,
  },
  noLocation: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LocationTracker;
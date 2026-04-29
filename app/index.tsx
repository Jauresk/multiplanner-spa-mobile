import React, { useEffect } from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { COLORS, images } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/theme/ThemeProvider';

type Nav = {
  navigate: (value: string) => void
}

const Onboarding1 = () => {
  const { navigate } = useNavigation<Nav>();
  const { dark } = useTheme();

  // Add UseEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('onboarding2');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ImageBackground
      source={dark ? images.onboardingSplashDark : images.onboardingSplash}
      style={styles.area}>
      <StatusBar hidden />
      <LinearGradient
        // Background linear gradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.background}>
        <Text style={styles.greetingText}>Welcome to</Text>
        <Text style={styles.logoName}>Eveno!👋</Text>
        <Text style={styles.subtitle}>The best event booking and online ticketing application in the century!</Text>
      </LinearGradient>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1
  },
  background: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 270,
    paddingHorizontal: 16
  },
  greetingText: {
    fontSize: 40,
    color: COLORS.white,
    fontFamily: 'bold',
    marginVertical: 12
  },
  logoName: {
    fontSize: 76,
    color: COLORS.white,
    fontFamily: 'extraBold',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    marginVertical: 12,
    fontFamily: "semiBold",
  }
})

export default Onboarding1;
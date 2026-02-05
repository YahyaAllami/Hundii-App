import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const dogImage = require('@/assets/images/dog_first_onborading.png');

const colors = {
  primary: '#4C9F18',     // Grün
  secondary: '#D2FF7E',   // Limette
  background: '#FFFAE8',  // Warm Cream
  accent: '#70D2FF',      // Himmelblau
  highlight: '#9D5D21',   // Braun
  text: '#3C3C3C',
  textSecondary: '#7A7A7A',
  white: '#FFFFFF',
};

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/(onboarding)/dog-name');
  };

  const handleLogin = () => {
    // TODO: Navigate to login
    // router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Decoration - Bones */}
      <View style={styles.decorations}>
        <Text style={[styles.bone, styles.boneTopLeft]}>🦴</Text>
        <Text style={[styles.bone, styles.boneTopRight]}>🦴</Text>
        <Text style={[styles.bone, styles.boneMidLeft]}>🦴</Text>
        <Text style={[styles.bone, styles.boneMidRight]}>🦴</Text>
        <Text style={[styles.bone, styles.boneBottomLeft]}>🦴</Text>
        <Text style={[styles.bone, styles.boneBottomRight]}>🦴</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Header Text */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.header}
        >
          <Text style={styles.title}>Personalisiere dein{'\n'}Hundii Erlebnis</Text>
          <Text style={styles.subtitle}>
            Beantworte ein paar Fragen, um die App{'\n'}für dich und deinen Hund anzupassen
          </Text>
        </Animated.View>

        {/* Dog Illustration */}
        <Animated.View
          entering={FadeIn.delay(400).duration(800)}
          style={styles.illustrationContainer}
        >
          <Image
            source={dogImage}
            style={styles.dogImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* Buttons */}
      <Animated.View
        entering={FadeInDown.delay(600).duration(600)}
        style={styles.buttonContainer}
      >
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>LOS GEHT'S</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>ANMELDEN</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  decorations: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  bone: {
    position: 'absolute',
    fontSize: 24,
    opacity: 0.15,
  },
  boneTopLeft: {
    top: 60,
    left: 30,
    transform: [{ rotate: '-30deg' }],
  },
  boneTopRight: {
    top: 40,
    right: 40,
    transform: [{ rotate: '45deg' }],
  },
  boneMidLeft: {
    top: '35%',
    left: 15,
    transform: [{ rotate: '15deg' }],
  },
  boneMidRight: {
    top: '30%',
    right: 25,
    transform: [{ rotate: '-20deg' }],
  },
  boneBottomLeft: {
    bottom: '25%',
    left: 40,
    transform: [{ rotate: '60deg' }],
  },
  boneBottomRight: {
    bottom: '30%',
    right: 35,
    transform: [{ rotate: '-45deg' }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogImage: {
    width: 450,
    height: 450,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

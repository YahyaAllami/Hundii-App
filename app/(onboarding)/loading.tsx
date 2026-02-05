import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const colors = {
  primary: '#4C9F18',
  secondary: '#D2FF7E',
  background: '#FFFAE8',
  accent: '#70D2FF',
  highlight: '#9D5D21',
  text: '#3C3C3C',
  textSecondary: '#7A7A7A',
  white: '#FFFFFF',
  border: '#E5E5E5',
};

const loadingSteps = [
  { text: 'Daten werden analysiert...', emoji: '📊' },
  { text: 'Rasse-Eigenschaften werden berücksichtigt...', emoji: '🐕' },
  { text: 'Trainingsplan wird erstellt...', emoji: '📋' },
  { text: 'Fast fertig...', emoji: '✨' },
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = useSharedValue(0);
  const pawScale = useSharedValue(1);

  useEffect(() => {
    progress.value = withSequence(
      // Schneller Start
      withTiming(0.22, { duration: 500, easing: Easing.out(Easing.quad) }),
      // Lange Pause - "analysiert"
      withTiming(0.25, { duration: 1800, easing: Easing.linear }),
      // Kleiner Sprung
      withTiming(0.33, { duration: 300, easing: Easing.out(Easing.quad) }),
      // Kurze Pause
      withTiming(0.34, { duration: 500, easing: Easing.linear }),
      // Großer Sprung
      withTiming(0.58, { duration: 700, easing: Easing.out(Easing.quad) }),
      // Sehr lange Pause - "erstellt Plan"
      withTiming(0.60, { duration: 2200, easing: Easing.linear }),
      // Schnell weiter
      withTiming(0.74, { duration: 400, easing: Easing.out(Easing.quad) }),
      // Mini Pause
      withTiming(0.75, { duration: 300, easing: Easing.linear }),
      // Noch ein Sprung
      withTiming(0.88, { duration: 600, easing: Easing.out(Easing.quad) }),
      // Letzte Pause
      withTiming(0.90, { duration: 1400, easing: Easing.linear }),
      // Schnelles Finish
      withTiming(1, { duration: 300, easing: Easing.out(Easing.quad) })
    );

    pawScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1
    );

    const stepTimings = [0, 2800, 5600, 8300];
    const timers = stepTimings.map((delay, index) =>
      setTimeout(() => setCurrentStep(index), delay)
    );

    const timeout = setTimeout(() => {
      router.replace('/(tabs)');
    }, 10000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(timeout);
    };
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const pawStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pawScale.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Paw Animation */}
        <Animated.View
          entering={FadeIn.delay(200).duration(600)}
          style={styles.iconContainer}
        >
          <Animated.Text style={[styles.pawEmoji, pawStyle]}>🐾</Animated.Text>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)}>
          <Text style={styles.title}>
            Wir erstellen den perfekten{'\n'}
            <Text style={styles.titleHighlight}>Trainingsplan</Text> für{'\n'}
            deinen Hund
          </Text>
        </Animated.View>

        {/* Progress Bar */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.progressContainer}
        >
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, progressStyle]} />
          </View>
        </Animated.View>

        {/* Loading Steps */}
        <View style={styles.stepsContainer}>
          {loadingSteps.map((step, index) => (
            <Animated.View
              key={step.text}
              entering={FadeIn.delay(800 + index * 1500).duration(400)}
            >
              <View
                style={[
                  styles.step,
                  index === currentStep && styles.stepActive,
                  index < currentStep && styles.stepDone,
                ]}
              >
                <Text style={styles.stepEmoji}>
                  {index < currentStep ? '✅' : step.emoji}
                </Text>
                <Text
                  style={[
                    styles.stepText,
                    index === currentStep && styles.stepTextActive,
                    index < currentStep && styles.stepTextDone,
                  ]}
                >
                  {step.text}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  pawEmoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 40,
  },
  titleHighlight: {
    color: colors.primary,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 40,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  stepsContainer: {
    width: '100%',
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    opacity: 0.4,
  },
  stepActive: {
    opacity: 1,
  },
  stepDone: {
    opacity: 0.6,
  },
  stepEmoji: {
    fontSize: 20,
  },
  stepText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  stepTextActive: {
    color: colors.text,
    fontWeight: '600',
  },
  stepTextDone: {
    color: colors.textSecondary,
  },
});

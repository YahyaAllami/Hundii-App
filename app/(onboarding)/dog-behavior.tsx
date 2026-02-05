import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
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

const behaviorProblems = [
  { id: 'leash', label: 'An der Leine ziehen', emoji: '🦮' },
  { id: 'jumping', label: 'Anspringen', emoji: '🐕' },
  { id: 'recall', label: 'Kommt nicht wenn gerufen', emoji: '📢' },
  { id: 'barking', label: 'Übermäßiges Bellen', emoji: '🗣️' },
  { id: 'chewing', label: 'Zerstören / Kauen', emoji: '🦴' },
  { id: 'housetraining', label: 'Stubenreinheit', emoji: '🏠' },
  { id: 'begging', label: 'Betteln', emoji: '🍖' },
  { id: 'stealing', label: 'Vom Tisch stehlen', emoji: '🍕' },
  { id: 'notlistening', label: 'Hört nicht zu', emoji: '🙉' },
];

export default function DogBehaviorScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    router.push('/(onboarding)/dog-emotions');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <Animated.View
        entering={FadeIn.delay(100).duration(400)}
        style={styles.progressContainer}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '80%' }]} />
        </View>
        <Text style={styles.progressText}>Schritt 4 von 5</Text>
      </Animated.View>

      {/* Header */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(600)}
        style={styles.header}
      >
        <Text style={styles.title}>Welches <Text style={styles.titleHighlight}>Verhalten</Text> möchtest{'\n'}du verbessern?</Text>
        <Text style={styles.subtitle}>Wähle alle aus, die zutreffen</Text>
      </Animated.View>

      {/* Options */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chipsContainer}>
          {behaviorProblems.map((problem, index) => {
            const isSelected = selected.includes(problem.id);
            return (
              <Animated.View
                key={problem.id}
                entering={FadeInDown.delay(300 + index * 60).duration(400)}
              >
                <TouchableOpacity
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => toggle(problem.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.chipEmoji}>{problem.emoji}</Text>
                  <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>
                    {problem.label}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <Animated.View
        entering={FadeInDown.delay(800).duration(600)}
        style={styles.bottomContainer}
      >
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>
            Weiter{selected.length > 0 ? ` (${selected.length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleContinue}
        >
          <Text style={styles.skipButtonText}>Überspringen</Text>
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
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 34,
  },
  titleHighlight: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F5FFED',
  },
  chipEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  chipLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  chipLabelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  continueButton: {
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
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  skipButtonText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
});

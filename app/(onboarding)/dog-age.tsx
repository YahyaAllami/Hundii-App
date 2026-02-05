import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const ageGroups = [
  { id: 'puppy', label: 'Welpe', range: '0–6 Monate', emoji: '🐶' },
  { id: 'young', label: 'Junghund', range: '6–18 Monate', emoji: '🐕' },
  { id: 'adult', label: 'Erwachsen', range: '1,5–7 Jahre', emoji: '🦮' },
  { id: 'senior', label: 'Senior', range: '7+ Jahre', emoji: '🐾' },
];

export default function DogAgeScreen() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleContinue = () => {
    router.push('/(onboarding)/dog-behavior');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <Animated.View
        entering={FadeIn.delay(100).duration(400)}
        style={styles.progressContainer}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
        <Text style={styles.progressText}>Schritt 3 von 5</Text>
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text style={styles.title}>Wie alt ist dein Hund?</Text>
        </Animated.View>

        <View style={styles.optionsContainer}>
          {ageGroups.map((age, index) => {
            const isSelected = selectedAge === age.id;
            return (
              <Animated.View
                key={age.id}
                entering={FadeInDown.delay(300 + index * 100).duration(500)}
              >
                <TouchableOpacity
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => setSelectedAge(age.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionEmoji}>{age.emoji}</Text>
                  <View style={styles.optionTextContainer}>
                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      {age.label}
                    </Text>
                    <Text style={styles.optionRange}>{age.range}</Text>
                  </View>
                  <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>

      {/* Bottom CTA */}
      <Animated.View
        entering={FadeInDown.delay(700).duration(600)}
        style={styles.bottomContainer}
      >
        <TouchableOpacity
          style={[styles.continueButton, !selectedAge && styles.continueButtonDisabled]}
          disabled={!selectedAge}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Weiter</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F5FFED',
  },
  optionEmoji: {
    fontSize: 28,
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  optionLabelSelected: {
    color: colors.primary,
  },
  optionRange: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
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
  continueButtonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

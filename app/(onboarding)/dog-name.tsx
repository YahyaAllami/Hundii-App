import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export default function DogNameScreen() {
  const [dogName, setDogName] = useState('');
  const [dogImage, setDogImage] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const canContinue = dogName.trim().length > 0;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setDogImage(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    router.push('/(onboarding)/dog-breed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Progress Bar */}
        <Animated.View
          entering={FadeIn.delay(100).duration(400)}
          style={styles.progressContainer}
        >
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '20%' }]} />
          </View>
          <Text style={styles.progressText}>Schritt 1 von 5</Text>
        </Animated.View>

        {/* Content */}
        <View style={styles.content}>
          {/* Dog Photo */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.photoSection}
          >
            <TouchableOpacity
              style={[styles.photoCircle, dogImage && styles.photoCircleWithImage]}
              onPress={pickImage}
              activeOpacity={0.8}
            >
              {dogImage ? (
                <Image source={{ uri: dogImage }} style={styles.photoImage} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.cameraIcon}>📷</Text>
                  <Text style={styles.photoText}>Foto hinzufügen</Text>
                </View>
              )}
            </TouchableOpacity>
            {dogImage && (
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.changePhotoText}>Foto ändern</Text>
              </TouchableOpacity>
            )}
          </Animated.View>

          {/* Name Input */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.inputSection}
          >
            <Text style={styles.title}>Wie heißt dein Hund?</Text>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Name eingeben"
              placeholderTextColor={colors.textSecondary}
              value={dogName}
              onChangeText={setDogName}
              returnKeyType="done"
              maxLength={30}
            />
          </Animated.View>
        </View>

        {/* Bottom CTA */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.bottomContainer}
        >
          <TouchableOpacity
            style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
            disabled={!canContinue}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Weiter</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
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
    justifyContent: 'center',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  photoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoCircleWithImage: {
    borderWidth: 0,
  },
  photoImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  photoPlaceholder: {
    alignItems: 'center',
    gap: 8,
  },
  cameraIcon: {
    fontSize: 32,
  },
  photoText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  changePhotoText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 12,
  },
  inputSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
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

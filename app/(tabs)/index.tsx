import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

const colors = {
  primary: '#4C9F18',
  background: '#FFFAE8',
  text: '#3C3C3C',
  textSecondary: '#7A7A7A',
  white: '#FFFFFF',
  border: '#E5E5E5',
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        entering={FadeInDown.delay(200).duration(600)}
        style={styles.content}
      >
        <Text style={styles.greeting}>Willkommen bei Hundii 🐾</Text>
        <Text style={styles.subtitle}>
          Dein persönlicher Trainingsplan wird bald hier erscheinen
        </Text>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderEmoji}>🏗️</Text>
          <Text style={styles.placeholderTitle}>Kommt bald</Text>
          <Text style={styles.placeholderText}>
            Trainingspläne, Fortschritt und mehr
          </Text>
        </View>
      </Animated.View>
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
    paddingTop: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 8,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: 32,
    marginBottom: 32,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  placeholderText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

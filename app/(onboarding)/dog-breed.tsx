import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
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

const breeds = [
  'Labrador Retriever',
  'Deutscher Schäferhund',
  'Golden Retriever',
  'Französische Bulldogge',
  'Dackel',
  'Chihuahua',
  'Rottweiler',
  'Australian Shepherd',
  'Beagle',
  'Pudel',
  'Border Collie',
  'Boxer',
  'Dobermann',
  'Shih Tzu',
  'Cavalier King Charles Spaniel',
  'Malteser',
  'Havaneser',
  'Yorkshire Terrier',
  'Bernhardiner',
  'Berner Sennenhund',
  'Jack Russell Terrier',
  'Siberian Husky',
  'Cocker Spaniel',
  'Zwergspitz / Pomeranian',
  'Dalmatiner',
  'Rhodesian Ridgeback',
  'Weimaraner',
  'Magyar Vizsla',
  'Akita Inu',
  'Shiba Inu',
  'Mops',
  'Englische Bulldogge',
  'Whippet',
  'Greyhound',
  'Deutsche Dogge',
  'Irischer Wolfshund',
  'Neufundländer',
  'Collie',
  'Shetland Sheepdog',
  'Belgischer Schäferhund (Malinois)',
  'Miniature Schnauzer',
  'Riesenschnauzer',
  'Staffordshire Bullterrier',
  'American Staffordshire Terrier',
  'Samojede',
  'Eurasier',
  'Leonberger',
  'Flat Coated Retriever',
  'Airedale Terrier',
  'West Highland White Terrier',
  'Mischling',
  'Weiß ich nicht',
];

export default function DogBreedScreen() {
  const [search, setSearch] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    router.push('/(onboarding)/dog-age');
  };

  const renderBreedItem = ({ item }: { item: string }) => {
    const isSelected = selectedBreed === item;
    return (
      <TouchableOpacity
        style={[styles.breedItem, isSelected && styles.breedItemSelected]}
        onPress={() => setSelectedBreed(item)}
        activeOpacity={0.7}
      >
        <Text style={[styles.breedText, isSelected && styles.breedTextSelected]}>
          {item}
        </Text>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <Animated.View
        entering={FadeIn.delay(100).duration(400)}
        style={styles.progressContainer}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '40%' }]} />
        </View>
        <Text style={styles.progressText}>Schritt 2 von 5</Text>
      </Animated.View>

      {/* Header */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(600)}
        style={styles.header}
      >
        <Text style={styles.title}>Welche Rasse ist{'\n'}dein Hund?</Text>
        <Text style={styles.subtitle}>
          Jede Rasse lernt anders – so können wir das Training optimal anpassen
        </Text>
      </Animated.View>

      {/* Search Input */}
      <Animated.View
        entering={FadeInDown.delay(300).duration(600)}
        style={styles.searchContainer}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Rasse suchen..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Breed List */}
      <FlatList
        data={filteredBreeds}
        keyExtractor={(item) => item}
        renderItem={renderBreedItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.emptyText}>Keine Rasse gefunden</Text>
        }
      />

      {/* Bottom CTA */}
      <Animated.View
        entering={FadeInDown.delay(400).duration(600)}
        style={styles.bottomContainer}
      >
        <TouchableOpacity
          style={[styles.continueButton, !selectedBreed && styles.continueButtonDisabled]}
          disabled={!selectedBreed}
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
  header: {
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    paddingTop: 6,
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },
  clearIcon: {
    fontSize: 16,
    color: colors.textSecondary,
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  breedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  breedItemSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F5FFED',
  },
  breedText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  breedTextSelected: {
    fontWeight: '600',
    color: colors.primary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 40,
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

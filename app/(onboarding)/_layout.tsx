import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFAE8' },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="dog-name" />
      <Stack.Screen name="dog-breed" />
      <Stack.Screen name="dog-age" />
      <Stack.Screen name="dog-behavior" />
      <Stack.Screen name="dog-emotions" />
      <Stack.Screen name="loading" options={{ gestureEnabled: false }} />
    </Stack>
  );
}

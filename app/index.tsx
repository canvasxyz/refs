import { HomeScreen } from '@/features/home/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Refs',
          headerShown: false,
        }}
      />
      <HomeScreen />
    </>
  )
}

import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { s, c } from '@/features/style'
import { XStack } from '@/ui'
import { Image } from 'expo-image'
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export const SearchRef = () => {
  const [textState, setTextState] = useState('')
  const y = useSharedValue(0)
  const scaleY = useSharedValue(1)

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: y.get() }],
  }))
  const height = useAnimatedStyle(() => ({
    transform: [{ scaleY: scaleY.get() }],
  }))

  return (
    <>
      <View
        style={[
          {
            paddingHorizontal: s.$2,
            width: '100%',
          },
        ]}
      >
        <Animated.View
          style={[
            {
              // paddingHorizontal: s.$2,
              width: '100%',
              height: 50,
              backgroundColor: c.black,
              position: 'absolute',
              zIndex: 0,
              left: s.$2,
              top: 0,
              borderRadius: s.$3,
              transformOrigin: 'bottom',
            },
            height,
          ]}
        />
        <TouchableWithoutFeedback
          onPressIn={() => {
            y.set(withSpring(6))
            scaleY.set(withSpring(0.8))
          }}
          onPressOut={() => {
            y.set(withSpring(0))
            scaleY.set(withSpring(1))
          }}
        >
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                backgroundColor: c.surface,
                padding: s.$05,
                borderColor: c.black,
                borderWidth: 2,
                borderRadius: s.$3,
                gap: s.$08,
              },
              translateY,
            ]}
          >
            <Image
              style={{ width: s.$2, height: s.$2, margin: s.$025 }}
              source={require('@/assets/icons/Logo.png')}
            ></Image>

            <TextInput
              style={{ flex: 1 }}
              onFocus={() => {
                y.set(withSpring(6))
                scaleY.set(withSpring(0.8))
              }}
              onBlur={() => {
                y.set(withSpring(0))
                scaleY.set(withSpring(1))
              }}
              autoFocus={false}
              placeholder="Search anything"
              onChangeText={setTextState}
              placeholderTextColor={c.black}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}

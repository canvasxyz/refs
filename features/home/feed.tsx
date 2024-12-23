import { useState, useEffect } from 'react'
import { XStack, YStack } from '@/ui/core/Stacks'
import { Heading } from '@/ui/typo/Heading'
import { Button } from '@/ui/buttons/Button'
import { pocketbase } from '@/features/pocketbase'
import type { Item } from '@/features/pocketbase/stores/types'
import { Link, router } from 'expo-router'
import { FlatList } from 'react-native-gesture-handler'
import { ScrollView, View, Dimensions } from 'react-native'
import { s, c } from '@/features/style'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SimplePinataImage } from '@/ui/images/SimplePinataImage'

const win = Dimensions.get('window')

// const renderItem = ({ item }) => (
//   <XStack style={{ paddingHorizontal: s.$1half, paddingVertical: s.$025 }}>
//     <Heading tag="p">
//       <Heading tag="strong">{item.expand?.creator?.userName || 'Anonymous'}</Heading> added{' '}
//       <Heading tag="strong">{item.expand?.ref?.title}</Heading>
//     </Heading>
//   </XStack>
// )

export const Feed = () => {
  const [items, setItems] = useState<Item[]>([])
  const insets = useSafeAreaInsets()

  useEffect(() => {
    // The initial data we are looking for is
    // (for now) LOOSELY based off of the user's interests.
    //
    // The subscription at the moment is VERY LOOSE
    // We just serve all new item creations.
    const getInitialData = async () => {
      try {
        const records = await pocketbase
          .collection('items')
          .getList(1, 30, { filter: ``, sort: '-created', expand: 'ref,creator' })
        console.log(records.items)
        setItems(records.items)
        console.log('done')
      } catch (error) {
        console.error(error)
      }
    }

    getInitialData()

    pocketbase.collection('items').subscribe('*', (e) => {
      console.log(e.action)
      console.log(e.record)
    })
    return () => pocketbase.collection('items').unsubscribe('*')
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: 'flex-end' }}
      style={{
        paddingTop: Math.max(insets.top, 16),
        width: win.width,
        height: win.height,
        flex: 1,
      }}
    >
      <Button
        variant="basic"
        title="Profile"
        onPress={() => router.push(`/user/${pocketbase.authStore?.record?.userName}`)}
      />

      <YStack
        style={{
          gap: s.$025,
          paddingTop: win.height * 0.666,
          paddingBottom: s.$12,
        }}
      >
        {items.map((item) => (
          <XStack gap={s.$1} style={{ paddingHorizontal: s.$1half, paddingVertical: s.$05 }}>
            {item?.image ? (
              <SimplePinataImage
                originalSource={item.image}
                imageOptions={{ width: s.$3, height: s.$3 }}
                style={{
                  width: s.$3,
                  height: s.$3,
                  backgroundColor: c.accent,
                  borderRadius: s.$075,
                }}
              />
            ) : (
              <View
                style={{
                  width: s.$3,
                  height: s.$3,
                  backgroundColor: c.accent,
                  borderRadius: s.$075,
                }}
              />
            )}

            <Link href={item.expand?.creator ? `/user/${item.expand.creator?.userName}` : '/'}>
              <Heading tag="p">
                <Heading tag="strong">{item.expand?.creator?.userName || 'Anonymous'}</Heading>{' '}
                added <Heading tag="strong">{item.expand?.ref?.title}</Heading>
              </Heading>
            </Link>
          </XStack>
        ))}
      </YStack>
    </ScrollView>
  )
}

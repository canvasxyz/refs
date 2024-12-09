import { View, Text, YStack } from 'tamagui'
import { useLiveQuery } from '@canvas-js/hooks'
import { useEffect } from 'react'
import { useCanvasContext } from 'app/features/canvas/contract'

export const Profile = ({ userName }) => {
  const app = useCanvasContext()

  const profile = useLiveQuery(app, 'profiles', { where: { userName: userName } })
  const profiles = useLiveQuery(app, 'profiles')

  useEffect(() => console.log(profile), [profile])

  return (
    <YStack flex={1} jc="center" ai="center">
      <Text>{userName}</Text>
      {profile?.avatar && <Text>a{profile.avatar}</Text>}
      {profiles && <Text>{profiles.length}</Text>}
    </YStack>
  )
}

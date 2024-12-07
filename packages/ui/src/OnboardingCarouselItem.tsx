import { Button, YStack, H2, styled, View, Text } from 'tamagui'
import { ExampleGrid } from './grid/ExampleGrid'
import { UseCaseDemo } from './display/UseCaseDemo'
import { MainButton } from './buttons/Button'
import { ExampleButtonList } from './atoms/ExpandButtonList'
import { Grid } from './grid/Grid'

export const OnboardingCarouselItem = styled(
  ({
    index,
    next,
    onAddItem,
    done,
  }: {
    index: number
    next: () => void
    onAddItem: () => void
    done: () => void
  }) => {
    if (index === 0)
      return (
        <View style={{ flex: 1 }} mx="$6" my="$4">
          <YStack gap="$4" pt="$12" pb="$8">
            <H2 ta="center" col="$color12">
              This is your grid. A mural that makes you, you
            </H2>
          </YStack>

          <ExampleGrid />

          <MainButton onPress={next}>Next</MainButton>
        </View>
      )

    if (index === 1)
      return (
        <View style={{ flex: 1 }} mx="$6" my="$4">
          <YStack gap="$4" pt="$12" pb="$8">
            <H2 ta="center" col="$color12">
              Fill your grid with links, photos, hobbies, places
            </H2>
          </YStack>

          <Grid onAddItem={onAddItem} />

          <MainButton onPress={next}>Next</MainButton>
        </View>
      )

    if (index === 2)
      return (
        <View style={{ flex: 1 }} mx="$6" my="$4">
          <YStack gap="$4" pt="$12" pb="$8">
            <H2 ta="center" col="$color12">
              ...then find people based on the refs they add
            </H2>
          </YStack>

          <UseCaseDemo />

          <MainButton onPress={next}>Next</MainButton>
        </View>
      )

    if (index === 3)
      return (
        <View style={{ flex: 1 }} mx="$6" my="$4">
          <YStack gap="$4" pt="$12" pb="$8">
            <H2 ta="center" col="$color12">
              ...and get connected by messaging them, starting a group chat, or saving them to a
              folder.
            </H2>
          </YStack>

          <ExampleButtonList />

          <MainButton onPress={done}>I'm ready</MainButton>
        </View>
      )
  }
)

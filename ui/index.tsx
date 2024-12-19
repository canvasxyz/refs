import { View as NativeView, Text } from 'react-native'

export * from './core/Stacks'
export * from './typo/DeferredFonts'
export * from './typo/SizableText'
export * from './typo/Heading'
export * from './OnboardingCarouselItem'
export * from './grid/ExampleGrid'
export * from './grid/Grid'
export * from './grid/GridTile'
export * from './grid/GridTileActionAdd'
export * from './grid/GridTileImage'
export * from './grid/GridTileList'
export * from './buttons/Button'
export * from './drawers/Drawer'
export * from './actions/AddRef'
export * from './inputs/Camera'
export * from './inputs/Picker'
export * from './profiles/NewProfile'
export * from './profiles/NewUserProfile'
export * from './profiles/Profile'

export const Spinner = () => <Text>Loading</Text>
export const SizableText = ({ children }) => <Text>{children}</Text>
export const Paragraph = ({ children }) => <Text>{children}</Text>

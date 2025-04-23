import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '~/types/navigation'
import { UserDetailsScreen } from '~/screens/UserDetails'
import { HomeScreen } from '~/screens/Home'
import { ThemeProvider } from '~/context/ThemeContext'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStack = () => {
  return (
    <ThemeProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
      </Stack.Navigator>
    </ThemeProvider>
  )
}

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}

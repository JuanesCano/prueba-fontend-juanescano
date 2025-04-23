import { StatusBar } from 'expo-status-bar'
import { RootNavigation } from './src/navigation/RootNavigation'
import { Provider } from 'react-redux'
import { store } from './src/store'

import './global.css'

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
      <StatusBar style="auto" />
    </Provider>
  )
}

export default App

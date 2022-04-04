import { StyleSheet } from 'react-native'
import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import { Store, Persistor } from './Store/configureStore'
import { PersistGate } from 'redux-persist/lib/integration/react'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <PersistGate persistor={Persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

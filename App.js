import { StyleSheet } from 'react-native'
import React from 'react'
import Navigation from './Navigation/Navigation'

export default class App extends React.Component {
  render() {
    return (
        <Navigation />
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

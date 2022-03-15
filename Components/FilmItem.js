import React from 'react'
import {View, Text} from 'react-native'

class FilmItem extends React.Component {
  render() {
    const film = this.props.film
    console.log(this.props.film.title)
    return (
      <View>
        <Text>{film.title}</Text>
      </View>
    )
  }
}

export default FilmItem

import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import 'react-json-pretty/themes/adventure_time.css'
import JSONPretty from 'react-json-pretty'

class FilmItem extends React.Component {
  render() {
    const film = this.props.film
    console.log(this.props.film.title)
    return (
      <View>
        <View>
          <JSONPretty data={film}></JSONPretty>
        </View>
        <View style={styles.film_main_container}>
          <Image
            style={styles.image}
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          />
          <Text>{film.title}</Text>
          <Text>{film.vote_average}</Text>
          <Text>{film.poster_path}</Text>
          <Text>{film.overview}</Text>
          <Text>{film.release_date}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  film_main_container: {
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 180,
  },

})

export default FilmItem

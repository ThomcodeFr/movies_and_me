import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
/* import 'react-json-pretty/themes/adventure_time.css'
import JSONPretty from 'react-json-pretty' */
import dayjs from 'dayjs'

class FilmItem extends React.Component {
  render() {
    const film = this.props.film
    console.log(this.props.film.title)
    return (
      <View>
{/*         <View>
          <JSONPretty data={film}></JSONPretty>
        </View> */}
        <View style={styles.film_main_container}>
          <Image
            style={styles.image}
            source={film.poster_path}
          />
          <View style={styles.film_description}>
            <View style={styles.titreVote}>
              <Text style={styles.titreFilm}>{film.title}</Text>
              <Text>{film.vote_average}</Text>
            </View>
            <Text style={styles.OverviewFilm}>{film.overview}</Text>
            <Text
              style={styles.release_date_text}>
              {dayjs(film.release_date).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  film_main_container: {
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 15,
    marginBottom: 30,
  },

  film_description: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  vote_average: {
    fontWeight: 'bold',
    fontSize: 80,
  },
  titreFilm: {
    fontWeight: 'bold',
    marginRight: 50,
    fontSize: 20,
    minWidth: 300,
  },
  OverviewFilm: {
    color: 'grey',
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 350,
    minHeight: 100,
  },
  Release_date_film: {
    fontSize: 16,

  },
  image: {
    width: 120,
    height: 180,
    flexDirection: 'column',
  },
})

export default FilmItem

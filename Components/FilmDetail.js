import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
// import JSONPretty from 'react-json-pretty'
import dayjs from 'dayjs'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Pressable } from 'react-native'

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  }
}

const styles = StyleSheet.create({
  favorite: {
    alignItems: 'center',
  },

  main_container: {
    flex: 1,
  },

  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
})

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
      isLoading: true, // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
  }

  componentDidMount() {
    console.log('Component FilmDetail monté')
    getFilmDetailFromApi(this.props.navigation.getParam('idFilm')).then(
      (data) => {
        this.setState({
          film: data,
          isLoading: false,
        })
      }
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Component FilmDetail componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('Component FilmDetail componentWillUnmount')
    console.log('componentDidUpdate : ')
    console.log(this.props.favoritesFilm)
  }

  _toggleFavorite() {
    // Action Redux
    const action = { type: 'TOGGLE_FAVORITE', value: this.state.film }
    // Envoi de l'action au Store Redux
    this.props.dispatch(action)
  }

  _displayFilm() {
    const { film } = this.state
    if (film != undefined) {
      console.log(JSON.stringify(film, undefined, true))
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={getImageFromApi(film.backdrop_path ?? film.poster_path)}
          />
          <Text style={ styles.title_text }>{ film.title }</Text>
          <Pressable
            style={styles.favorite}
            onPress={() => this._toggleFavorite()}
          >
            <Text>{'Favoris'}</Text>
            <Text>
              {this.props.favoritesFilm.findIndex(
                (item) => item.id === this.state.film.id
              ) !== -1
                ? '♥'
                : '♡'}
            </Text>
          </Pressable>

          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>
            Sorti le {dayjs(new Date(film.release_date)).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.default_text}>
            Note : {film.vote_average} / 10
          </Text>
          <Text style={styles.default_text}>
            Nombre de votes : {film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(film.budget).format('0,0[.]00 $')}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) :{' '}
            {film.genres
              .map(function (genre) {
                return genre.name
              })
              .join(' / ')}
          </Text>
          <Text style={styles.default_text}>
            Companie(s) :{' '}
            {film.production_companies
              .map(function (company) {
                return company.name
              })
              .join(' / ')}
          </Text>
        </ScrollView>
      )
    }
  }
  render() {
    console.log(this.props) /* "favoritesFilm": Array [] */
    const { idFilm } = this.props.navigation.state.params
    //console.log(this.props.navigation)
    console.log('Component FilmDetail rendu idFilm = ' + idFilm)
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        <Text>Détail du film id {idFilm}</Text>
      </View>
    )
  }
}

export default connect(mapStateToProps)(FilmDetail)

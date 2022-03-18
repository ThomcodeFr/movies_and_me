// Components/Search.js
import React from 'react'
import {
  FlatList,
  View,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
// import films from '../Helpers/filmsData'
import FilmItem from '../Components/FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { ActivityIndicator } from 'react-native'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ''
    this.state = {
      films: [],
      height: 0,
      isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
    this.page = 0
    this.totalPages = 0
  }
  render() {
    console.log('RENDER')
    return (
      <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
        <View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <TextInput
            style={styles.textinput}
            placeholder="Titre du film"
            onChangeText={(text) => this._searchTextInputChanged(text)}
            onSubmitEditing={() => this._searchFilms()}
          />
          <Button title="Rechercher" onPress={() => this._searchFilms()} />
          <FlatList
            onLayout={(e) => {
              this.setState({ height: e.nativeEvent.layout.height })
              console.log(e.nativeEvent.layout.height)
            }}
            style={{
              flexGrow: 1,
              height: this.state.height,
            }}
            data={this.state.films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <FilmItem
                film={item}
                displayDetailForFilm={this.displayDetailForFilm}
              />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (this.page < this.totalPages) {
                this._loadFilms()
              }
            }}
          />
          {this._displayLoading()}
        </View>
      </SafeAreaView>
    )
  }

  displayDetailForFilm = (idFilm) => {
    //this.displayDetailForFilm
    console.log('film.id=' + idFilm)
    this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState(
      {
        films: [],
      },
      () => {
        console.log(
          'Page : ' +
            this.page +
            ' / TotalPages : ' +
            this.totalPages +
            ' / Nombre de films : ' +
            this.state.films.length
        )
        this._loadFilms()
      }
    )
  }

  _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par setState
  }

  _loadFilms() {
    if (this.searchedText.length == 0 || this.state.isLoading) return
    this.setState({ isLoading: true })
    getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
      (data) => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films: [...this.state.films, ...data.results],
          isLoading: false,
        })
      }
    )
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
    flex: 1,
  },

  button: {
    marginLeft: 5,
    marginRight: 5,
  },

  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Search

// Components/Search.js
import React from 'react'
import { FlatList, View, TextInput, Button, StyleSheet } from 'react-native'
// import films from '../Helpers/filmsData'
import FilmItem from '../Components/FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { ActivityIndicator } from 'react-native'

class Search extends React.Component {
  render() {
    console.log('RENDER')
    return (
      <View style={styles.main_container}>
        <TextInput
          placeholder="Titre du film"
          style={{ styles }}
          onChangeText={(text) => this._searchTextInputChanged(text)}
        />{' '}
        <Button title="Rechercher" onPress={() => this._loadFilms()} />
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadFilms()
            }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
  constructor(props) {
    super(props)
    this.searchedText = ''
    this.state = {
      films: [],
      isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
    this.page = 0
    this.totalPages = 0
  }

  _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par setState
  }

  _loadFilms() {
    if (this.searchedText.length == 0 || this.state.isLoading) return
    this.setState({ isLoading: true })
    getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then((data) => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            // ... syntaxe Javascript ES6 qui permet de recopier
            // et de fusionner les deux tableaux
            // ⟺ films: this.state.films.concat(data.results)
            films: [...this.state.films, ...data.results],
            isLoading: false
        })
      },
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
  textinput: {
    marginLeft: 5,
    marginRight: 5,
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

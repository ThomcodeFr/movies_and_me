// Components/Search.js
import React from 'react'
import { FlatList, View, TextInput, Button, StyleSheet } from 'react-native'
// import films from '../Helpers/filmsData'
import FilmItem from '../Components/FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

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
        />
      </View>
    )
  }
  constructor(props) {
    super(props)
    this.searchedText = ''
    this.state = { films: [] }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par setState
  }

  _loadFilms() {
    getFilmsFromApiWithSearchedText(this.searchedText).then((data) => {
      this.setState({ films: data.results })
    })
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

// Components/Search.js
import React from 'react'
import { View, TextInput, Button, SafeAreaView, StyleSheet } from 'react-native'
// import films from '../Helpers/filmsData'
// import FilmItem from '../Components/FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import FilmList from '../Components/FilmList'

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

class Search extends React.Component {
  constructor(props) {
    // C'est une méthode d'initialisation d'un objet. Cela défini les valeurs des différentes propriétés d'un objet. C'est à la base de l'objet, sa propriété par défault est la liste des props
    super(props) // super appel le constructeur de react.component
    this.searchedText = ''
    this.state = {
      // state contient la liste des films, si on une class on utilise state, si on en a pas on utilise hook
      films: [], //liste des films vide
      height: 0, // C'est la hauteur de la liste.
      isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
    this.page = 0
    this.totalPages = 0
  }

  _loadFilms = () => {
    if (this.searchedText.length == 0 || this.state.isLoading) return //savoir si on a un critère de recherche, soit y a un critère et il recherche, soit on clique deux fois et il s'arrête
    this.setState({ isLoading: true }) //Permet de mettre à jour l'interface graphique, ça permet d'afficher symbole de rechercher
    getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then( // Appel API
      (data) => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films: [...this.state.films, ...data.results], //on a déjà la liste de film et on la prolonge
          isLoading: false,
        })
      }
    )
  }

  _searchFilms() { // remet la liste à 0 et appel les loadfilms
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

  render() {
    // Défini comment le composant va s'afficher
    console.log('RENDER')
    return (
      // retourne l'affichage
      <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
        {' '}
        {/* Pour les iphones, pour ne pas qu'il affiche en haut, et qu'il couvre la barre de notif */}
        <View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          {' '}
          {/* Sert à styliser */}
          <TextInput
            style={styles.textinput}
            placeholder="Titre du film"
            onChangeText={(text) => this._searchTextInputChanged(text)} //Quand on change le texte, cela envoi la méthode qui mémorise le changement du texte
            onSubmitEditing={() => this._searchFilms()} // searchFilms reintialise la listes des films et appel loadfilm qui va éteindre la liste des films
          />
          <Button title="Rechercher" onPress={() => this._searchFilms(true)} />
          <FilmList
            films={this.state.films}
            loadFilms={() => this._loadFilms()}
            page={this.page}
            totalPages={this.totalPages}
            favoriteList={false}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default Search

import React from 'react'
import FilmItem from './FilmItem'
import { View } from 'react-native'
import { FlatList } from 'react-native'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
//import JSONPretty from 'react-json-pretty'

class FilmList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
  }
  _displayDetailForFilm = (idFilm, listId, isFilmFavorite = false) => {
    this.props.navigation.navigate('FilmDetail', {
      idFilm: idFilm,
      listId: listId,
      isFilmFavorite: isFilmFavorite,
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <JSONPretty
          id="json-pretty"
          data={this.props.favoritesFilm.map(function (r) {
            return r['id'] + '-' + r['listId'] + '-' + r['title']
          })}
        /> */}
        <FlatList
          onLayout={(e) => {
            this.setState({ height: e.nativeEvent.layout.height })
            console.log(e.nativeEvent.layout.height)
          }}
          style={{
            flexGrow: 1,
            height: this.state.height,
          }}
          onEndReachedTeshold={0.5}
          onEndReached={() => {
            if (this.props.favoriteList === true) return
            if (this.props.page < this.props.totalPages) {
              console.log(
                'FilmList onEndReached this.props.page=' +
                  this.props.page +
                  ' this.props.totalPages=' +
                  this.props.totalPages
              )
              this.props.loadFilms()
            }
          }}
          keyExtractor={(item) => item.listId}
          data={this.props.films}
          extraData={this.props.favoritesFilm}
          renderItem={({ item }) => (
            <FilmItem
              film={item}
              displayDetailForFilm={this._displayDetailForFilm}
              isFilmFavorite={
                this.props.favoritesFilm.findIndex(
                  (favori) => item.id === favori.id
                ) !== -1
              }
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
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

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  }
}

export default withNavigation(connect(mapStateToProps)(FilmList))

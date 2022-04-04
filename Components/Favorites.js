import React from 'react'
import { View,  SafeAreaView } from 'react-native'
import FilmList from '../Components/FilmList'
import { connect } from 'react-redux'



const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  }
}

class Favorites extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
        <View style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <FilmList
            films={this.props.favoritesFilm}
            loadFilms={{}}
            page={1}
            totalPages={1}
            favoriteList={true}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default connect(mapStateToProps)(Favorites)

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Favorites from '../Components/Favorites'

// Options pour les onglets, taille, police etc...
const tabBarOptions = {
  activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
  inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
  scrollEnabled: true,
  labelStyle: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '900',
  },
  style: {
    backgroundColor: 'lightgrey',
  },
}

//stackNavigator -> Défini plusieurs écrans les uns sur les autres mais un seul est sur la scène
const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favorites',
    },
  },
  FilmDetail: {
    screen: FilmDetail,
  },
})

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher',
    },
  },
  FilmDetail: {
    screen: FilmDetail,
  },
})

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        title: 'Rechercher',
      },
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarLabel: '♥',
      },
    },
  },
  {
    tabBarOptions: tabBarOptions,
  }
)

export default createAppContainer(MoviesTabNavigator)

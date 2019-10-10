import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

/**
 *structure
  - App
    - AppContainer / createAppContainer
       - AppSwitchNavigator / createSwitchNavigator
           - WelcomeScreen(default screen, if no JWT token detected)
             - Login Button(if login passed, navigate to AppDrawerNavigator)
             - Sign Up Button
           - AppDrawerNavigator / createDrawerNavigator
             - Home - DashboardStackNavigator / createStackNavigator(needed for header and to change the header based on the tab)
                - DashboardTabNavigator / createBottomTabNavigator
                   - Tab 1 - FeedStack
                   - Tab 2 - ProfileStack
                   - Tab 3 - SettingsStack
            - Plans
            - Any files you don't want to be a part of the Tab Navigator can go here.
 */

import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

export default function App() {
  return (
    <AppContainer />
  );
}

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
        <Button
          title="Sign Up"
          onPress={() => alert('button pressed')}
        />
      </View>
    );
  }
}

class Plans extends Component {

  render(){
    return (
      <View style={styles.container}>
        <Text>Plans</Text>
      </View>
    );
  }
}

class DashboardScreen extends Component {

  render(){
    return (
      <View style={styles.container}>
        <Text>Dashboard Screen</Text>
      </View>
    );
  }
}

class Feed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Feed</Text>
        <Button
          title="Go To Detail Screen"
          onPress={() => this.props.navigation.navigate('Detail')}
        />
      </View>
    );
  }
}

class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

const Detail = props => (
  <View style={styles.container}>
    <Text>Detail detail</Text>
  </View>
);



const FeedStack = createStackNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Feed',
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          )
        };
      }
    },
    Detail: {
      screen: Detail
    }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Profile',
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Settings',
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    FeedStack,
    ProfileStack,
    SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  'Home': {
    screen: DashboardStackNavigator
  },
  'Plans': {
    screen: Plans
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBackground: {
    backgroundColor: '#fff'
  }
});

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import TabNavigator from './TabNavigator';
import AddActor from '../screens/AddActor';

const Stack = createStackNavigator();

const Router = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'Enter FilmCollector!'} component={TabNavigator}/>
        <Stack.Screen name={'Add Actor'} component={AddActor}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

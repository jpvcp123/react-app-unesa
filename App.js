import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import register from './src/pages/Register';
import Home from './src/pages/Home';
import Login from './src/pages/Login'
import Page from './src/pages/Page'
import ItemRegister from './src/pages/itemRegister';
const Stack = createStackNavigator()
export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen options={{
        title: 'Cantinho Da Tapioca',
        headerStyle: {
          backgroundColor: '#FFA500',
          height: 90,
          borderBottomStartRadius: 40,
          borderBottomEndRadius: 40,
        },
        headerTintColor: 'transparent',
        headerTransparent: 'true'
      }} component={Home} name='Home'/>
      <Stack.Screen
      name='Register'
      component={register}
      options={{
        title: 'Crie sua Conta!',
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: false,
        headerTintColor: '#F7F4E4',
        headerStyle: {
          backgroundColor: '#FFA500',
        }
      }}
      />
       <Stack.Screen
      name='Login'
      component={Login}
      options={{
        title: 'Entre na sua Conta!',
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: false,
        headerTintColor: '#F7F4E4',
        headerStyle: {
          backgroundColor: '#FFA500',
        }
      }}
      />
       <Stack.Screen
        name='Page'
        component={Page}
        options={{
          headerBackTitle: 'none',
          headerBackTitleVisible: false,
          title: 'Entre na sua Conta!',
          headerTintColor: 'transparent',
          headerTransparent: 'true'
          
        }}
      />
      <Stack.Screen
        name='ItemRegister'
        component={ItemRegister}
        options={{
          headerBackTitle: 'Voltar',
          title: 'Cadraste Seu Item',
          headerTintColor: '#F7F4E4',
          headerStyle: {
            backgroundColor: '#FFA500',
          }
        }}
      />

    </Stack.Navigator>
   </NavigationContainer>
  );
}



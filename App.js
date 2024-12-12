import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useState } from 'react';
import MainNavigator from './navigators/MainNavigator';
import AuthNavigator from './navigators/AuthNavigator';
//import { AuthProvider, AuthContext } from './navigators/AuthContext';
import AuthContext from './navigators/AuthContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <NavigationContainer>
          {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

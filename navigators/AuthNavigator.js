import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from '../pages/RegistrationPage';

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Navigator //SETUP THE LOGIN AND REGISTER DESIGN  
        initialRouteName='Login'
        screenOptions={{ headerShown: false }}
    >
      <Screen name="Login" component={LoginPage} />
      <Screen name="Register" component={RegistrationPage} />
    </Navigator>
  );
}
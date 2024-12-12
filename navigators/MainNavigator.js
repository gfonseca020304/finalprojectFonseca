import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RoomsNavigator from './SecondLevelNavigator/RoomsNavigator';
import ProfilePage from '../pages/ProfilePage';

const { Navigator, Screen} = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Navigator
      screenOptions={{headerShown:false}}
    >
      <Screen name="rooms-options" component={RoomsNavigator} />
      <Screen name="profile-page" component={ProfilePage} />
    </Navigator>
  );
}
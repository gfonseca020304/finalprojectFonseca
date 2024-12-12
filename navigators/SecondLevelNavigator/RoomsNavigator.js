import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useCallback, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Room from "../../components/Room";
import RoomsPage from '../../pages/RoomsPage';

const { Navigator, Screen } = createNativeStackNavigator();

export default function RoomsNavigator() {
  const [newRoomName, setNewRoomName] = useState("")
  const [rooms, setRooms] = useState([])
  const addRoom = useCallback(() => {
    setRooms(prev => [...prev, {
      name: newRoomName
    }])
  }, [])
  return (
    <View>
      <View>
        <TextInput 
          value={newRoomName}
          onChangeText={setNewRoomName}
          style={styles.newRoomInput}
          placeholder="Enter a new room"
          placeholderTextColor="gray"
        />
        <TouchableOpacity
          onPress={addRoom}
          style={styles.addButton}
        >
          <Text>Add</Text>
          {/* IONICON ICON */}
        </TouchableOpacity>
      </View>
      <Navigator 
          initialRouteName='flights-search-form'
          screenOptions={{ headerShown: false }}
      >
        {rooms.map((room, index) => {
          return (
            <Screen name={`room${index}`} component={Roo}/>
          )
        })}
        <Screen name="room" component={Room} />
      </Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  newRoomInput: {

  }
})
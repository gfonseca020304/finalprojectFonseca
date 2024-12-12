import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default function Room({roomName}) {
    return (
        <View>
            <TouchableOpacity
                style
            >
                <Text>{roomName}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

})
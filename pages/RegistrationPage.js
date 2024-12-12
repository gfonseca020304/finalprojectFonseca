import { View, Platform, StyleSheet, KeyboardAvoidingView} from "react-native"
import { useState } from "react";
import RegistrationForm from "../components/RegistrationForm"



export default function RegistrationPage({navigation}) {
    const [imageUri, setImageUri] = useState(null);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <View style={styles.container}>
                <RegistrationForm navigation={navigation} imageUri={imageUri} setImageUri={setImageUri}/>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    }
})
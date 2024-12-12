import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useState, useCallback, useEffect } from "react";
import {useForm, Controller} from "react-hook-form";
import ImagePickerComponent from "./ImagePickerComponent";


export default function RegistrationForm({navigation, imageUri, setImageUri}) {
    const {reset, handleSubmit, control, formState: {errors}, setValue} = useForm({
        mode: "onChange",
        defaultValues: {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            profile_picture: null,
        }
    });
    const saveToDatabase = useCallback((data) => {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO participant (firstName, lastName, email, password, profilePicture) VALUES (?, ?, ?, ?, ?);',
            [data.firstName, data.lastName, data.email, data.password, imageUri],
            (_, result) => {
              console.log('Participant saved:', result);
              Alert.alert("Success", "Account registered successfully!");
              navigation.navigate("Login"); // Navigate to the Login screen
            },
            (_, error) => {
              console.error('Error saving to database:', error)
              Alert.alert("Error", "Failed to register account.")
            }
          );
        });
      }, [imageUri, navigation]);
    const onSuccess = useCallback((data) => {
        if (!imageUri) {
          Alert.alert("Error", "Please select a profile picture.");
          return;
        }
        saveToDatabase(data);
      }, [imageUri, saveToDatabase]);
    const onError = useCallback((error)=> {
        console.log(error)
        alert(error)
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Register here!</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>First name:</Text>
                <Controller
                        name="firstName"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field:{onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.formInput}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="default"
                                keyboardAppearance="dark"
                            />
                        )}
                    />
                    <Text style={styles.formLabel}>Last name:</Text>
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field:{onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.formInput}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="default"
                                keyboardAppearance="dark"
                            />
                        )}
                    />
                    <Text style={styles.formLabel}>Email:</Text>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field:{onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.formInput}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="email-address"
                                keyboardAppearance="dark"
                            />
                        )}
                    />
                    <Text style={styles.formLabel}>Password:</Text>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field:{onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.formInput}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="default"
                                keyboardAppearance="dark"
                            />
                        )}
                    />
                    <ImagePickerComponent onImageSelected={(uri) => {
                        setImageUri(uri);
                        setValue('profilePicture', uri); // Update React Hook Form with the selected image
                    }} />
                <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit(onSuccess, onError)}>
                    <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>    
            </View>
            <View style={styles.loginBtn}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.loginBtnSubmit}
                >
                    <Text style={styles.loginBtnText}>Don't have an account? Register here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0", // Slight background for fallback
    },
    headerContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#003087", // Dark blue
    },
    formContainer: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // For Android shadow
    },
    formLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    formInput: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    btnSubmit: {
        backgroundColor: "blue", // Gradient can be mimicked with libraries
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    btnText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    loginBtn: {
        marginTop: 20,
    },
    loginBtnSubmit: {
        padding: 10,
    },
    loginBtnText: {
        color: "#007BFF",
        textDecorationLine: "underline",
        textAlign: "center",
    },
});
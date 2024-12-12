import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native"
import { useState, useCallback, useEffect, useContext } from "react";
import {useForm, Controller} from "react-hook-form";
import AuthContext from "../navigators/AuthContext";
import db from "../helpers/db";


export default function LoginPage({navigation}) {
    const {setIsLoggedIn, setUser} = useContext(AuthContext)
    const {reset, handleSubmit, control, formState: {errors}} = useForm({
        mode: "onChange",
        defaultValues: {
            id: "",
            email: "",
            password: "",
            profile_picture: null,
        }
    });
    const onSuccess = useCallback(
        (data) => {
          const { email, password } = data;
          try {
            db.transaction((tx) => {
              tx.executeSql(
                "SELECT * FROM participant WHERE email = ? AND password = ?;",
                [email, password],
                (_, { rows }) => {
                  if (rows.length > 0) {
                    const user = rows._array[0];
                    setIsLoggedIn(true);
                    setUser(user); // Save user details globally
                  } else {
                    Alert.alert("Login Failed", "Invalid email or password");
                  }
                },
                (_, error) => {
                  console.error("Error querying user:", error);
                }
              );
            });
          } catch (e) {
            console.log("Error during login:", e);
          }
        },
        [setIsLoggedIn, setUser]
      );
    
    const onError = useCallback((error)=> {
        console.log(error)
        alert(error)
    }, [])
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Welcome back, log in here!</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.formLabel}>Email:</Text>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field:{onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
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
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="default"
                                keyboardAppearance="dark"
                            />
                        )}
                    />
                    <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit(onSuccess, onError)}>
                        <Text style={styles.btnText}>Log In</Text>
                    </TouchableOpacity>    
                </View>
                <View style={styles.registerBtn}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Register')}
                        style={styles.registerBtnSubmit}
                    >
                        <Text style={styles.registerBtnText}>Don't have an account? Register here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    input: {
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
    registerBtn: {
        marginTop: 20,
    },
    registerBtnSubmit: {
        padding: 10,
    },
    registerBtnText: {
        color: "#007BFF",
        textDecorationLine: "underline",
        textAlign: "center",
    },
});

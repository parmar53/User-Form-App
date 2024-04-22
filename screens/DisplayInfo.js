// SecondScreen
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";

const DisplayInfo = ({ route, navigation }) => {
  const { name, email, address, phone, photo } = route.params;
  // console.log("Photo URI in DisplayInfo:", photo); // Check if photo URI is received correctly

  const handleDisplayEmail = (email) => {
    const maxLength = 25; // Set a maximum length
    return email.length > maxLength ? email.slice(0, maxLength) + "..." : email;
  };

  const handleReset = () => {
    // Resetting the navigation stack to FirstScreen
    navigation.reset({
      index: 0,
      routes: [{ name: "CollectInfo" }],
    });
  };

  //Navigate to edit profile section
  const navigateProfileEdit = () => {
    navigation.navigate("ProfileEditScreen", {
      name,
      email,
      address,
      phone,
      photo,
    });
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.photo} />
      ) : (
        <Image
          source={require("../photo/default-photo.jpg")}
          style={styles.photo}
        />
      )}
      <Text style={styles.label}>
        Name:
        <Text style={styles.text}> {name}</Text>
      </Text>
      <Text style={styles.label}>
        Email:
        <Text style={styles.text}> {handleDisplayEmail(email)}</Text>
      </Text>
      <Text style={styles.label}>
        Address:
        <Text style={styles.text}> {address}</Text>
      </Text>
      <Text style={styles.label}>
        Phone:
        <Text style={styles.text}> {phone}</Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editbutton} onPress={navigateProfileEdit}>
        <Text style={styles.editbuttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5ff",
  },
  photo: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 100,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    width: "100%",
    color: "#666",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    width: "40%",
    alignItems: "center",
  },
  editbutton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: "60%",
    justifyContent: "center",
  },
  editbuttonText: {
    color: "#fff",
    fontSize: 18,
    width: "100%",
    paddingHorizontal: "23%",
    justifyContent: "center",
  },
});

export default DisplayInfo;

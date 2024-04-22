// ProfileEditScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const ProfileEditScreen = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email";
    }
    if (!address.trim()) {
      errors.address = "Address is required";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhone(phone)) {
      errors.phone = "Phone number must contain only digits";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPhone = (phone) => {
    // Basic phone number validation
    return /^\d+$/.test(phone);
  };

  useEffect(() => {
    // Fetch the user's profile information from the route params
    const { name, email, address, phone, photo } = route.params;
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
    setImage(photo);
  }, [route.params]);

  const handleSaveChanges = async () => {
    //save changes to user profile
    if (validateForm()) {
      navigation.navigate("DisplayInfo", {
        name,
        email,
        address,
        phone,
        photo: image,
      });
    }
  };

  const takePhotoFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required to take a photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const choosePhotoFromLibrary = async () => {
    //choose image from gallery
    const permissionCamera =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionCamera.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSelectPhoto = () => {
    Alert.alert(
      "Choose Option",
      "Would you like to take a photo or choose from gallery?",
      [
        {
          text: "Take Photo",
          onPress: () => takePhotoFromCamera(),
        },
        {
          text: "Choose from Gallery",
          onPress: () => choosePhotoFromLibrary(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 200}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.viewcontainer}>
          <View style={styles.centerContent}>
            <TouchableOpacity onPress={handleSelectPhoto}>
              <Image
                source={
                  image ? { uri: image } : require("../photo/default-photo.jpg")
                }
                style={styles.image}
              />
              {!image && (
                <View style={styles.overlay}>
                  <AntDesign
                    name="plus"
                    size={24}
                    color="black"
                    style={styles.plusIcon}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          {errors.address && <Text style={styles.error}>{errors.address}</Text>}

          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
          {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
          <View style={styles.buttonStyle}>
            <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1, // Ensure container fills available space vertically
    justifyContent: "center",
    backgroundColor: "#f5f5ff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  viewcontainer: {
    flex: 1,
    backgroundColor: "#fedbd0",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",

    // elevation: 5,
  },
  centerContent: {
    width: "100%",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  plusIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 30,
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 100,
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
  },

  buttonStyle: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#007bff", // Change the background color here
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: "60%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 30,
    width: "90%",
    alignItems: "center",
  },
});

export default ProfileEditScreen;

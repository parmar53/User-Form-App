import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CollectInfo from "./screens/CollectInfo";
import DisplayInfo from "./screens/DisplayInfo";
import ProfileEditScreen from "./screens/ProfileEdit";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CollectInfo">
        <Stack.Screen
          name="CollectInfo"
          component={CollectInfo}
          options={{ title: "User Information" }}
        />
        <Stack.Screen
          name="DisplayInfo"
          component={DisplayInfo}
          options={{ title: "User Details" }}
        />
        <Stack.Screen
          name="ProfileEditScreen"
          component={ProfileEditScreen}
          options={{ title: "Edit Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

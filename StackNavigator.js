import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import StateInfoScreen from '../screens/StateInfoScreen';



const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}> 

      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="StateInfo" component={StateInfoScreen} />


    </Stack.Navigator>
  );
};
export default StackNavigator;

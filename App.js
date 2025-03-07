import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Notes from './screens/notas/Notes'
import CreateNote from './screens/notas/CreateNote';
import DetailNote from './screens/notas/DetailNote';
import Menu from './screens/compras/Menu';
import NewList from './screens/compras/NewList';
import AddProduct from './screens/compras/AddProduct';
import MenuConta from './screens/contabilidad/MenuConta';
import customTransition from './transitions/EasingTransition';
import fadeTransition from './transitions/fadeTransition';
import slideTransition from './transitions/slideTransition';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function App() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  function MyStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown:false, fadeTransition}}/>
        </Stack.Navigator>
    );
  }
  function Notas() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Notes" component={Notes} options={{headerShown:false, customTransition}} />
          <Stack.Screen name="CreateNote" component={CreateNote} options={{headerShown:false, customTransition}} />
          <Stack.Screen name="DetailNote" component={DetailNote} options={{headerShown:false, slideTransition}} />
        </Stack.Navigator>
    );
  }
  function Compras(){
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Menu' component={Menu} options={{headerShown:false, fadeTransition}}/>
        <Stack.Screen name='NewList' component={NewList} options={{headerShown:false, fadeTransition}}/>
        <Stack.Screen name='AddProduct' component={AddProduct} options={{headerShown:false, fadeTransition}}/>
      </Stack.Navigator>
    );
  }
  function Contabilidad(){
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='MenuConta' component={MenuConta} options={{headerShown:false, fadeTransition}}/>
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={MyStack} />
        <Drawer.Screen name="Notas" component={Notas} />
        <Drawer.Screen name="Calculador compras" component={Compras} />
        <Drawer.Screen name="Contabilidad" component={Contabilidad} />
      </Drawer.Navigator>
    </NavigationContainer> 
  );
} 
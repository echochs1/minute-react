// import logo from './logo.svg';
import './App.css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarItem from "./src/components/TabBarItem";

import ForYou from './src/screens/ForYouScreen';
import Learn from './src/screens/LearnScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <div className="App">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false, animationEnabled: false }}>
            {() => (<Tab.Navigator >
                <Tab.Screen name="For You" component={ForYou} options={{
                  TabBarItem: ({ focused }) => (<TabBarItem focused={focused} iconName="record" text="For You"/>),
                }}/>
                <Tab.Screen name="Learn" component={Learn} options={{
                  TabBarItem: ({ focused }) => (<TabBarItem focused={focused} iconName="work" text="Learn"/>),
                }}/>
            </Tab.Navigator>)}
        </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Tab from "./Tab";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddPage from "./pages/AddPage";
import EchartsPage from "./pages/home/EchartsPage";
import EchartsPage2 from "./pages/home/EchartsPage2";

const AppStack = createStackNavigator({
    Tab : Tab,
    AddPage : AddPage,
    EchartsPage : EchartsPage,
    EchartsPage2 : EchartsPage2,
},{
    navigationOptions:{
        headerTintColor : CS.MAIN,
    }
});

const LoginStack = createStackNavigator({
    LoginPage : LoginPage,
    RegisterPage : RegisterPage,
});

const AppRoute = createSwitchNavigator({
    // LoginStack : LoginStack,
    AppStack : AppStack,
});

export default AppRoute;



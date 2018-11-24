import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Tab from "./Tab";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddPage from "./pages/AddPage";
import Echarts from "./pages/echarts/index";
import Pie from "./pages/echarts/Pie";
import Bar from "./pages/echarts/Bar";
import Line from "./pages/echarts/Line";
import Change from "./pages/echarts/Change";
import ColorHeader from "./pages/ColorHeader";
import Setting from "./pages/Setting";

const AppStack = createStackNavigator({
    Tab : Tab,
    AddPage : AddPage,

    Echarts : Echarts,
    Pie : Pie,
    Bar : Bar,
    Line : Line,
    Change : Change,

    ColorHeader : ColorHeader,
    Setting : Setting,
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



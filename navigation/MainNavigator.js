import React, { Component } from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  YellowBox,
  Dimensions,
  Button
} from "react-native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import AboutAppScreen from "../screens/AboutAppScreen";
import CollegeScreen from "../screens/CollegeScreen";
import DeveloperScreen from "../screens/DeveloperScreen";
import {LinearGradient} from 'expo-linear-gradient'
import AdminScreen from '../screens/AdminScreen'
import SideMenu from "../sidemenu";
import StudentAttendanceScreen from '../screens/StudentAttendanceScreen'
import SignUp from "../screens/SignUp";
import ActionBarImage from "../components/ActionBarImage";
import WelcomeUserScreen from "../screens/FacultyWelcomeScreen";
import AddStudentScreen from "../screens/AddStudentScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import AddAttendanceScreen from "../screens/AddAttendanceScreen";
import FacultyWelcomeScreen from "../screens/FacultyWelcomeScreen";
import AssignSubjectScreen from "../screens/AssignSubjectScreen";
import StudentWelcomeScreen from "../screens/StudentWelcomeScreen";
import AddFacultyScreen from "../screens/AddFacultyScreen";
import AddSubjectScreen from "../screens/AddSubjectScreen";
import ShowAttendanceScreen from "../screens/ShowAttendanceScreen"
import AttendanceInfoScreen from "../screens/AttendanceInfoScreen";
import FacultyReportScreen from "../screens/FacultyReportScreen";


class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require("../images/drawer.png")}
            style={{ width: 25, height: 25, marginLeft: 6 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const GradientHeader = props => (
  <View style={{ backgroundColor: '#eee' }}>
      <LinearGradient
        colors={['red', 'blue']}
        style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}
      >
        <Header {...props} />
      </LinearGradient>
    </View>
  )
const FirstActivity_StackNavigator = createStackNavigator({
  Home: {
    screen:HomeScreen,
    navigationOptions: ({ navigation }) => ({
      
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor:'#09C5F7'
        
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      ),
    })
  }
});
const LoginScreen_StackNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      ),
    })
  },
  FacultyWelcome: {
    screen: FacultyWelcomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      ),
      
    })
  },
  Admin: {
    screen: AdminScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerTintColor: "black"
    })
  },
  AssignSubject: {
    screen: AssignSubjectScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerTintColor: "black"
    })
  },
  AddStudents: {
    screen: AddStudentScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff"
    })
  },
  AddFaculty:{
    screen:AddFacultyScreen,
    navigationOptions: ({ navigation }) => ({
      
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor:'#09C5F7'
        
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      ),
    })

  },
  AddSubject:{
    screen:AddSubjectScreen,
    navigationOptions: ({ navigation }) => ({
      
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor:'#09C5F7'
        
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      ),
    })

  },
  Attendance: {
    screen: AttendanceScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff"
    })
  },
  AddAttendance: {
    screen: AddAttendanceScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff"
    })
  },

  AttendanceInfo:{
    screen:AttendanceInfoScreen,
    navigationOptions: ({ navigation }) => ({
      
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor:'#09C5F7'
        
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      ),
    })

  },
  FacultyReport:{
    screen:FacultyReportScreen,
    navigationOptions: ({ navigation }) => ({
      
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor:'#09C5F7'
        
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      ),
    })

  }

});
const Student_StackNavigator = createStackNavigator({
  StudentWelcome:{
    screen:StudentWelcomeScreen,
    navigationOptions: ({ navigation }) => ({
      
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor:'#09C5F7'
        
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      ),
    })
  },
  StudentAttendance:{
    screen:StudentAttendanceScreen,
    navigationOptions: ({ navigation }) => ({
      
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor:'#09C5F7'
        
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      ),
    })
  },
  ShowAttendance:{
    screen:ShowAttendanceScreen,
    navigationOptions: ({ navigation }) => ({
      
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor:'#09C5F7'
        
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      ),
    })
  },
})
const Attendance_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  FacultyWelcome: {
    screen: FacultyWelcomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff"
    })
  },
 
  AddAttendance: {
    screen: AddAttendanceScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff"
    })
  }
});

const DeveloperScreen_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Developers: {
    screen: DeveloperScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff"
    })
  }
});
const CollegeScreen_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  KEC_Katihar: {
    screen: CollegeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff"
    })
  }
});
const AboutAppScreen_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  AboutApp: {
    screen: AboutAppScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff"
    })
  }
});

const SignUp_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  SignUp: {
    screen: SignUp,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7"
      },
      headerTintColor: "#fff",
      headerBackground:(
        <LinearGradient
        colors={['#a13388', '#10356c']}
        style={{ flex: 1 }}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      />
      )
    })
  }
});

const Drawer = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavScreen1: { screen: FirstActivity_StackNavigator },
    NavScreen2: { screen: LoginScreen_StackNavigator },
    NavScreen3: { screen: SignUp_StackNavigator },
    NavScreen4: { screen: DeveloperScreen_StackNavigator },
    NavScreen5: { screen: CollegeScreen_StackNavigator },
    NavScreen6: { screen: AboutAppScreen_StackNavigator },

    NavScreen7: { screen: Attendance_StackNavigator },
    NavScreen8:{screen:Student_StackNavigator}
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get("window").width - 120
  }
);

export default createAppContainer(Drawer);

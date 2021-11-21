import React, { Component } from "react";
import {
  createAppContainer,
} from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from "react-navigation-drawer"
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  YellowBox,
  Dimensions,
  Button,
} from "react-native";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import AboutAppScreen from "../screens/AboutAppScreen";
import CollegeScreen from "../screens/CollegeScreen";
import DeveloperScreen from "../screens/DeveloperScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import { LinearGradient } from "expo-linear-gradient";
import AdminScreen from "../screens/AdminScreen";
import SideMenu from "../sidemenu";
import StudentAttendanceScreen from "../screens/StudentAttendanceScreen";
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
import ShowAttendanceScreen from "../screens/ShowAttendanceScreen";
import AttendanceInfoScreen from "../screens/AttendanceInfoScreen";
import FacultyReportScreen from "../screens/FacultyReportScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import EditStudentProfileScreen from "../screens/EditStudentProfileScreen";
import SearchStudentScreen from "../screens/SearchStudentScreen";
import StudentProfileScreen from "../screens/StudentProfileScreen";
import StudentDetailScreen from "../screens/StudentDetailScreen";
import ShowFeedbackScreen from "../screens/ShowFeedbackScreen";
import NotificationScreen from "../screens/SendNotificationScreen";
import RcvNotificationScreen from "../screens/RcvNotificationScreen";
import RequestLeaveScreen from "../screens/RequestLeaveScreen";
import PrincipalWelcomeScreen from "../screens/PrincipalWelcomeScreen";
import ShowLeaveRequestScreen from "../screens/ShowLeaveRequestScreen";
import FindFacultyScreen from "../screens/FindFacultyScreen";
import AddLeaveToFacultyScreen from "../screens/AddLeaveToFacultyScreen";
import LeaveRequestStatusScreen from "../screens/LeaveRequestStatusScreen";
import RegisterUserScreen from "../screens/RegisterUserScreen";
import Allstudents from "../screens/Allstudents";
import HandleRegistrationScreen from "../screens/HandleRegistrationScreen";
import EditAttendanceScreen from "../screens/EditAttendanceScreen";
import SubjectScreen from "../screens/SubjectScreen";
import RemoveSubjectScreen from "../screens/RemoveSubjectScreen";
import RemoveFacultySubScreen from "../screens/RemoveFacultySubScreen";
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

const GradientHeader = (props) => (
  <View style={{ backgroundColor: "#eee" }}>
    <LinearGradient
      colors={["red", "blue"]}
      style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}
    >
      <Header {...props} />
    </LinearGradient>
  </View>
);
const FirstActivity_StackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  RcvNotification: {
    screen: RcvNotificationScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
});
const LoginScreen_StackNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },

  ForgotPasswordScreen: {
    screen: ForgotPasswordScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  RegisterUserScreen: {
    screen: RegisterUserScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
});
const Admin_StackNavigator = createStackNavigator({
  Admin: {
    screen: AdminScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "black",
    }),
  },
  HandleRegistration: {
    screen: HandleRegistrationScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "black",
    }),
  },
  AssignSubject: {
    screen: AssignSubjectScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "black",
    }),
  },
  ShowFeedback: {
    screen: ShowFeedbackScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "black",
    }),
  },
  FindFaculty: {
    screen: FindFacultyScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "black",
    }),
  },
  AddLeaveToFaculty: {
    screen: AddLeaveToFacultyScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "black",
    }),
  },
  Notification: {
    screen: NotificationScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "black",
    }),
  },
  AddSubject: {
    screen: AddSubjectScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  Subject: {
    screen: SubjectScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  RemoveSubject: {
    screen: RemoveSubjectScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  RemoveFacultySub: {
    screen: RemoveFacultySubScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  AddFaculty: {
    screen: AddFacultyScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  AttendanceInfo: {
    screen: AttendanceInfoScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  FacultyReport: {
    screen: FacultyReportScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
});
const Principal_StackNavigator = createStackNavigator({
  Principal: {
    screen: PrincipalWelcomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  ShowLeaveRequest: {
    screen: ShowLeaveRequestScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
});
const Faculty_StackNavigator = createStackNavigator({
  FacultyWelcome: {
    screen: FacultyWelcomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  AddStudents: {
    screen: AddStudentScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
    }),
  },
  Attendance: {
    screen: AttendanceScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
    }),
  },
  AddAttendance: {
    screen: AddAttendanceScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
    }),
  },
  LeaveRequestStatus: {
    screen: LeaveRequestStatusScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
    }),
  },
  AttendanceInfo: {
    screen: AttendanceInfoScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  EditAttendance: {
    screen: EditAttendanceScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  SearchStudent: {
    screen: SearchStudentScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  StudentDetail: {
    screen: StudentDetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  EditStudentProfile: {
    screen: EditStudentProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  AllStudents: {
    screen: Allstudents,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  RequestLeave: {
    screen: RequestLeaveScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },

  FacultyReport: {
    screen: FacultyReportScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
});
const Student_StackNavigator = createStackNavigator({
  StudentWelcome: {
    screen: StudentWelcomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  StudentAttendance: {
    screen: StudentAttendanceScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  EditStudentProfile: {
    screen: EditStudentProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
  StudentProfile: {
    screen: StudentProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },

  ShowAttendance: {
    screen: ShowAttendanceScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
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
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
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
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
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
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
});
const FeedbackScreen_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Feedback: {
    screen: FeedbackScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Katihar Engg. College",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerRight: <ActionBarImage />,
      headerStyle: {
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
    }),
  },
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
        backgroundColor: "#09C5F7",
      },
      headerTintColor: "#fff",
      headerBackground: (
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      ),
    }),
  },
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
    NavScreen8: { screen: Student_StackNavigator },
    NavScreen9: { screen: Faculty_StackNavigator },
    NavScreen10: { screen: Admin_StackNavigator },
    NavScreen11: { screen: FeedbackScreen_StackNavigator },
    NavScreen12: { screen: Principal_StackNavigator },
  },
  {
    contentComponent: SideMenu,
    drawerPosition: "left",
    drawerWidth: Dimensions.get("window").width - 120,
  }
);

export default createAppContainer(Drawer);

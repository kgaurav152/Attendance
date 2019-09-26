import { createStackNavigator, createAppContainer } from 'react-navigation';

import DashboardScreen from '../screens/DashboardScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const AttendanceNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  Dashboard: {
    screen: DashboardScreen
  },
});

export default createAppContainer(AttendanceNavigator);

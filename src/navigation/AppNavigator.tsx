import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TaskList from '../screens/TaskList';
import TaskForm from '../screens/TaskForm';

export type RootParamList = {
  TaskList: undefined;
  TaskForm: {taskId?: string};
};

const Stack = createStackNavigator<RootParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TaskList"
          component={TaskList}
          options={{title: 'Tasks'}}
        />
        <Stack.Screen
          name="TaskForm"
          component={TaskForm}
          options={{title: 'Task Form'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

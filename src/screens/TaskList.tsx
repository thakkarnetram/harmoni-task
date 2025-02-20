import React from 'react';
import {View, FlatList} from 'react-native';
import {Button, List} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import {deleteTask, toggleTaskCompletion} from '../redux/actions/actions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootParamList, 'TaskList'>>();

  const renderCheckbox = (itemId: string, completed: boolean) => (
    <CheckBox
      value={completed}
      onValueChange={() => dispatch(toggleTaskCompletion(itemId))}
      tintColors={{true: '#6200ee', false: '#000'}}
      style={{marginRight: 8}}
    />
  );

  return (
    <View style={{flex: 1, padding: 20}}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <List.Item
            title={item.title}
            description={`Priority: ${item.priority}`}
            left={() => renderCheckbox(item.id, item.completed)}
            right={() => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Button
                  onPress={() =>
                    navigation.navigate('TaskForm', {taskId: item.id})
                  }>
                  Edit
                </Button>
                <Button onPress={() => dispatch(deleteTask(item.id))}>
                  Delete
                </Button>
              </View>
            )}
          />
        )}
      />
      <Button mode="contained" onPress={() => navigation.navigate('TaskForm')}>
        Add Task
      </Button>
    </View>
  );
};

export default TaskList;

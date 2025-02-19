import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Button, RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, editTask} from '../redux/actions/actions';
import {RootState} from '../redux/rootReducer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootParamList, 'TaskForm'>;

const TaskForm = ({route, navigation}: Props) => {
  const dispatch = useDispatch();
  const taskId = route.params?.taskId;
  const existingTask = useSelector((state: RootState) =>
    state.tasks.tasks.find(task => task.id === taskId),
  );

  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(
    existingTask?.description || '',
  );
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(
    existingTask?.priority || 'Low',
  );

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setPriority(existingTask.priority);
    }
  }, [existingTask]);

  const handleSubmit = () => {
    if (taskId) {
      dispatch(
        editTask({
          id: taskId,
          title,
          description,
          priority,
          completed: existingTask?.completed || false,
        }),
      );
    } else {
      dispatch(addTask({title, description, priority}));
    }
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <TextInput label="Title" value={title} onChangeText={setTitle} />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <RadioButton.Group
        onValueChange={value => setPriority(value as 'Low' | 'Medium' | 'High')}
        value={priority}>
        <RadioButton.Item label="Low" value="Low" />
        <RadioButton.Item label="Medium" value="Medium" />
        <RadioButton.Item label="High" value="High" />
      </RadioButton.Group>

      <Button mode="contained" onPress={handleSubmit}>
        Save Task
      </Button>
    </View>
  );
};

export default TaskForm;

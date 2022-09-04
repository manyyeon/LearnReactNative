/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import DateHead from './components/DateHead';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';
import todosStorage from './storages/todoStorage';

const App = () => {
  const today = new Date();
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '작업환경 설정',
      done: false,
    },
    {
      id: 2,
      text: 'RN 기초 공부',
      done: true,
    },
    {
      id: 3,
      text: '투두 리스트 만들어보기',
      done: false,
    },
  ]);

  useEffect(() => {
    todosStorage.get().then(setTodos).catch(console.error);
  }, []);

  useEffect(() => {
    todosStorage.set(todos).catch(console.error);
  }, [todos]);

  const onInsert = (text) => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false,
    };
    setTodos(todos.concat(todo));
  };

  const onToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const onRemove = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding', android: undefined })}
          style={styles.avoid}
        >
          <DateHead date={today} />
          {todos === null ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});

export default App;

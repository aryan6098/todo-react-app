import React, { createContext, useState } from "react";

interface Todo {
  id: number;
  title: string;
  subtasks: Todo[];
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  addSubtask: (parentId: number, subtask: Todo) => void;
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  addSubtask: () => {},
});

const TodoProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([
        {
          id: 1,
          title: "Task 1",
          subtasks: [
            { id: 11, title: "Subtask 1", subtasks: [] },
            { id: 12, title: "Subtask 2", subtasks: [] },
          ],
        },
        {
            id: 2,
            title: "Task 2",
            subtasks: [],
          },
        {
          id: 3,
          title: "Task 3",
          subtasks: [
            { id: 21, title: "Subtask 1", subtasks: [] },
          ],
        },
      ]);
  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const addSubtask = (parentId: number, subtask: Todo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === parentId) {
        return {
          ...todo,
          subtasks: [...todo.subtasks, subtask],
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, addSubtask }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };

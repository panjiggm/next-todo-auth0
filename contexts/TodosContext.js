import { createContext, useState } from "react";

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch("/api/getTodos");
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const res = await fetch("/api/addTodo", {
        method: "POST",
        body: JSON.stringify({ description: todo }),
        headers: { "Content-Type": "application/json" },
      });
      const newtodo = await res.json();
      setTodos((prevTodos) => {
        return [newtodo, ...prevTodos];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const res = await fetch("/api/updateTodo", {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: { "Content-Type": "application/json" },
      });
      await res.json();
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        let existingTodo = existingTodos.find(
          (todo) => todo.id === updatedTodo.id
        );
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch("/api/deleteTodo", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (dataUpload) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
        uploadImage,
      }}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };

import { useState, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useContext(TodosContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo(todo);
    setTodo("");
  };

  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex flex-col text-sm mb-2">
        <label htmlFor="todo" className="font-bold mb-2 text-gray-800">
          Todo
        </label>
        <input
          className="border border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
          type="text"
          id="todo"
          name="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="add todo..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 rounded-md py-2 px-4 text-white hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default TodoForm;

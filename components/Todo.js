import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";

const Todo = ({ todo }) => {
  const { updateTodo, deleteTodo } = useContext(TodosContext);

  // +++++++++++++++++++ | STATE | +++++++++++++++++++
  const [completed, setCompleted] = useState(
    todo.fields && todo.fields.completed
  );

  const handleToggleCompleted = async () => {
    const updatedFields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };
    setCompleted(!todo.fields.completed);
    updateTodo(updatedTodo);
  };

  return (
    <li className="bg-white flex justify-between items-center shadow-lg rounded-lg my-2 py-2 px-4">
      <div className="flex items-center ">
        <input
          className="mr-2 form-checkbox h-5 w-5"
          type="checkbox"
          name="completed"
          checked={completed}
          onChange={handleToggleCompleted}
        />
        <p className={`flex text-gray-800 ${completed && "line-through"}`}>
          {todo.fields && todo.fields.description}
        </p>
      </div>
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default Todo;

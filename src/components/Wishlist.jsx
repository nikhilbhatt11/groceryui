import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import Loading from "./Loading";

function Wishlist() {
  const [todos, setTodos] = useState([]);
  const [todoHeading, setTodoHeading] = useState("");
  const [subTodos, setSubTodos] = useState([]);
  const [subTodoInput, setSubTodoInput] = useState("");
  const [error, setError] = useState(null);

  const [reload, setReload] = useState(false);
  const [updateTodo, setupdateTodo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchAllTodod = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/wishlist/all-todos",
        { withCredentials: true }
      );

      setTodos(response.data.data);
      setLoading(false);
    };
    fetchAllTodod();
  }, [reload]);
  // Add a new subTodo to the array
  useEffect(() => {
    const existingList = JSON.parse(localStorage.getItem("subTodoList")) || [];
    setSubTodos(existingList);
  }, []);

  const addSubTodo = () => {
    if (subTodoInput.trim()) {
      const subTodo = {
        id: uuidv4(),
        description: subTodoInput,
        isCompleted: false,
      };

      const existingList =
        JSON.parse(localStorage.getItem("subTodoList")) || [];
      existingList.push(subTodo);
      localStorage.setItem("subTodoList", JSON.stringify(existingList));
      setSubTodos(existingList);
      setSubTodoInput("");
    }
  };

  // Add the main todo with subtodos
  const addTodo = async () => {
    const localsubTodod = JSON.parse(localStorage.getItem("subTodoList"));

    if (todoHeading.trim() && localsubTodod.length > 0) {
      const newTodo = {
        subTodos: localsubTodod,
        heading: todoHeading,
        isTodoListCompleted: false,
      };

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/wishlist/add-todo",
          newTodo,
          { withCredentials: true }
        );

        setTodoHeading("");
        setReload(!reload);
        localStorage.setItem("subTodoList", JSON.stringify([]));
      } catch (error) {
        setError(error);
      }
    }
  };

  // Toggle a subTodo's completion status
  const toggleSubTodoStatus = async (todoId, subTodoId) => {
    console.log(todoId, subTodoId);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/wishlist/${todoId}/${subTodoId}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data.message);
      setSuccessMsg(response.data.message);
    } catch (error) {
      setError("error in updating the todod");
    }
    // setReload(!reload);
  };

  // Update main todo heading

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const updateTodoHeading = async () => {
    const { todoId, newHeading } = updateTodo;

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/wishlist/updatetodo/${todoId}`,
        { heading: newHeading },
        { withCredentials: true }
      );
      console.log("Todo heading updated successfully", response.data);
      setReload(!reload);
    } catch (error) {
      setError(error);
    }
  };

  const updateSubTodoDescription = async () => {
    const { todoId, subTodoId, newDescription } = updateTodo;
    console.log(todoId, subTodoId, newDescription);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/wishlist/updateSubTodo/${todoId}/${subTodoId}`,
        { description: newDescription },
        { withCredentials: true }
      );
      console.log("SubTodo description updated successfully", response.data);
      setReload(!reload);
    } catch (error) {
      setError(error);
    }
  };

  const deleteSubTododLocally = (subTodo) => {
    try {
      const localSubTododList =
        JSON.parse(localStorage.getItem("subTodoList")) || [];
      const updatedList = localSubTododList.filter(
        (subtodo) => subtodo.id !== subTodo.id
      );
      localStorage.setItem("subTodoList", JSON.stringify(updatedList));
      setSubTodos(updatedList);
      setError(null);
    } catch (error) {
      setError("error deleting subtodo locally");
    }
  };
  const deleteSubTodo = async (todoId, subTodoId) => {
    console.log(todoId, subTodoId);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/wishlist/deletesubtodo/${todoId}/${subTodoId}`,
        { withCredentials: true }
      );
      setReload(!reload);
      console.log(response);
    } catch (error) {
      setError(error);
    }
  };

  const deleteTodo = async (todoId) => {
    console.log(todoId);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/wishlist/deleteTodo/${todoId}`,
        { withCredentials: true }
      );
      setReload(!reload);
      console.log(response);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [error]);

  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="p-4">
        {error && (
          <div
            className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <h1 className="text-xl font-bold mb-4">Shop Todos</h1>

        {/* Add a new todo */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Todo Heading"
            value={todoHeading}
            onChange={(e) => setTodoHeading(e.target.value)}
            className="border p-2 mb-2 w-full rounded-md"
          />
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Enter SubTodo Description"
              value={subTodoInput}
              onChange={(e) => setSubTodoInput(e.target.value)}
              className="border p-2 flex-1 mr-2 rounded-md"
            />
            <button
              onClick={addSubTodo}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add SubTodo
            </button>
          </div>

          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th>S.No</th>
                <th>SubTodod</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {subTodos.map((subTodo, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td>{index + 1}.</td>
                  <td>{subTodo.description}</td>
                  <td
                    className="border-b p-2 items-center text-lg cursor-pointer"
                    onClick={() => deleteSubTododLocally(subTodo)}
                  >
                    <MdOutlineDeleteOutline />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addTodo}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Todo
          </button>
        </div>

        {/* Display todos */}
        <div className="">
          {todos.map((todo, todoIndex) => (
            <div key={todoIndex} className="border p-4 mb-4 rounded-md">
              {/* Editable Todo Heading */}
              <div className="flex">
                <input
                  type="text"
                  value={todo.heading}
                  onChange={(e) => {
                    setTodos((prevTodos) =>
                      prevTodos.map((t) =>
                        t._id === todo._id
                          ? { ...t, heading: e.target.value }
                          : t
                      )
                    );
                    setupdateTodo({
                      todoId: todo._id,
                      newHeading: e.target.value,
                    });
                  }}
                  className={`text-lg font-semibold border p-2 mb-2 w-full rounded-md ${
                    todo.isTodoListCompleted ? "bg-green-200" : "bg-white"
                  }`}
                />
                <p
                  className="flex items-center justify-center m-2"
                  onClick={updateTodoHeading}
                >
                  <MdOutlineTipsAndUpdates className="text-3xl text-green-500 hover:bg-red-300 rounded-md" />
                </p>
                <p
                  className="flex items-center justify-center"
                  onClick={() => deleteTodo(todo._id)}
                >
                  <MdOutlineDeleteOutline className="text-3xl text-red-600 hover:bg-green-300 rounded-md" />
                </p>
              </div>
              <p>
                Status: {todo.isTodoListCompleted ? "Completed" : "Incomplete"}
              </p>
              <ul className="list-disc pl-6">
                {todo.subTodos.map((subTodo, subTodoIndex) => (
                  <li key={subTodoIndex} className="flex items-center mb-2">
                    {/* Editable SubTodo Description */}
                    <input
                      type="text"
                      value={subTodo.description}
                      onChange={(e) => {
                        setTodos((prevTodos) =>
                          prevTodos.map((t) =>
                            t._id === todo._id
                              ? {
                                  ...t,
                                  subTodos: t.subTodos.map((s) =>
                                    s.id === subTodo.id
                                      ? { ...s, description: e.target.value }
                                      : s
                                  ),
                                }
                              : t
                          )
                        );
                        setupdateTodo({
                          todoId: todo._id,
                          subTodoId: subTodo.id,
                          newDescription: e.target.value,
                        });
                      }}
                      className="border p-2 flex-1 mr-2 rounded-md"
                    />

                    {/* Completion Checkbox */}
                    <input
                      type="checkbox"
                      checked={subTodo.isCompleted}
                      onChange={() => toggleSubTodoStatus(todo._id, subTodo.id)}
                      className="mr-2 transform scale-150"
                    />
                    <p onClick={updateSubTodoDescription} className="m-2">
                      <MdOutlineTipsAndUpdates className="text-2xl text-green-500 cursor-pointer hover:bg-red-300 rounded-md text-center" />
                    </p>
                    <p onClick={() => deleteSubTodo(todo._id, subTodo.id)}>
                      <MdOutlineDeleteOutline className="text-2xl text-red-500 cursor-pointer hover:bg-green-300 rounded-full" />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Wishlist;

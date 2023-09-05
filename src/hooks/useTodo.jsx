import axios from 'axios';
import { useRef, useState } from 'react';

export const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState();
  const [isUpdateMode, setIsUpdateMode] = useState(-1);

  const inputRef = useRef();
  const updateInputRef = useRef();

  const handleAdd = () => {
    inputRef.current.value = '';
    axios
      .post('http://localhost:8000', {
        title: todo
      })
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = (index) => {
    if (isUpdateMode === -1) return setIsUpdateMode(index);

    if (isUpdateMode > -1 && updateInputRef.current) {
      const newState = [...todos];
      newState[index] = updateInputRef.current.value;
      setTodos(newState);
      setIsUpdateMode(-1);
    }
  };

  const handleDelete = (index) => {
    const newState = [...todos];
    delete newState[index];
    setTodos(newState.filter((todo) => todo));

    if (isUpdateMode === index) setIsUpdateMode(-1);
  };

  const handleUpdateMode = (index, item) => {
    return isUpdateMode === index ? (
      <input ref={updateInputRef} width="300" height="50" defaultValue={item} />
    ) : (
      <p>{item.title}</p>
    );
  };

  const handleChange = (e) => setTodo(e.target.value);

  return {
    todos,
    setTodos,
    inputRef,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleUpdateMode,
    handleChange
  };
};

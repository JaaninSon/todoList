import { useRef, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState();
  const [isUpdateMode, setIsUpdateMode] = useState(-1); // index 값 에 상관없는 값을 넣기 위해서. null, false 뭐든 js에선 상관없음.
  const inputRef = useRef();
  const updateInputRef = useRef();

  const handleAdd = () => {
    setTodos([...todos, todo]);
    inputRef.current.value = '';
  };

  const handleUpdate = (index) => {
    if (isUpdateMode && updateInputRef.current) {
      const newState = [...todos];
      newState[index] = updateInputRef.current.value;
      setTodos(newState);
      setIsUpdateMode(-1);
    }
    if (isUpdateMode === -1) setIsUpdateMode(index);
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
      <p>{item}</p>
    );
  };

  return (
    <>
      <input
        ref={inputRef}
        width="300"
        height="50"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />

      <button onClick={handleAdd}>추가</button>
      <p>
        {todos.map((item, index) => {
          return (
            <>
              {handleUpdateMode(index, item)}
              <button onClick={() => handleUpdate(index)}>수정</button>
              <button onClick={() => handleDelete(index)}>삭제</button>
            </>
          );
        })}
      </p>
    </>
  );
}

export default App;

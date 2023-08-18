import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState();

  console.log(todo, todos);

  return (
    <>
      <input
        width="300"
        height="50"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setTodos([...todos, todo]);
        }}
      >
        추가
      </button>
      <p>
        {todos.map((item, index) => {
          return (
            <>
              <p>{item}</p>
              <button
                onClick={() => {
                  const newState = [...todos];
                  delete newState[index];
                  setTodos(newState.filter((todo) => todo));
                }}
              >
                삭제
              </button>
            </>
          );
        })}
      </p>
    </>
  );
}

export default App;

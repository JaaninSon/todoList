import { useTodo } from './hooks/useTodo';
import { Fragment, useEffect } from 'react';
import axios, { isAxiosError } from 'axios';

function App() {
  const {
    inputRef,
    todos,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleUpdateMode,
    handleChange,
    setTodos
  } = useTodo();

  useEffect(() => {
    axios
      .get('http://localhost:8000')
      .then((res) => {
        setTodos(res.data);
      })
      .catch((e) => {
        if (isAxiosError(e)) {
          if (e.response.status === 404) throw new Error('404 Not Found!');
        } else {
          // Unknown error
          console.log('unknown', e);
        }
      });
  }, []);

  return (
    <>
      <input ref={inputRef} width="300" height="50" onChange={handleChange} />

      <button onClick={handleAdd}>추가</button>
      <div>
        {todos.map((item, index) => {
          return (
            <Fragment key={index}>
              {handleUpdateMode(index, item)}
              <button onClick={() => handleUpdate(index)}>수정</button>
              <button onClick={() => handleDelete(index)}>삭제</button>
            </Fragment>
          );
        })}
      </div>
    </>
  );
}

export default App;

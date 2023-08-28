import { useTodo } from './hooks/useTodo';
import { Fragment } from 'react';

function App() {
  const { inputRef, todos, handleAdd, handleUpdate, handleDelete, handleUpdateMode, handleChange } =
    useTodo();

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

import { useState } from 'react';


function App() {
    const [state, setState] = useState();
  return (
    <>
      <input width='300' height='50' onChange={(e) => {setState(e.target.value)}} />
        <button>추가</button>
        <p>{state}</p>
    </>
  );
}

export default App;

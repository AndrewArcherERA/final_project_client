import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [count, setCount] = useState(0);

  async function handleClick(){
    setCount(count + 1);
  }

  async function putData(){
    const response = await axios({
      method: 'put',
      url: 'http://localhost:8080/counts/increment',
      data: {
        id: 1,
        count: count
      }
    });

    console.log(response);
  }

  useEffect(() => {
    if(count)
      putData();
  }, [count])

  return (
    <div className="App">
      <header className="App-header">
        <p>{count}</p>
        <button onClick={handleClick}>Click Me</button>
      </header>
    </div>
  );
}

export default App;

import { useState } from 'react'
import CoreRoutes from './routes';

import './App.css'
import Safari from './pages/Safari'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CoreRoutes />
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Editing <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Safari /> */}
    </>
  )
}

export default App

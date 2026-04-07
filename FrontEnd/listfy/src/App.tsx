import './App.css'
import { useState } from 'react';


function App() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <>
      <div className="p-6">
        <label className="container">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <div className="checkmark"></div>
          Check
        </label>
      </div>
    </>
  )
}

export default App
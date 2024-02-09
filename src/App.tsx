import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from './component/button.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button size={"md"}></Button>
    </>
  )
}

export default App

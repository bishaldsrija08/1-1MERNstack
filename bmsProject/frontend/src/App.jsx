import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Create from "./components/Create"
import Single from "./components/Single"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/single" element={<Single/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
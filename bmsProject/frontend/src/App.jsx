import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Single from "./pages/Single"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar/>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/single" element={<Single/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
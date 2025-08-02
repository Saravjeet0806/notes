import {Route, Routes} from "react-router"
import HomePage from "./pages/HomePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import CreatePage from "./pages/CreatePage"

const App = () => {
  return (
     <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
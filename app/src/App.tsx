import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import TravelListPage from "./pages/TravelListPage"
import TravelSinglePage from "./pages/TravelSinglePage";
import { Toaster } from "sonner";
import TravelEditPage from "./pages/TravelEditPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav className="flex justify-between items-center p-4 bg-red-400 text-white">
          <Link to="/">Home</Link>
        </nav>

        <div className="container mx-auto mt-10">
          <Routes>
            <Route path='/' element={<TravelListPage />} />
            <Route path='/:id' element={<TravelSinglePage />} />
            <Route path='/edit/:id' element={<TravelEditPage />} />
          </Routes>
          <Toaster richColors position="bottom-right" />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

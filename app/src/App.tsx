import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import TravelListPage from "./pages/travel/TravelListPage"
import TravelSinglePage from "./pages/travel/TravelSinglePage";
import { Toaster } from "sonner";
import TravelEditPage from "./pages/travel/TravelEditPage";
import CategoryListPage from "./pages/category/CategoryListPage";
import CategorySinglePage from "./pages/category/CategorySinglePage";
import CategoryEditPage from "./pages/category/CategoryEditPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav className="flex justify-between items-center p-4 bg-red-400 text-white">
          <Link to="/">Home</Link>
          <Link to="/category">Categories</Link>
        </nav>

        <div className="container mx-auto mt-10">
          <Routes>
            {/* Travels */}
            <Route path='/' element={<TravelListPage />} />
            <Route path='/:id' element={<TravelSinglePage />} />
            <Route path='/edit/:id' element={<TravelEditPage />} />
            {/* Categories */}
            <Route path='/category' element={<CategoryListPage />} />
            <Route path='/category/:id' element={<CategorySinglePage />} />
            <Route path='/category/edit/:id' element={<CategoryEditPage />} />
          </Routes>
          <Toaster richColors position="bottom-right" />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

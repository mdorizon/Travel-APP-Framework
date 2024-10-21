import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TravelListPage from "./pages/TravelListPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <TravelListPage />,
  },
  {
    path: "test",
    element: <div>test</div>
  }
]);


function App() {
  return ( <RouterProvider router={router} /> )
}

export default App

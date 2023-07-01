import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Browse from "./pages/Browse";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<h1> Default view</h1>} />
      <Route path="/login" element={<h1> Login</h1>} />
      <Route path="/browser" element={<Layout />}>
        <Route index element={<Browse />} />
      </Route>
      <Route>
        <Route path="/latest" element={<Layout />} />
        <Route index element={<h1>Latest</h1>} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

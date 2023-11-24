
import './App.css'


import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,RouterProvider
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Homepage from './Pages/Homepage';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
        <Route
        path="/"
        element={<Registration />}
      >
        </Route>
        <Route
        path="/login"
        element={<Login />}
      >
        </Route>
        <Route
        path="/home"
        element={<Homepage />}
      >
        </Route>
    </Route>
    )
  );

  return (
    <>
<ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
<RouterProvider router={router} />

    </>
  )
}

export default App

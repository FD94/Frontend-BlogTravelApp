
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePost from "./pages/CreatePost"
import PrivateRoute from "./components/PrivateRoutes"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignUpPage"
import EditPostsPage from "./pages/EditPostsPage"



function App() {


  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<PrivateRoute> <CreatePost /> </PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute> <EditPostsPage /> </PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  )
}

export default App

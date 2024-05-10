import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInForm from "./pages/authentication/SignInForm";
import SignUpForm from "./pages/authentication/SignUpForm";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact="true" path="/" element={<SignInForm />} />
        <Route exact="true" path="/sign-up" element={<SignUpForm />} />
        <Route exact="true" path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
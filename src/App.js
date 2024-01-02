import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Header from "./pages/components/Header";
import Footer from "./pages/components/Footer";

function App() {
  return (
    <BrowserRouter>
        <Header/>
          <Routes>
            <Route index element={<HomePage/>}/>
            <Route path={"/signup"} element={<SignUpPage/>}/>
            <Route path={"/login"} element={<LoginPage/>}/>
          </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;

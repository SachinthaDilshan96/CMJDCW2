import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./pages/components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoutes from "./utils/ProtectedRoutes";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/secured/ProductsPage";
import UserPage from "./pages/secured/UserPage";
import "./App.css"
import CategoriesPage from "./pages/secured/CategoriesPage";
import DashboardHome from "./pages/secured/DashboardHome";
import Products from "./pages/secured/Products";

function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route element={<ProtectedRoutes/>}>
                  <Route path={"/dashboard"} element={<DashboardPage/>}>
                      <Route path={""} element={<DashboardHome/>}/>
                      <Route path={"categories"} element={<CategoriesPage/>}/>
                      <Route path={"inventory"} element={<ProductsPage/>}/>
                      <Route path={"myAccount"} element={<UserPage/>}/>
                      <Route path={"products"} element={<Products/>}/>
                  </Route>
              </Route>
              <Route index element={<HomePage/>}/>
              <Route path={"/signup"} element={<SignUpPage/>}/>
            <Route path={"/login"} element={<LoginPage/>}/>
          </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;

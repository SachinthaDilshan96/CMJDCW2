import "./CSS/HomePage.css"
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const HomePage =()=>{
    const navigate = useNavigate();
    const changeRoute=()=>{
        navigate("/login")
    }
    return(
        <div className={"main-container container"}>
            <div className={"inner-container row"}>
                <div className={"col-sm-12 text-center"}>
                    <h1 className={"main-header"}>Welcome to the CMJD POS System</h1>
                </div>
                <div className={"col-sm-12 text-center"}>
                    <h3>Please Login to access the system</h3>
                    <Button onClick={changeRoute} variant={"contained"}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;

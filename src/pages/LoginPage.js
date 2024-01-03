import "./CSS/LoginPage.css"
import { Link, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginPage =() =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid,setIsEmailValid] = useState(true);
    const [isPasswordValid,setIsPasswordValid] = useState(false);
    const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const navigate = useNavigate();
    const handleEmail =(e)=>{
        if (emailRegex.test(e.target.value)){
            setEmail(e.target.value);
            setIsEmailValid(true);
        }else{
            setIsEmailValid(false);
        }
    }
    return(
        <div className="container main-container">
            <div className="row inner-container">
                <div className="col-sm-12 col-md-6 form-container">
                    <h2 className={"header"}>Login</h2>
                    <form className={"form"}>
                        <div className={"form-element-container"}>
                            <TextField helperText={isEmailValid?" ":"Invalid Email"} error={!isEmailValid} onChange={handleEmail}  fullWidth="true" id="email" type={"email"} label="Email" variant="outlined" />
                        </div>
                        <div className={"form-element-container password-container"}>
                            <TextField
                                error={isPasswordValid}
                                onChange={(event)=>setPassword(event.target.value)}
                                fullWidth="true"
                                id="password"
                                type='password'
                                label="Password"
                                variant="outlined"
                            />
                        </div>
                        <p><Link to={"/"}>Forgot password?</Link></p>
                        <div className={"form-element-container button-container"}>
                            <Button fullWidth={true} type={"submit"} variant={"contained"}>Login</Button>
                        </div>
                    </form>
                    <div className={"signup-container"}>
                        <p>New to the System?&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <Button onClick={()=>navigate("/signup")} variant={"contained"}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;

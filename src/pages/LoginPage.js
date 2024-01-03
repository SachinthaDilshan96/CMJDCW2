import "./CSS/LoginPage.css"
import {InputAdornment, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const LoginPage =() =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid,setIsEmailValid] = useState(false);
    const [isPasswordValid,setIsPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return(
        <div className={"main-container"}>
            <div className={"inner-container"}>
                <div className={"form-container"}>
                    <h2 className={"header"}>Login</h2>
                    <form className={"form"}>
                        <div className={"form-element-container"}>
                            <TextField error={isEmailValid} onChange={(event)=>setEmail(event.target.value)}  fullWidth="true" id="email" type={"text"} label="Email" variant="outlined" />
                        </div>
                        <div className={"form-element-container password-container"}>
                            <TextField
                                error={isPasswordValid}
                                onChange={(event)=>setPassword(event.target.value)}
                                fullWidth="true"
                                id="password"
                                type={"password"}
                                label="Password"
                                variant="outlined"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }/>
                        </div>
                        <p>Forgot password?</p>
                        <div className={"form-element-container button-container"}>
                            <Button fullWidth={true} type={"submit"} variant={"contained"}>Login</Button>
                        </div>
                    </form>
                    <div className={"signup-container"}>
                        <p>New to the System?&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <Button variant={"contained"}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;

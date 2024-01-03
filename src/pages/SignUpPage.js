import "./CSS/SignUpPage.css"
import {Link, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";

const SignUpPage =()=>{
    const [firstName, setFirstName] = useState("");
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [lastName, setLastName] = useState("");
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [email, setEmail] = useState("");
    const [isEmailValid, setEmailValid] = useState(true);
    const [password, setPassword] = useState("");
    const [isPasswordValid, setPasswordValid] = useState(true);
    const [retypePassword, setRetypePassword] = useState("");

    return(
        <div className={"container container-main"}>
            <div className={"row inner-container"}>
                <div className={"col-sm-12 col-md-6 form-container"}>
                    <h1 className={"text-center"}>Sign Up</h1>
                    <form>
                        <div className={"form-element-container"}>
                            <TextField helperText={isFirstNameValid?" ":"Invalid. First Name should contain only with letters"} variant={"outlined"} fullWidth={true} type={"text"} label={"First Name"}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField helperText={isLastNameValid?" ":"Invalid. Last Name should contain only letters"} variant={"outlined"} fullWidth={true} type={"text"} label={"Last Name"}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField helperText={isEmailValid?" ":"Invalid Email"}variant={"outlined"} fullWidth={true} type={"email"} label={"Email"}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField helperText={isPasswordValid?" ":"Invalid Password"} variant={"outlined"} fullWidth={true} type={"password"} label={"Password"}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField helperText={isPasswordValid?" ":"Invalid Password"} variant={"outlined"} fullWidth={true} type={"password"} label={"Retype the Password"}/>
                        </div>
                        <div className={"form-element-container"}>
                            <Button fullWidth={true} type={"submit"} variant={"contained"}>Sign Up</Button>
                        </div>
                        <div className={"form-element-container"}>
                            <p className={"text-center"}>Already have an account? <Link to={"/login"}>Login</Link> instead</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;

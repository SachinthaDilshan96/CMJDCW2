import "./CSS/SignUpPage.css"
import {Link, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SignUpPage =()=>{
    const [firstName, setFirstName] = useState("");
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [firstNameHelperText, setFirstNameHelperText] =  useState("");

    const [lastName, setLastName] = useState("");
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [lastNameHelperText, setLastNameHelperText] = useState("");

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailHelperText, setEmailHelperText] = useState("");

    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [passwordHelperText, setPasswordHelperText] = useState("");

    const [retypePassword, setRetypePassword] = useState("");
    const [bothPasswordValid, setBothPasswordValid] = useState(true);
    const [bothPassHelperText, setBothPassHelperText] = useState("");

    const nameRegex = new RegExp("^[a-zA-Z]*$");
    const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const handleFirstName =(e)=> {
        if (e.target.value.length > 1) {
            if (nameRegex.test(e.target.value)) {
                setIsFirstNameValid(true);
                setFirstNameHelperText("");
                setFirstName(e.target.value);
            } else {
                setIsFirstNameValid(false);
                setFirstNameHelperText("First Name should contain only letters");
            }
        } else {
            setFirstNameHelperText("First Name cannot be empty");
            setIsFirstNameValid(false);
        }
    }

        const handleLastName =(e)=> {
            if (e.target.value.length > 1) {
                if (nameRegex.test(e.target.value)) {
                    setIsLastNameValid(true);
                    setLastNameHelperText("");
                    setLastName(e.target.value);
                } else {
                    setIsLastNameValid(false);
                    setLastNameHelperText("Last Name should contain only letters");
                }
            } else {
                setLastNameHelperText("Last Name cannot be empty");
                setIsLastNameValid(false);
            }
        }

    const handleEmail =(e)=>{
        if (emailRegex.test(e.target.value)){
            setEmail(e.target.value);
            setIsEmailValid(true);
            setEmailHelperText("");
        }else{
            setIsEmailValid(false);
            setEmailHelperText("Invalid Email");
        }
    }

    const handlePassword =(e)=>{
        if (e.target.value.length>5){
            setIsPasswordValid(true);
            setPasswordHelperText("");
            setPassword(e.target.value);
        }else{
            setIsPasswordValid(false);
            setPasswordHelperText("Password should be 6 character long");
        }
    }

    const validatePasswords =()=>{
        if (password === retypePassword){
            setBothPasswordValid(true);
            setBothPassHelperText("");
        }else{
            setBothPasswordValid(false);
            setBothPassHelperText("Password doesn't match");
        }
    }

    const navigation = useNavigate();
    return(
        <div className={"container container-main"}>
            <div className={"row inner-container"}>
                <div className={"col-sm-12 col-md-6 form-container"}>
                    <h1 className={"text-center"}>Sign Up</h1>
                    <form>
                        <div className={"form-element-container"}>
                            <TextField error={!isFirstNameValid} onChange={handleFirstName} helperText={isFirstNameValid?" ":firstNameHelperText} variant={"outlined"} fullWidth={true} type={"text"} label={"First Name"}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField error={!isLastNameValid} onChange={handleLastName} helperText={isLastNameValid?" ":lastNameHelperText} variant={"outlined"} fullWidth={true} type={"text"} label={"Last Name"}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField error={!isEmailValid} onChange={handleEmail} helperText={isEmailValid?" ":emailHelperText} variant={"outlined"} fullWidth={true} type={"email"} label={"Email"}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField error={!isPasswordValid} onChange={handlePassword} helperText={isPasswordValid?" ":passwordHelperText} variant={"outlined"} fullWidth={true} type={"password"} label={"Password"}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField error={!bothPasswordValid} onChange={e=>setRetypePassword(e.target.value)} onBlur={validatePasswords} helperText={bothPasswordValid?" ":bothPassHelperText} variant={"outlined"} fullWidth={true} type={"password"} label={"Retype the Password"}/>
                        </div>
                        <div className={"form-element-container"}>
                            <Button fullWidth={true} type={"submit"} variant={"contained"}>Sign Up</Button>
                        </div>
                        <div className={"form-element-container"}>
                            <p className={"text-center"}>Already have an account? <Button variant={"text"} onClick={()=>navigation("/login")}>Login</Button> instead</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;

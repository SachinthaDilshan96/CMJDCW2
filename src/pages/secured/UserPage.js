import "./SecCSS/UserPage.css"
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";

export const UserPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword , setRetypePassword] = useState("");

    const handleSubmit =(e)=>{
        e.preventDefault();
    }

    const fetchData = async ()=>{
        const response = await axios.get();
        if (response.status === 200){
            setFirstName(response.data.)
        }
    }
    useEffect(()=>{

    },[])
    return (
        <div className={"main-container-user container"}>
            <div className={"main-inner container"}>
                <form onSubmit={handleSubmit}>
                    <div className={"form-element-container "}>
                        <TextField  variant={"outlined"} fullWidth={true} type={"text"} label={"First Name"} disabled={false}/>
                    </div>
                    <div className={"form-element-container"}>
                        <TextField  variant={"outlined"} fullWidth={true} type={"text"} label={"Last Name"} disabled={false}/>
                    </div>
                    <div className={"form-element-container"}>
                        <TextField  variant={"outlined"} fullWidth={true} type={"text"} label={"Email"} disabled={true}/>
                    </div>
                    <div className={"form-element-container"}>
                        <TextField  variant={"outlined"} fullWidth={true} type={"text"} label={"Password"} disabled={false}/>
                    </div>
                    <div className={"form-element-container"}>
                        <TextField  variant={"outlined"} fullWidth={true} type={"text"} label={"Retype Password"} disabled={false}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserPage;

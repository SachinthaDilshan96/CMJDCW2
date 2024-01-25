import "./CSS/AddCategory.css";
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';

export const AddCategory = () => {
    const [categoryId, setCategoryId] =  useState(0);
    const [categoryName, setCategoryName] = useState("");
    const getCategoryId = async ()=>{
       const response = await axios.get("http://localhost:8080/category/getLastID");
       if (response.status === 200){
           setCategoryId(response.data);
       }
    }

    const saveCategory = async (e)=>{
        e.preventDefault();
        const data = {
            "categoryName":categoryName
        }
        const response = await axios.post("http://localhost:8080/category/addCategory",data);
        if (response.status == 200){

        }
    }
    useEffect(()=>{
        getCategoryId();
    },);
    return (
        <div className={"main-container-add-category"}>
            <h1 className={"modal-header"}>Add a Category</h1>
            <form onSubmit={saveCategory}>
                <div className={"form-element-container"}>
                    <TextField value={categoryId} variant={"outlined"} fullWidth={true} type={"text"} label={"Category ID"} disabled={true}/>
                </div>
                <div className={"form-element-container"}>
                    <TextField variant={"outlined"} fullWidth={true} type={"text"} label={"Category Name"}  onChange={e=>setCategoryName(e.target.value)}/>
                </div>
                <div className={"form-element-container"}>
                    <Button  fullWidth={true} type={"submit"} variant={"contained"}>Add Category</Button>
                </div>
            </form>
        </div>
    )
}

export default AddCategory;

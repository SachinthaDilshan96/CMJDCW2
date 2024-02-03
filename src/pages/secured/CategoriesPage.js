import "./SecCSS/CategoriesPage.css"
import {Grid, Snackbar, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import ViewCategories from "./components/ViewCategories";
import Modal from "@mui/material/Modal";
import {Alert} from "@mui/material";

export const CategoriesPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryId, setCategoryId] =  useState(0);
    const [categoryName, setCategoryName] = useState("");
    const [addedBy , setAddedBy] = useState("");
    const [saveSuccess, setSaveSuccess] = useState(false);

    const getAddedBy =()=>{
        const jwt = localStorage.getItem("cmjd_pos_token");
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        setAddedBy(JSON.parse(window.atob(base64)).sub.split("@")[0])
    }
    const handleClose =()=>{
        setIsOpen(!isOpen);

    }
    const getCategoryId = async ()=>{
        const response = await axios.get("http://localhost:8080/category/getLastID");
        if (response.status === 200){
            setCategoryId(response.data);
        }
    }
    const handleClick = ()=>{
        setIsOpen(true);
    }
    const saveCategory = async (e)=>{
        e.preventDefault();
        const data = {
            "addedBy":addedBy,
            "categoryName":categoryName,
        }
        const response = await axios.post("http://localhost:8080/category/addCategory",data);
        if (response.status == 200){
            setSaveSuccess(true);
            handleClose();
        }
    }
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSaveSuccess(false);
    };

    useEffect(()=>{
        getCategoryId();
        getAddedBy();
    },[]);

    return (
        <div className={"main-container-category"}>
            <Grid container spacing={1} className={"grid-container"}>
                <Grid item xs={12} className={"grid-item"}>
                    <div className={"header-container"}>
                        <span className={"h2"}>Categories</span>
                        <Button variant={"contained"} onClick={handleClick} color={"success"} startIcon={<AddIcon/>}>New Category</Button>
                    </div>

                </Grid>
                <Grid item xs={10} className={"grid-item mt-4"}>
                    <ViewCategories/>
                </Grid>
            </Grid>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={"modal-inner-container"}>
                    <h2>Add New Category</h2>
                    <form onSubmit={saveCategory}>
                        <div className={"form-element-container"}>
                            <TextField value={categoryId} variant={"outlined"} fullWidth={true} type={"text"} label={"Category ID"} disabled={true}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField value={addedBy} variant={"outlined"} fullWidth={true} type={"text"} label={"Added By"} disabled={true}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField variant={"outlined"} fullWidth={true} type={"text"} label={"Category Name"}  onChange={e=>setCategoryName(e.target.value)}/>
                        </div>
                        <div className={"form-element-container button-container"}>
                            <div className={"button-container-inner"}>
                                <Button style={{backgroundColor: "#b71c1c"}} fullWidth={true} onClick={handleClose} type={"button"} variant={"contained"}>Cancel</Button>
                            </div>
                            <div className={"button-container-inner"}>
                                <Button color={"success"} fullWidth={true} type={"submit"} variant={"contained"}>Add Category</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={saveSuccess} autoHideDuration={3000} onClose={handleSnackbarClose} >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Category Saved Successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CategoriesPage;

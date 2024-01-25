import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import axios from "axios";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import "./CSS/ViewCategories.css"
import {Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Alert} from "@mui/lab";

export const ViewCategories = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'categoryName', headerName: 'Name', width: 300, sortable: true },
        { field: 'addedBy', headerName: 'Added By', width: 300, sortable: true },
        { field: 'addedOn', headerName: 'Added On', type: 'date',valueGetter: (params) => {
            const date = new Date(params.row.addedOn);
            return date;
            }, width: 200, sortable: true},
    ];

    const [categories, setCategories] = useState([]);
    const [error , setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [catId,setCatID] = useState(0);
    const [category, setCategory] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [categoryName , setCategoryName] = useState("");

    const fetchCategories = async ()=>{
        const response = await axios.get("http://localhost:8080/category/getAllCategories");
        if (response.status === 200){
            setCategories(response.data);
        }
    }

    const handleClick = (e)=>{
        setCatID(e.id);
        fetchCategory();
        setIsOpen(true);
    }

    const handleClose =()=>{
        setIsOpen(!isOpen);

    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setUpdateSuccess(false);
    };

    const handleUpdateProduct = async (e)=>{
        e.preventDefault();
        const data = {
            "categoryName":categoryName
        };
        const response = await axios.put("http://localhost:8080/category/update/"+catId,data);
        if (response.status === 200){
            handleClose();
            fetchCategories();
            setUpdateSuccess(true);
        }

    }
    const fetchCategory =async ()=>{
        const response =await axios.get("http://localhost:8080/category/"+catId);
        if (response.status  === 200){
            setCategory(response.data);
            setCategoryName(response.data.categoryName);
        }else{
            setCategory(null);
        }
    }
    useEffect(()=>{
        fetchCategories();
    },[])
    return (
        <div className={"modal-container"}>
            <DataGrid
                onRowClick={handleClick}
                autoHeight={true}
                rows={categories}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={"modal-inner-container"}>
                    <h2>Update Category</h2>
                    <form onSubmit={handleUpdateProduct}>
                        <div className={"form-element-container"}>
                            <TextField value={category?category.id:0} variant={"outlined"} fullWidth={true} type={"text"} label={"Category ID"} disabled={true}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField value={categoryName} onChange={e=>setCategoryName(e.target.value)}  variant={"outlined"} fullWidth={true} type={"text"} label={"Category Name"} />
                        </div>
                        <div className={"form-element-container"}>
                            <TextField value={category?category.addedBy:""} onChange={e=>setCategoryName(e.target.value)} variant={"outlined"} fullWidth={true} type={"text"} label={"Added By"} disabled={true}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField value={category?new Date(category.addedOn).toLocaleDateString():0} variant={"outlined"} fullWidth={true} type={"text"} label={"Added On"} disabled={true}/>
                        </div>
                        <div className={"form-element-container button-container"}>
                            <div className={"button-container-inner"}>
                                <Button style={{backgroundColor: "#b71c1c"}} fullWidth={true} onClick={handleClose} type={"button"} variant={"contained"}>Cancel</Button>
                            </div>
                            <div className={"button-container-inner"}>
                                <Button color={"success"} fullWidth={true} type={"submit"} variant={"contained"}>Update Category</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={updateSuccess} autoHideDuration={3000} onClose={handleSnackbarClose} >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Category Updated Successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}
export default ViewCategories;

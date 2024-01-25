import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
export const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [categoryId, setCategoryId] = useState('');
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState([]);

    const handleCategoryChange =(e)=>{
        setCategoryId(e.target.value);
    }
    const saveProduct =async (e)=>{
        e.preventDefault();
        const data = {
            "categoryId":categoryId,
            "name":productName,
            "qty":qty,
            "unitPrice":price
        }
        const response = await axios.post("http://localhost:8080/products",data);
        if (response.status === 200){
            console.log(response)
        }else{
            console.log(response)
        }
    }
    const fetchCategories = async ()=>{
        const response = await axios.get("http://localhost:8080/category/getAllCategories");
        if (response.status === 200){
            setCategories(response.data);
        }
    }
    useEffect(() => {
       fetchCategories();
    }, []);

    return (
        <div className={"main-container-add-product"}>
            <h1>Add a Product</h1>
            <form onSubmit={saveProduct}>
                <div className={"form-element-container"}>
                    <FormControl fullWidth={true} sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={categoryId}
                            onChange={handleCategoryChange}
                            fullWidth={true}
                            label="Category"
                            required={true}
                            defaultValue={''}
                        >
                            {
                                categories && categories.map((cat)=>(
                                    <MenuItem key={cat.id} value={cat.id}>{cat.categoryName}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className={"form-element-container"}>
                    <TextField variant={"outlined"} fullWidth={true} type={"text"} label={"Product Name"}  onChange={e=>setProductName(e.target.value)}/>
                </div>
                <div className={"form-element-container"}>
                    <TextField variant={"outlined"} fullWidth={true} type={"number"} label={"Quantity"} value={qty} InputProps={{ inputProps: { min: 0} }}  onChange={e=>setQty(e.target.value)}/>
                </div>
                <div className={"form-element-container"}>
                    <TextField variant={"outlined"} fullWidth={true} type={"number"} label={"Unit Price"} value={price} InputProps={{ inputProps: { min: 0} }}  onChange={e=>setPrice(e.target.value)}/>
                </div>
                <div className={"form-element-container"}>
                    <Button  fullWidth={true} type={"submit"} variant={"contained"}>Add Product</Button>
                </div>
            </form>
        </div>
    )
}
export default AddProduct;

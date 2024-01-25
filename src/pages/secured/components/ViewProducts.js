import {useEffect, useState} from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const ViewProducts = () => {
    const [categories , setCategories] = useState([]);
    const [products , setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const fetchCategories =async ()=>{
        const response = await axios.get("http://localhost:8080/category/getAllCategories");
        if (response.status === 200){
            setCategories(response.data);
        }
    }

    const fetchProductsByCategory =async ()=>{
        const response = await axios.get("");
        if (response.status === 200){
            console.log(response)
            setProducts(response.data);
        }
    }

    useEffect(() => {
       fetchCategories();
    }, []);

    return (
        <div className={"main-container-add-product"}>
            <h1>View Products</h1>
            <div className={"form-element-container"}>
                <FormControl fullWidth={true} sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={categoryId}
                        //onChange={}
                        fullWidth={true}
                        label="Category"
                        required={true}
                        defaultValue={categories[0]}
                    >
                        {
                            categories.map((cat,index)=>(
                                <MenuItem key={index} value={cat.id}>{cat.name}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default ViewProducts;

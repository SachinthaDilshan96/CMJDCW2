import "./SecCSS/ProductsPage.css"
import {Grid, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import {Alert} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";
import SearchIcon from '@mui/icons-material/Search';
import {DataGrid} from "@mui/x-data-grid";
import dayjs from "dayjs";

export const ProductsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [categoryId, setCategoryId] = useState('');
    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(1);
    const [expireDate , setExpireDate] = useState("");
    const [categories, setCategories] = useState([]);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [errorText , setErrorText] = useState("");
    const [categoryIdForSearch ,setCategoryIdForSearch] = useState("");
    const [searchText , setSearchText] = useState("");
    const [products , setProducts] = useState([]);
    const [product , setProduct] =  useState(null);
    const [productUpdateOpen , setProductUpdateOpen] = useState(false);
    const [productID, setProductID] = useState(0);
    const [newProductName , setNewProductName] = useState("");
    const [newProductCategory , setNewProductCategory] = useState("");
    const [newUnitPrice , setNewUnitPrice] = useState(1);
    const [newQty , setNewQty] = useState(1);
    const [newExpireDate , setNewExpireDate] = useState("");
    const [expireChanges, setExpireChanges] = useState(false);

    const dateObj = new Date();
    const date = moment(dateObj, 'DD/MM/YYYY').format('DD/M/YYYY');
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 300, sortable: true },
        { field: 'qty', headerName: 'Quantity', width: 300, sortable: true },
        { field: 'unitPrice', headerName: 'Price', width: 300, sortable: true },
        { field: 'expireDate', headerName: 'Expire Date', type: 'date',valueGetter: (params) => {
                const date = new Date(params.row.expireDate);
                return date;
            }, width: 200, sortable: true},
    ];
    const handleCategoryChange =(e)=>{
        setCategoryId(e.target.value);
    }
    const searchByCategory = async (e)=>{
        setCategoryIdForSearch(e.target.value);
        loadProducts(e.target.value);

    }

    const loadProducts = async (id)=>{
        const response = await axios.get("http://localhost:8080/category/"+id+"/products");
        if (response.status === 200){
            setProducts(response.data);
        }else{
        }
    }
    const saveProduct =async (e)=>{
        e.preventDefault();
        if(expireDate<dateObj){
            setErrorText("Invalid Expire Date");
            setIsErrorOpen(true);
        }else{
            const data = {
                "categoryId":categoryId,
                "name":productName,
                "qty":qty,
                "unitPrice":price,
                "expireDate":expireDate
            }
            const response = await axios.post("http://localhost:8080/products",data);
            if (response.status === 200){
                handleClose();
                setSaveSuccess(true);
                loadProducts(0);
                fetchCategories();
                setCategoryId(0);
                setProductName("");
                setQty(1);
                setPrice(1);
            }else{
                setErrorText("Product Saving Failed. Please try again");
                setIsErrorOpen(true);
            }
        }
    }
    const handleClick = ()=>{
        setIsOpen(true);
    }
    const fetchCategories = async ()=>{
        const response = await axios.get("http://localhost:8080/category/getAllCategories");
        if (response.status === 200){
            response.data.unshift({"id":0,"categoryName":"All Categories"});
            setCategories(response.data);
        }
    }

    const handleClose =()=>{
        setIsOpen(!isOpen);
    }

    const handleErrorSnackbarClose =()=>{
        setIsErrorOpen(!isErrorOpen);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSaveSuccess(false);
    };

    const onSearch =()=>{
        if (searchText.length>0){

        }
    }

    const handleClickForProducts = (e)=>{
        setProductID(e.id);
        fetchProduct()
        setProductUpdateOpen(true);
    }
    const fetchProduct =async ()=>{
        const response = await axios.get("http://localhost:8080/products/"+productID);
        if (response.status === 200){
            setNewProductName(response.data.name);
            setNewQty(response.data.qty);
            setNewUnitPrice(response.data.unitPrice);
            setNewProductCategory(response.data.category);
            setNewExpireDate(dayjs( new Date(response.data.expireDate)));
            setProduct(response.data);
        }
    }
    const handleUpdateProduct =async (e)=>{
        e.preventDefault();
        if(expireChanges && (newExpireDate<dateObj)){
            setErrorText("Invalid Expire Date");
            setIsErrorOpen(true);
        }else{
            const data = {
                "categoryId":newProductCategory,
                "name":newProductName,
                "qty":newQty,
                "unitPrice":newUnitPrice,
                "expireDate":newExpireDate
            }
            const response = await axios.put("http://localhost:8080/products/"+newProductCategory,data);
            if (response.status === 200){
                handleCloseUpdateProduct();
                setSaveSuccess(true);
                loadProducts(0);
                fetchCategories();
            }else{
                setErrorText("Product Update Failed. Please try again");
                setIsErrorOpen(true);
            }
        }
    }

    const handleCloseUpdateProduct =()=>{
        setProductUpdateOpen(false);
    }

    const handleNewProductCategory =(e)=>{
        setNewProductCategory(e.target.value);
    }

    useEffect(() => {
        fetchCategories();
        loadProducts(0);
    }, []);
    return (
        <div className={"main-container-products"}>
            <Grid container spacing={2} className={"grid-container"}>
                <Grid item xs={10} className={"grid-item"}>
                    <div className={"header-container"}>
                        <span className={"h2"}>Products</span>
                        <Button variant={"contained"} onClick={handleClick} color={"success"} startIcon={<AddIcon/>}>New Product</Button>
                    </div>
                </Grid>
                <Grid item xs={10} className={"grid-item"}>
                    {/* Search and category filter */}
                    <div className={"search-container container"}>
                        <div className={"row"}>
                            <div className={"form-element-container col-5"}>
                                <FormControl fullWidth={true} sx={{ m: 1, minWidth: 80 }}>
                                    <TextField variant={"outlined"} fullWidth={true}  type={"text"} label={"Product Name"}  onChange={e=>setSearchText(e.target.value)}/>
                                </FormControl>
                            </div>
                            <div className={"form-element-container col-4"}>
                                <FormControl fullWidth={true} sx={{ m: 1, minWidth: 80 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={categoryIdForSearch}
                                        onChange={searchByCategory}
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
                            <div className={"form-element-container col-3"}>
                                <FormControl fullWidth={true} className={"mt-3"}>
                                    <Button variant="contained" onClick={onSearch} startIcon={<SearchIcon />}>
                                        Search
                                    </Button>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={10} className={"grid-item"}>
                    {/* Category data table */}
                    <div className={"container"}>
                        <DataGrid
                            onRowClick={handleClickForProducts}
                            autoHeight={true}
                            rows={products}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                        <Modal
                            open={productUpdateOpen}
                            onClose={handleCloseUpdateProduct}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className={"modal-inner-container-update-product"}>
                                <h2>Update Product</h2>
                                <form onSubmit={handleUpdateProduct}>
                                    <div className={"form-element-container"}>
                                        <TextField defaultValue={product?product.id:0}  variant={"outlined"} fullWidth={true} type={"text"} label={"Product ID"} disabled={true}/>
                                    </div>
                                    <div className={"form-element-container"}>
                                        <TextField  value={newProductName} onChange={e=>setNewProductName(e.target.value)}  variant={"outlined"} fullWidth={true} type={"text"} label={"Product Name"} />
                                    </div>
                                    <div className={"form-element-container"}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            value={product?product.category:0}
                                            onChange={handleNewProductCategory}
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
                                    </div>
                                    <div className={"form-element-container"}>
                                        <TextField  value={newQty} variant={"outlined"} error={newQty<1?true:false} fullWidth={true} type={"number"} label={"Quantity"} InputProps={{ inputProps: { min: 0} }}  onChange={e=>setNewQty(e.target.value)}/>
                                    </div>
                                    <div className={"form-element-container"}>
                                        <TextField  value={newUnitPrice} variant={"outlined"} error={newUnitPrice<1?true:false} fullWidth={true} type={"number"} label={"Unit Price"}  InputProps={{ inputProps: { min: 0} }}  onChange={e=>setNewUnitPrice(e.target.value)}/>
                                    </div>
                                    <div className={"form-element-container"}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']} >
                                                <DatePicker label="Expire Date" defaultValue={expireDate} minDate={date}  onChange={e=> {
                                                    setExpireChanges(true)
                                                    setNewExpireDate(e.$d)
                                                }}/>
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className={"form-element-container button-container"}>
                                        <div className={"button-container-inner"}>
                                            <Button style={{backgroundColor: "#b71c1c"}} fullWidth={true} onClick={handleCloseUpdateProduct} type={"button"} variant={"contained"}>Cancel</Button>
                                        </div>
                                        <div className={"button-container-inner"}>
                                            <Button color={"success"} fullWidth={true} type={"submit"} variant={"contained"}>Update Category</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </div>
                </Grid>
            </Grid>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={"modal-inner-container"}>
                    <h2>Add New Product</h2>
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
                            <TextField variant={"outlined"} error={qty<1?true:false} fullWidth={true} type={"number"} label={"Quantity"} value={qty} InputProps={{ inputProps: { min: 0} }}  onChange={e=>setQty(e.target.value)}/>
                        </div>
                        <div className={"form-element-container"}>
                            <TextField variant={"outlined"} error={price<1?true:false} fullWidth={true} type={"number"} label={"Unit Price"} value={price} InputProps={{ inputProps: { min: 0} }}  onChange={e=>setPrice(e.target.value)}/>
                        </div>
                        <div className={"form-element-container"}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} >
                                    <DatePicker label="Expire Date" minDate={date}  onChange={e=>setExpireDate(e.$d)}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className={"form-element-container button-container"}>
                            <div className={"button-container-inner"}>
                                <Button style={{backgroundColor: "#b71c1c"}} fullWidth={true} onClick={handleClose} type={"button"} variant={"contained"}>Cancel</Button>
                            </div>
                            <div className={"button-container-inner"}>
                                <Button color={"success"} fullWidth={true} type={"submit"} variant={"contained"}>Add Product</Button>
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
                    Product Saved Successfully!
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={isErrorOpen} autoHideDuration={3000} onClose={handleErrorSnackbarClose} >
                <Alert
                    onClose={handleErrorSnackbarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorText}
                </Alert>
            </Snackbar>
        </div>
    )
}
export default ProductsPage;

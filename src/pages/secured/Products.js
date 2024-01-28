import {Alert, CardActions, CardContent, CardMedia, Grid, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useState} from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import "./SecCSS/Products.css"
import Modal from "@mui/material/Modal";

export const Products = () => {
    const [searchText , setSearchText] = useState("");
    const [categoryIdForSearch , setCategoryIdForSearch] = useState("");
    const [categories , setCategories] = useState([]);
    const [products , setProducts] = useState([]);
    const [cart , setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [checkoutModalOpen , setCheckoutModalOpen] = useState(false);
    const [saveSuccess , setSaveSuccess] = useState(false);
    const [errorText , setErrorText] = useState("");
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const searchByCategory = async (e)=>{
        setCategoryIdForSearch(e.target.value);
        loadProducts(e.target.value);

    }
    const onSearch =()=>{
        if (searchText.length>0){

        }
    }
    const fetchCategories = async ()=>{
        const response = await axios.get("http://localhost:8080/category/getAllCategories");
        if (response.status === 200){
            response.data.unshift({"id":0,"categoryName":"All Categories"});
            setCategories(response.data);
        }
    }
    const placeOrder =async ()=>{
        const productIds = [];
        cart.map((item)=>productIds.push(item.id));
        const data ={
            "products":productIds
        }
        const response = await axios.post("http://localhost:8080/orders",data);
        if (response.status === 200){
            handleCheckoutModalClose();
            setSaveSuccess(true);
            setCart([]);
            setTotal(0)
        }else{
            setErrorText("An Error Occured");
            setIsErrorOpen(true);
            setSaveSuccess(false)
        }
    }
    const loadProducts = async (id)=>{
        const response = await axios.get("http://localhost:8080/category/"+id+"/products");
        if (response.status === 200){
            setProducts(response.data);
        }else{
        }
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSaveSuccess(false);
    };

    const handleErrorSnackbarClose =()=>{
        setIsErrorOpen(!isErrorOpen);
    }

    const handleCheckout =()=>{
        setCheckoutModalOpen(true);
    }
    const handleCheckoutModalClose =()=>{
        setCheckoutModalOpen(false);
    }

    useEffect(() => {
        fetchCategories();
        loadProducts(0);
    }, []);

    return (
        <div className={"main-container-category"}>
            <Grid container spacing={1} className={"grid-container"}>
                <Grid item xs={12} className={"grid-item"}>
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
                <Grid item xs={12} className={"grid-item container"}>
                    <div className={"products-inner row"}>
                        <div className={"products-container-left col-sm-9"}>
                            <Grid  container>
                                {
                                    products && products.map((product,index)=>(
                                        <Grid key={index} className={"m-1"} item sm={4}>
                                            <Card  variant={"outlined"} sx={{ maxWidth: 345 }}>
                                                <CardMedia
                                                    component="img"
                                                    alt="green iguana"
                                                    height="50px"
                                                    width="50px"
                                                    image="https://ww2.kqed.org/app/uploads/sites/38/2016/03/milk-435295-1920x1280.png"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {product.name}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" onClick={e=> {
                                                        setCart([product, ...cart])
                                                        setTotal(total+product.unitPrice)
                                                    }} fullWidth={true} variant={"contained"}>Add To Cart</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>

                                    ))
                                }
                            </Grid>

                        </div>
                        <div className={"checkout-container-right col-sm-3"}>
                            <h2>Your Cart</h2>
                            <div className={"cart-container"}>
                                {
                                   cart && cart.map((item,index)=>(
                                       <p className={"m-2"} key={index}>{item.name} - {item.unitPrice}</p>
                                    ))
                                }
                            </div>
                            <p><b>Total : </b>{total}</p>
                            <Button variant={"contained"} onClick={handleCheckout} fullWidth={true}>Checkout</Button>
                        </div>
                    </div>
                    <Modal
                        open={checkoutModalOpen}
                        onClose={handleCheckoutModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <div className={"modal-inner-container-update-product"}>
                            <h2 className={"text-center"}>Your Cart</h2>
                            <div className={"cart-container"}>
                                {
                                    cart && cart.map((item,index)=>(
                                        <p className={"m-2"}>{item.name} - {item.unitPrice}</p>
                                    ))
                                }
                            </div>
                            <p className={"m-4"}><b>Total : </b>{total}</p>
                            <div className={"form-element-container button-container"}>
                                <div className={"button-container-inner"}>
                                    <Button style={{backgroundColor: "#b71c1c"}} fullWidth={true} onClick={handleCheckoutModalClose} type={"button"} variant={"contained"}>Cancel</Button>
                                </div>
                                <div className={"button-container-inner"}>
                                    <Button color={"success"} fullWidth={true} onClick={placeOrder}  variant={"contained"}>Confirm Order</Button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </Grid>
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={saveSuccess} autoHideDuration={3000} onClose={handleSnackbarClose} >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Order Placed Successfully!
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
            </Grid>
        </div>
    )
}
export default Products;

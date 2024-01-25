import "./SecCSS/ProductsPage.css"
import {Grid} from "@mui/material";
import AddProduct from "./components/AddProduct";
import ViewProducts from "./components/ViewProducts";
export const ProductsPage = () => {
    return (
        <div className={"main-container-products"}>
            <Grid container spacing={2} className={"grid-container"}>
                <Grid item xs={10} className={"grid-item"}>
                    <AddProduct/>
                </Grid>
                <Grid item xs={10} className={"grid-item"}>

                </Grid>
            </Grid>
        </div>
    )
}
export default ProductsPage;

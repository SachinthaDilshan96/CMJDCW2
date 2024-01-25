import "./SecCSS/CategoriesPage.css"
import {Grid} from "@mui/material";
import AddCategory from "./components/AddCategory";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import ViewCategories from "./components/ViewCategories";

export const CategoriesPage = () => {

    return (
        <div className={"main-container-category"}>
            <Grid container spacing={1} className={"grid-container"}>
                <Grid item xs={12} className={"grid-item"}>
                    <div className={"header-container"}>
                        <span className={"h2"}>Categories</span>
                        <Button variant={"contained"} color={"success"} startIcon={<AddIcon/>}>New Category</Button>
                    </div>

                </Grid>
                <Grid item xs={10} >
                    <ViewCategories/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CategoriesPage;

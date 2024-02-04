import "./secured/SecCSS/DashboardPage.css"
import {NavLink, Outlet} from "react-router-dom";
import SideDrawer from "./components/SideDrawer";
import {Grid} from "@mui/material";
import Footer from "./components/Footer";

const DashboardPage =()=>{
    return(
        <div style={{display:'flex'}}>
            <Grid container spacing={0}>
                <Grid item xs={1} sm={2} >
                    <SideDrawer/>
                </Grid>
                <Grid style={{height:'100vh'}} item xs={11} sm={10}>
                    <Outlet/>
                </Grid>
            </Grid>
        </div>
    )
}

export default DashboardPage;

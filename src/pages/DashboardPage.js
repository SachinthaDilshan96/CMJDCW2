import "./secured/SecCSS/DashboardPage.css"
import {NavLink, Outlet} from "react-router-dom";
import SideDrawer from "./components/SideDrawer";
import {Grid} from "@mui/material";

const DashboardPage =()=>{
    return(
        <div className={"main-container-dashboard"}>
            <Grid container>
                <Grid item xs={1} sm={2}>
                    <SideDrawer/>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <Outlet/>
                </Grid>
            </Grid>
        </div>
    )
}

export default DashboardPage;

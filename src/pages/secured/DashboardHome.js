import {Grid} from "@mui/material";
import "./SecCSS/DashboardHome.css"
import {useEffect, useState} from "react";
import axios from "axios";
import QuantityPlot from "./components/QuantityPlot";
import SalesPlot from "./components/SalesPlot";
export const DashboardHome = () => {
    const [stats, setStats] = useState([]);
    const fetchStats =async ()=>{
        const data = {
            "currentDate":new Date().toJSON().toString()
        }
        const response =await axios.post("http://localhost:8080/stats",data);
        if (response.status === 200){
            setStats(response.data);
        }
    }
    useEffect(()=>{
        fetchStats();
    },[])
    return (
        <div className={"main-container-dashboard-home"}>
            <div className={"summary-container"}>
                <Grid container>
                    <Grid item xs={3}><div className={"summary-element"} style={{backgroundColor:'#036ffc'}}>Last Day Sales: {stats && stats.lastDayTotalSales} $</div></Grid>
                    <Grid item xs={3}><div className={"summary-element"} style={{backgroundColor:'orange'}}>Last Day Order Count: {stats && stats.lastDayOrderCount}</div></Grid>
                    <Grid item xs={3}><div className={"summary-element"} style={{backgroundColor:'green'}}>Total Products: {stats && stats.totalProducts}<br/>Low Stocks: {stats && stats.totalLowStocks}</div></Grid>
                    <Grid item xs={3}><div className={"summary-element"} style={{backgroundColor:'red'}}>Today Expires : {stats && stats.todayExpires}</div></Grid>
                </Grid>
            </div>
            <div className={"chart-container"}>
                <Grid container>
                    <Grid item sm={12}>
                        <QuantityPlot/>
                    </Grid>
                    <Grid item sm={12}>
                        <SalesPlot/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default DashboardHome;

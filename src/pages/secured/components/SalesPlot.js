import {useEffect, useState} from "react";
import axios from "axios";
import {LineChart} from "@mui/x-charts";

export const SalesPlot = () => {
    const [salesData , setSalesData] = useState([0]);
    const [dateData , setDateData] = useState([0]);
    const fetchData = async ()=>{
        const data = {
            "currentDate":new Date().toJSON().toString()
        }
        const response = await axios.post("http://localhost:8080/orders/sevenDays",data);
        if (response.status === 200){
             let sales = [];
             let dates = [];
             response.data.map((item)=>{
                 sales.push(item.sales);
                 const date = new Date(item.date);
                 dates.push(new Date(date.getFullYear(),date.getMonth(),date.getDate()))
             })
             setDateData(dates);
             setSalesData(sales);
        }

    }
    useEffect(()=>{
        fetchData();
    },[])
    return (
        <div style={{width:"100%",height:"100%"}}>
            <h2>Total Daily Sales for Last week</h2>
            <LineChart
                xAxis={[{ data: dateData,scaleType:'time' }]}
                series={[
                    {
                        data: salesData,
                    },
                ]}
                height={300}
            />
        </div>
    )
}
export default SalesPlot;

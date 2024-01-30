import { BarChart } from '@mui/x-charts/BarChart';
import {useEffect, useState} from "react";
import axios from "axios";

const QuantityPlot =()=>{
    const [initQty , setInitQty] = useState([0]);
    const [qty , setQty] = useState([0]);
    const [labels , setLabels] = useState([0]);
    const fetchData = async ()=>{
        const response = await axios.get("http://localhost:8080/products");
        if (response.status === 200){
             let initQtyArr = [];
             let qtyArr = [];
             let labelsArr = [];
            response.data.map((item)=>{
                 initQtyArr.push(item.initialQty);
                 qtyArr.push(item.qty);
                 labelsArr.push(item.name);
            })
            setInitQty(initQtyArr);
             setQty(qtyArr);
             setLabels(labelsArr);
        }

    }
    useEffect(()=>{
        fetchData();
    },[])
    return(
        <div style={{width:"100%",height:"100%"}}>
            <h2>Product Quantities</h2>
            <BarChart title={"Quantities"}
                height={400}
                series={[
                    {data: initQty, label: 'initialQty', id: 'Initial Qty'},
                    {data: qty, label: 'qty', id: 'Current Qty'},
                ]}
                xAxis={[{data: labels, scaleType: 'band'}]}
            />
        </div>
    )
}

export default QuantityPlot;

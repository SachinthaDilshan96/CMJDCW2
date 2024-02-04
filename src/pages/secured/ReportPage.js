import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";
import {useEffect, useState} from "react";
import axios from "axios";
import {Table} from "@mui/material";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        color: "black",
    },
    section: {
        margin: '10px',
        padding: '10px',
    },
    viewer: {
        width: '90%',
        height: window.innerHeight,
    },
    mainContainer:{
        marginTop:'100px'
    },
    mainHeder:{
        textAlign:'center'
    },
    subHeader:{
        textDecoration:"underline",
        marginBottom:'15px',
        marginTop:'15px'
    },
    date:{
        textAlign:'center',
        fontSize:'10px'
    }
});
const ReportPage = () => {
    const [generatedDate, setGeneratedDate] = useState('');
    const [productData , setProductData] = useState([]);
    const [salesData , setSalesData] = useState([]);

    const fetchData = async ()=>{
        setGeneratedDate(new Date().toDateString());
        const response = await axios.get("http://localhost:8080/products");
        if (response.status === 200){
            setProductData(response.data);
        }
    }
    const fetchSalesData = async ()=>{
        const data = {
            "currentDate":new Date().toJSON().toString()
        }
        const response = await axios.post("http://localhost:8080/orders/sevenDays",data);
        if (response.status === 200){
            setSalesData(response.data)
        }
    }
    useEffect(()=>{
        fetchData();
        fetchSalesData();
    },[])

    return (
        <div style={styles.mainContainer}>
            <PDFViewer style={styles.viewer}>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text style={styles.mainHeder}>CMJD-POS Full Report</Text>
                            <Text style={styles.date}>Generated On : {generatedDate}</Text>
                            <View>
                                <Text style={styles.subHeader}>Inventory Section</Text>
                                {
                                   productData && productData.map((product,index)=>(
                                       <Text>{product.name} - {product.qty}</Text>
                                    ))
                                }
                            </View>
                            <View>
                                <Text style={styles.subHeader}>Sales Section - Sales For Last 7 days</Text>
                                {
                                    salesData && salesData.map((item,index)=>(
                                        <Text>{new Date(item.date).toDateString()} - {item.sales} Rs</Text>
                                    ))
                                }
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    )
}
export default ReportPage;

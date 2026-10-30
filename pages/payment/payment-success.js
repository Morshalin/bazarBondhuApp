import {useEffect, useState} from "react";
import router from 'next/router';

const PaymentSuccess = () => {

    const [message, setMessage] = useState(null);

    useEffect(() => {

        function getCookie(cookieName) {
            let cookies = document.cookie;

            let tokenData = cookies
                ? cookies.split("; ").find((row) => row.startsWith(cookieName))
                : "";

            return tokenData ? decodeURIComponent(tokenData.split("=")[1]) : "";
        }

        let decodeMessage = getCookie('payment_conformation');
        if(!decodeMessage){
            router.replace('/');
        }
        
        decodeMessage && (decodeMessage = JSON.parse(decodeMessage));

        let clearWindowTimeout = window.setTimeout(function() {
            router.replace(`/user/order-info/${decodeMessage.data.sale_id}`);
        }, 5000);
        document.cookie = "payment_conformation=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
        setMessage(decodeMessage.message);

        return ()=>{
            clearTimeout(clearWindowTimeout);
        }

    },[])

    return (
        <>
            <div style={{display: "flex", alignItems: "center", height: "100vh",}}>
                <div style={{width: "100%", textAlign: "center"}}>
                    <img src="/processing-loder/loader.gif"/>
                    <h1>Thank You</h1>
                    <h3>{message}</h3>
                    <p> System will redirect you to order list, within 5 seconds..</p>
                    <br/>
                    <br/>
                </div>
            </div>
        </>
    );
}

export default PaymentSuccess;
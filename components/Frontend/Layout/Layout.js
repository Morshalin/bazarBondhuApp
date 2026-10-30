import axios from "axios";
import React, { useEffect, useState } from "react";
import uuid from 'react-uuid';
import Storage from "../../../Helpers/Auth/Storage";
import Cart from "../Cart/Cart";
import CartNav from "../Cart/CartNav";
import Footer from "../Footer/Footer";
import TopBar from "../Header/TopBar";
// import OtpLoginModal from "../Modals/OtpLoginModal";
import LoginModal from "../Modals/LoginModal";
import LeftSideBar from "../Sidebar/LeftSideBar";

const Layout = (props) => {


    useEffect(() => {
        if (!localStorage.getItem('user_session')) {
            localStorage.setItem('user_session', userSession());
        }
        axios.defaults.headers.Authorization = `Bearer ${Storage.getToken()}`;

    }, []);


    const userSession = () => {

        return uuid();
    }


    const [toggleButton, setToggleButton] = useState(false)

    const toggleChange = () => {
        setToggleButton(!toggleButton);
    }

    return (
        <>
            <div className="wrapper">
                <TopBar toggleButton={toggleButton} toggleChange={toggleChange}/>
                <LeftSideBar toggleChange={toggleButton}/>

                <div id="content" className={toggleButton ? 'active' : ''}>

                    {props.children}

                    <Footer></Footer>

                    {/* //For add to cart */}
                    <Cart/>

                    <CartNav/>

                </div>

            </div>


            <LoginModal/>

        </>
    )
}

export default Layout;
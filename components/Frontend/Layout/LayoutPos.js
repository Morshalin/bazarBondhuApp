import {ChevronUp} from "react-feather";
import React from "react";
import Footer from "../Footer/Footer";
import TopBar from "../Header/TopBar";
import Content from "../Container/Content";

const LayoutPos = (props) => {
    React.useEffect(() => {
        document.getElementById('scriprts').innerHTML = '';

        var script = document.createElement('script');
        script.src = '/js/sidebar-menu.js';
        script.type = 'text/javascript';
        document.getElementById('scriprts').appendChild(script);

        script = document.createElement('script');
        script.src = '/js/script.js';
        script.type = 'text/javascript';
        document.getElementById('scriprts').appendChild(script);

    });

    return (
        <>
            <div className="tap-top"><ChevronUp /></div>
            <div className="page-wrapper horizontal-wrapper" id="pageWrapper">
                <TopBar />
                <div className="page-body-wrapper horizontal-menu">
                    <Content showbreadcrumb={false}>
                        {props.children}
                    </Content>
                    <Footer />
                </div>
            </div>

        </>
    )
}

export default LayoutPos;

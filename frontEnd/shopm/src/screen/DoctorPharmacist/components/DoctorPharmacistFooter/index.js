import React from "react";
import './styles.css';

import QRCode from "react-qr-code";

const DoctorPharmacistFooter = () => {
    return (
        <div className="DoctorPharmacistFooter">
            <div className="DoctorPharmacistFooter-main">
                <div className="DoctorPharmacistFooter-child">
                    <h4>ABOUT</h4>
                    <span>Recomment</span>
                    <span>Policy</span>
                    <span>Security</span>
                    <span>Address</span>
                    <span>Major</span>
                    <span>Hotline: 1800 8198</span>
                    <span>Email: thuoc@gmail.com</span>
                    <span>Web: <a href="thuoc.vn">thuoc.vn</a></span>
                </div>
                <div className="DoctorPharmacistFooter-child">
                    <h4>CUSTOMER</h4>
                    <span>Book to examine </span>
                    <span>Benefits</span>
                    <span>Consultant Online</span>
                    <span>Intruction</span>
                </div>
                <div className="DoctorPharmacistFooter-child">
                    <h4>PAY</h4>
                    <img src="https://tse3.mm.bing.net/th?id=OIP.wPL-XiEFwGuvJNGJXONDVgHaDW&pid=Api&P=0&h=180" alt=""/>
                    <img src="https://tse3.mm.bing.net/th?id=OIP.wPL-XiEFwGuvJNGJXONDVgHaDW&pid=Api&P=0&h=180" alt=""/>
                    <img src="https://tse3.mm.bing.net/th?id=OIP.wPL-XiEFwGuvJNGJXONDVgHaDW&pid=Api&P=0&h=180" alt=""/>
                    <img src="https://tse3.mm.bing.net/th?id=OIP.wPL-XiEFwGuvJNGJXONDVgHaDW&pid=Api&P=0&h=180" alt=""/>
                </div>
                <div className="DoctorPharmacistFooter-child">
                    <h4>APP</h4>
                    <QRCode 
                        className="ProviderFooter-qr"
                        size={256}
                        value='laduchai'
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>
        </div>
    )
}

export default DoctorPharmacistFooter;
import React from "react";
import './styles.css';

const CaseRecordInfor = () => {
    return (
        <div className="CaseRecordInfor">
            <h2>Case-Record ( 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d )</h2>
            <div className="CaseRecordInfor-title"><strong>Title</strong></div>
            <div className="CaseRecordInfor-totalInfor">
                <div>
                    <div>Cost Total</div>
                    <div>234-234-234-235-234 $</div>
                </div>
                <div>
                    <div>Page Total</div>
                    <div>324234</div>
                </div>
                <div>
                    <div>Status</div>
                    <div>Status</div>
                </div>
            </div>
            <div className="CaseRecordInfor-patientInfor">
                <div className="CaseRecordInfor-patientInfor-header">Patient Information</div>
                <div className="CaseRecordInfor-patientInfor-content">
                    <div><strong>Name:</strong> La Duc Hai</div>
                    <div><strong>Age:</strong> 28</div>
                    <div><strong>Sex:</strong> male</div>
                    <div><strong>Phone:</strong> 0789860854</div>
                    <div><strong>Address:</strong> Ho Seu, Hoang Hoa Tham, Chi Linh, Hai Duong, Viet Nam</div>
                    <div><strong>Profile Shopm:</strong> <a href="asfasf">Profile Shopm</a></div>
                </div>
            </div>
            <div className="CaseRecordInfor-doctorPharmacistInfor">
                <div className="CaseRecordInfor-doctorPharmacistInfor-header">Doctor or Pharmacist Information</div>
                <div className="CaseRecordInfor-doctorPharmacistInfor-content">
                    <div><strong>Name:</strong> La Duc Hai</div>
                    <div><strong>Age:</strong> 28</div>
                    <div><strong>Sex:</strong> male</div>
                    <div><strong>Doctor or Pharmacist:</strong> Doctor</div>
                    <div><strong>Major:</strong> tooth</div>
                    <div><strong>Graduated in:</strong> Ha Noi medical University</div>
                    <div><strong>Phone:</strong> 0789860854</div>
                    <div><strong>Address:</strong> Ho Seu, Hoang Hoa Tham, Chi Linh, Hai Duong, Viet Nam</div>
                    <div><strong>Profile Shopm:</strong> <a href="asfasf">Profile Shopm</a></div>
                </div>
            </div>
        </div>
    )
}

export default CaseRecordInfor;
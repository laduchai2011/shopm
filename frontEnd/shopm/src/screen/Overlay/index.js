import './styles.css';

import OverlayMenu from './components/OverlayMenu';
import OverlayMedicine from './components/OverlayMedicine';
import OverlayDoctorPharmacist from './components/OverlayDoctorPharmacist';


const Overlay = () => {

    const handleOff = (e) => {
        const overlay_menu = document.querySelector(".OverlayMenu");
        const overlayMedicine = document.querySelector('.OverlayMedicine');
        const overlayDoctorPharmacist = document.querySelector('.OverlayDoctorPharmacist');
        if (e.target === e.currentTarget) {
            overlay_menu.classList.remove('show');
            overlayMedicine.classList.remove('show');
            overlayDoctorPharmacist.classList.remove('show');
            e.target.classList.remove('show');
        }
    }
    return (
        <div className='Overlay' onClick={(e) => handleOff(e)}>
            <OverlayMenu />
            <OverlayMedicine />
            <OverlayDoctorPharmacist />
        </div>
    )
}

export default Overlay;
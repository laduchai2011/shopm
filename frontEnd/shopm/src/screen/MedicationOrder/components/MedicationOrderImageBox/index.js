import React, { memo } from 'react';

import { $ } from 'utilize/Tricks';

const MedicationOrderImageBox = ({ data, setToastImage }) => {

    const handleViewImage = (image) => {
        setToastImage(image);
        $('.MedicationOrderImage').classList.add('active');
    }

    return (
        <div className='MedicationOrder-Image-list-imageBox'>
            <img src={data} alt=''/>
            <div className='MedicationOrder-Image-list-imageBox-overlay'><strong onClick={() => handleViewImage(data)}>View</strong></div>
        </div>
    )
}

export default memo(MedicationOrderImageBox);
import React, { memo } from 'react';

import { $ } from 'utilize/Tricks';

const MedicationOrderImageBox = ({ data, setToastImage }) => {

    const handleViewImage = (image) => {
        setToastImage(image);
        $('.MedicationOrderImage').classList.add('active');
    }

    return (
        <div className='MedicationOrder-Image-list-imageBox'>
            <img src={ data?.image } alt=''/>
            <div className='MedicationOrder-Image-list-imageBox-overlay'><strong onClick={() => handleViewImage(data?.image)}>View</strong></div>
        </div>
    )
}

export default memo(MedicationOrderImageBox);
import React from "react";
import './styles.css';

import { useNavigate, useParams } from "react-router-dom";

import { AiFillSetting } from 'react-icons/ai';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import { $, $$ } from "utilize/Tricks";

const ManageMedicationTableTop = ({changeTop, setChangeTop, changeBottom}) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleShowOptions = () => {
        const q_options = $('.ManageMedicationTableTop-left-options');
        const q_icons = $$('.ManageMedicationTableTop-left-options-icon');
        q_options.classList.toggle('show');
        if (q_options.classList.contains('show')) {
            q_icons[0].classList.remove('active');
            q_icons[1].classList.add('active');
        } else {
            q_icons[0].classList.add('active');
            q_icons[1].classList.remove('active');
        }
    }

    const handleBefore = () => {
        const copy_pageIndex = changeTop.pageIndex;
        if (copy_pageIndex > 1) {
            setChangeTop({...changeTop, pageIndex: copy_pageIndex - 1})
        }
    }

    const handleAfter = () => {
        const copy_pageIndex = changeTop.pageIndex;
        if (copy_pageIndex < changeBottom.pageNumber) {
            setChangeTop({...changeTop, pageIndex: copy_pageIndex + 1})
        }
    }

    return (
        <div className="ManageMedicationTableTop">
            <div className="ManageMedicationTableTop-left">
                <button title="Add medication" onClick={() => navigate(`/provider/${ id }/addMedication`)}>+ Add</button>
                <button onClick={() => handleBefore()}>Before</button>
                <span>{changeTop.pageIndex}/{changeBottom.pageNumber}</span>
                <button onClick={() => handleAfter()}>After</button>
                <div className="ManageMedicationTableTop-left-optionsContainer">
                    <div className="ManageMedicationTableTop-left-btn" onClick={() => handleShowOptions()}>
                        <span>All</span>
                        <TiArrowSortedDown className="ManageMedicationTableTop-left-options-icon active" />
                        <TiArrowSortedUp className="ManageMedicationTableTop-left-options-icon" />
                    </div>
                    <div className="ManageMedicationTableTop-left-options">
                        <div>All</div>
                        <div>Selling</div>
                        <div>Stopped</div>
                        <div>Delete</div>
                    </div>
                </div>
            </div>
            <div className="ManageMedicationTableTop-right">
                <button>Export</button>
                <AiFillSetting size={23} color="gray"/>
            </div>
        </div>
    )
}

export default ManageMedicationTableTop;
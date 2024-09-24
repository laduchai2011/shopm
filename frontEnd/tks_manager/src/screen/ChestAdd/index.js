import React, { useContext } from "react";
import './styles.css';

import { ThemeContextApp } from "utilize/ContextApp";

const ChestAdd = () => {
    const { loginInfor } = useContext(ThemeContextApp);

    return (
        loginInfor!==null && <div className='Chest'>
            Chest
        </div>
    )
}

export default ChestAdd;
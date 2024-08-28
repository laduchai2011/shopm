import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

const ChestManager = () => {
    const navigate = useNavigate();
    return (
        <div className="ChestManager">
            <div className="ChestManager-center">
                <h4>Chest Manager</h4>
                <div className="ChestManager-top">
                    <div>
                        <i>All Chest Group: 100</i>
                    </div>
                    <div>
                        <button onClick={() => navigate('/chestGroupCreate')}>Create a chest Group</button>
                    </div>
                    <div>
                        <button onClick={() => navigate('/chestGroupCustom')}>Custom a chest Group</button>
                    </div>
                </div>
                <div className="ChestManager-select">
                    <label htmlFor="chestGroups">Information for chest group:</label>
                    <select name="chestGroups" id="chestGroups">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="ChestManager-infor">
                    <div>
                        <div>Name:</div>
                        <div>Name</div>
                    </div>
                    <div>
                        <div>Title:</div>
                        <div>Title</div>
                    </div>
                    <div>
                        <div>Address:</div>
                        <div>Address</div>
                    </div>
                    <div>
                        <div>Status:</div>
                        <div>Status</div>
                    </div>
                    <div>
                        <div>Create by:</div>
                        <div>2343-fsdgf-43543-fdgfd</div>
                    </div>
                    <div>
                        <div>Note:</div>
                        <pre>Note</pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChestManager;
import React, { FC, useState } from 'react';
import './styles.css';

interface TableProps {
    children: React.Component,
    message: string;
}

const Table: FC<TableProps> = ({ children, message }) => {
    const [pageIndexCluster, setPageIndexCluster] = useState(0);

    return <div className="Log-main">
        <div>
            <input type="checkbox" />
            <div>Seen</div>
        </div>
        <div>
            <input type="checkbox" />
            <div>Fixed</div>
        </div>
        <div>
            <input type="checkbox" />
            <div>Non-read</div>
        </div>
        <div>
            <input type="checkbox" />
            <div>Non-fix</div>
        </div>
    </div>;
};

export default Table;
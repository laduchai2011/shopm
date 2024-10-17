import { FC } from 'react';
import './styles.css';

import { CellProps } from 'define';

const Cell: FC<{data: CellProps}> = ({ data }) => {

    return <div className="TKS-Cell">
        { data.content }
    </div>;
};

export default Cell;
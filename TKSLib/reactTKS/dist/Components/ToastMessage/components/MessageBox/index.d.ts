import { FC } from 'react';
import './styles.css';
declare const MessageBox: FC<{
    index: number;
    type: string;
    message: string;
}>;
export default MessageBox;

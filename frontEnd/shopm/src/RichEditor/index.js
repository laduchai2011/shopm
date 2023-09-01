import React, { useState, useEffect } from "react";

import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

const RichEditor = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        console.log('RichEditor', editorState);
    }, [editorState])

    return (
        <div>
            <Editor editorState={editorState} onChange={setEditorState} />
        </div>
    )
}

export default RichEditor;
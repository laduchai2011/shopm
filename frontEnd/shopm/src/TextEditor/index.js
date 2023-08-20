import React, { useState } from "react";
import './styles.css';

// import html2pdf from 'html2pdf.js';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js';

import { 
    BiBold, 
    BiItalic, 
    BiUnderline, 
    BiStrikethrough, 
    BiAlignLeft,
    BiAlignMiddle,
    BiAlignRight,
    BiAlignJustify,
    BiListUl,
    BiListOl,
    BiLeftIndent,
    BiRightIndent,
    BiLink,
    BiUnlink,
    BiImage,
    BiVideo
} from 'react-icons/bi';

import { $ } from "utilize/Tricks";

const TextEditor = () => {
    const [fileName, setFileName] = useState('');

    const handleFormat = (cmd, value=null) => {
        if (cmd === 'insertIframe') {
            document.execCommand(
                'insertHTML', 
                false, 
                `<iframe src='${value}' allowfullscreen='true' frameborder="0" title="Iframe Example"></iframe>`
            );
        } else {
            if(value) {
                document.execCommand(cmd, false, value);
            } else {
                document.execCommand(cmd);
            }
        }
    }

    const handleFile = (value) => {
        const content = $('.TextEditor-content');
        const filename = $('.TextEditor-filename');
        if(value === 'new') {
            content.innerHTML = '';
            filename.value = 'untitled';
        } else if(value === 'txt') {
            const blob = new Blob([content.innerText])
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a');
            link.href = url;
            link.download = `${filename.value}.txt`;
            link.click();
        } else if(value === 'pdf') {
            console.log(filename.value)
            html2pdf(content).save(filename.value);
        }
    }

    return (
        <div className="TextEditor">
            <div className="TextEditor-header">
                <span className="te-formats">
                    <button onClick={() => handleFormat('bold')}><BiBold size={25} /></button>
                    <button onClick={() => handleFormat('italic')}><BiItalic size={25} /></button>
                    <button onClick={() => handleFormat('underline')}><BiUnderline size={25} /></button>
                    <button onClick={() => handleFormat('strikeThrough')}><BiStrikethrough size={25} /></button>
                </span>
                <span className="te-formats">
                    <button onClick={() => handleFormat('justifyLeft')}><BiAlignLeft size={25} /></button>
                    <button onClick={() => handleFormat('justifyCenter')}><BiAlignMiddle size={25} /></button>
                    <button onClick={() => handleFormat('justifyRight')}><BiAlignRight size={25} /></button>
                    <button onClick={() => handleFormat('justifyFull')}><BiAlignJustify size={25} /></button>
                </span>
                <span className="te-formats">
                    <button onClick={() => handleFormat('insertUnorderedList')}><BiListUl size={25} /></button>
                    <button onClick={() => handleFormat('insertOrderedList')}><BiListOl size={25} /></button>
                </span>
                <span className="te-formats">
                    <button onClick={() => handleFormat('indent')}><BiLeftIndent size={25} /></button>
                    <button onClick={() => handleFormat('outdent')}><BiRightIndent size={25} /></button>
                </span>
                <input className="TextEditor-filename" type="text" placeholder="File name" value={fileName} onChange={(e) => setFileName(e.target.value)}/>
                <select className="te-formats select" defaultValue={'0'} onChange={(e) => handleFile(e.target.value)}>
					<option value="">File</option>
					<option value="new">New file</option>
					<option value="txt">Save as txt</option>
					<option value="pdf">Save as pdf</option>
				</select>
                <select className="te-formats select" defaultValue={'0'} onChange={(e) => handleFormat('fontSize', e.target.value)}>
					<option value="0">Font size</option>
					<option value="1">Extra small</option>
					<option value="2">Small</option>
					<option value="3">Regular</option>
					<option value="4">Medium</option>
					<option value="5">Large</option>
					<option value="6">Extra Large</option>
					<option value="7">Big</option>
				</select>
                <select className="te-formats select" defaultValue={'0'} onChange={(e) => handleFormat('formatBlock', e.target.value)}>
                    <option value="0">Format</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="h5">Heading 5</option>
                    <option value="h6">Heading 6</option>
                    <option value="p">Paragraph</option>
                </select>
                <span className="te-formats">
                    <button onClick={() => handleFormat('createLink', prompt('Insert url'))}><BiLink size={25} /></button>
                    <button onClick={() => handleFormat('unlink')}><BiUnlink size={25} /></button>
                    <button onClick={() => handleFormat('insertImage', prompt('Insert url image'))}><BiImage size={25} /></button>
                    <button onClick={() => handleFormat('insertIframe', prompt('Insert url image'))}><BiVideo size={25} /></button>
                </span>
                <span className="te-formats">
					<span>Color</span>
					<input type="color" onInput={(e) => handleFormat('foreColor', e.target.value)} defaultValue={'#000000'} />
                </span>
                <span className="te-formats">
					<span>Background</span>
					<input type="color" onInput={(e) => handleFormat('hiliteColor', e.target.value)} defaultValue={'#000000'} />
                </span>
            </div>
            <div className="TextEditor-content"
                data-gramm="false"
                suppressContentEditableWarning 
                contentEditable={true} 
                spellCheck={false}  
            >
                <br/>
            </div>
        </div>
    )
}

export default TextEditor;
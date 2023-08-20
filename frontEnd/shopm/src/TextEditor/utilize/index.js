import { $ } from "utilize/Tricks";

export const TEGetContent = () => {
    const qTextEditorContent = $('.TextEditor-content');
    const contentHTML = qTextEditorContent.innerHTML;
    return contentHTML;
}

export const TESetContent = ({ content }) => {
    const qTextEditorContent = $('.TextEditor-content');
    qTextEditorContent.innerHTML = content;
}
import { $$ } from "utilize/Tricks";

export const TEGetContent = (index) => {
    const qTextEditorContent = $$('.TextEditor-content')[index];
    const contentHTML = qTextEditorContent.innerHTML;
    return contentHTML;
}

export const TESetContent = ({ content, index }) => {
    const qTextEditorContent = $$('.TextEditor-content')[index];
    qTextEditorContent.innerHTML = content;
}
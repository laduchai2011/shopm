import { $ } from "utilize/Tricks";

export const TEGetContent = () => {
    const qTextEditorContent = $('.TextEditor-content');
    const contentHTML = qTextEditorContent.innerHTML;
    return contentHTML;
}
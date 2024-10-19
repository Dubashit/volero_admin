import React, { useState, useCallback } from 'react';
import './index.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor({ body, setBody }) {
    const [editorContent, setEditorContent] = useState(body);

    const handleEditorChange = useCallback((content) => {
        setEditorContent(content);
        setBody(content);
    }, [setBody]);

    return (
        <div className="text__editor">
            <div className='subtitle'>Body</div>
            <ReactQuill className='editor' theme="snow" value={editorContent} onChange={handleEditorChange} />
        </div>
    );
}

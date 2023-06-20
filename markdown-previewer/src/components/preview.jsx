import React from 'react';
import marked from 'marked';

marked.setOptions({
    breaks: true
});

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => `<a target="_blank" href="${href}">${text}</a>`;

export const Preview = ({ text }) => (
    <div className="preview" id='preview'>
        <p className="title">Preview</p>
        <div
            id="preview"
            dangerouslySetInnerHTML={{
                __html: marked(text, { renderer: renderer })
            }}
        />
    </div>
);

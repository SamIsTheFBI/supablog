"use client"

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Interweave, Markup } from "interweave"

export default function Quill() {
  const [value, setValue] = useState('');
  const post = `<div> <span style="font-size: 18px;">Quill Rich Text Editor</span> </div> <div> <br> </div> <div>Quill is a free, <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built for the modern web. With its <a href="http://quilljs.com/docs/modules/">extensible architecture</a>and a <a href="http://quilljs.com/docs/api/">expressive API</a>you can completely customize it to fulfill your needs. Some built in features include:</div> <div>`

  return (
    <>
      <Markup content={post} />
      <h2>React Quill</h2>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </>
  )
}

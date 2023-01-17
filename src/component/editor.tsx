import { useRef, useEffect, useState } from 'react'

import { useCodeMirror } from './utils/use-codemirror'

export const Editor = () => {
    const [doc, setDoc] = useState("# Hello World")
    const [editorRef, editorView] = useCodeMirror<HTMLDivElement>({ initialDoc: doc, setDoc: setDoc })
  
    return <div ref={editorRef} className='editor-wrapper'/>
}

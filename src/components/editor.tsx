import { useEffect, useState, useContext } from 'react'
import { DocActionType } from '../context/reducers'
import { DocContext } from '../context/context'

import { useCodeMirror } from './utils/use-codemirror'

export const Editor = () => {
    const {docState, docDispatch} = useContext(DocContext)
    const [doc, setDoc] = useState(docState.content)
    const [editorRef, editorView] = useCodeMirror<HTMLDivElement>({ initialDoc: doc, setDoc: setDoc })
  
    useEffect(() => {
        docDispatch({ type: DocActionType.Update, payload: doc })
    }, [doc])

    return <div ref={editorRef} className='editor-wrapper'/>
}

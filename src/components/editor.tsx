import { useEffect, useState, useContext } from 'react'
import { DocActionType, LineElementActionType, ScrollActionType } from '../context/reducers'
import { DocContext, ScrollContext,  } from '../context/contexts'

import { useCodeMirror } from './utils/use-codemirror'
import { EditorView } from '@codemirror/view'

export const Editor = () => {
    const {docState, docDispatch} = useContext(DocContext)
    const [doc, setDoc] = useState(docState.content)
    const [editorRef, editorView] = useCodeMirror<HTMLDivElement>({ initialDoc: doc, setDoc: setDoc })

    useEffect(() => {
        docDispatch({ type: DocActionType.Update, payload: doc })
    }, [doc])

    const {editorScrollState, editorScrollDispatch, lineElementDispatch} = useContext(ScrollContext)

    useEffect(() => {
        if (editorRef.current){
            const editorScrollable = editorRef.current?.querySelector('.cm-scroller') as HTMLDivElement
            const handleOnScroll = () => {
                if (editorView) {
                    const scrollTop: number = editorScrollable.scrollTop
                    const scrollHeight: number = editorScrollable.scrollHeight - editorScrollable.clientHeight
                    const scrollPercentage: number = scrollTop / scrollHeight

                    const { from } = editorView.lineBlockAtHeight(editorScrollable.scrollTop)
                    // console.log(editorView.state.doc.lineAt(from))
                    editorScrollDispatch({type: ScrollActionType.Update, payload: {scrollPercentage: scrollPercentage, scrollTop: scrollTop}})
                    lineElementDispatch({type: LineElementActionType.Update, payload: editorView.state.doc.lineAt(from)} )
                }
             }
            editorScrollable.addEventListener('scroll', handleOnScroll);

            return () => {
                editorScrollable.removeEventListener('scroll', handleOnScroll)
            }
        }
    }, [editorView])

    return <div ref={editorRef} className='editor-wrapper'></div>
}

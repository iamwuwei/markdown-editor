import { useRef, useEffect } from 'react'

import { EditorState } from '@codemirror/state'
import { closeBrackets } from '@codemirror/autocomplete'
import { indentWithTab } from '@codemirror/commands'
import { 
    highlightActiveLine, 
    EditorView, 
    keymap, 
    highlightActiveLineGutter, 
    lineNumbers 
} from '@codemirror/view'
import { oneDark } from "@codemirror/theme-one-dark";

export const Editor = ({ defaultValue }: { defaultValue: string }) => {
    const editorParentRef = useRef<HTMLDivElement | null>(null)
    const transparentTheme = EditorView.theme({
        '&': {
            backgroundColor: 'transparent !important',
            height: '100%'
        }
    })
    useEffect(() => {
        if (editorParentRef.current === null) return
        
        const editorView = new EditorView({
            state: EditorState.create({
                doc: defaultValue,
                extensions: [
                    closeBrackets(), // 閉じ brackets 補完
                    lineNumbers(), // 行数表示
                    highlightActiveLine(), // カーソル行ハイライト
                    highlightActiveLineGutter(), // カーソル行の gutter ハイライト
                    keymap.of([indentWithTab]), // タブでインデント
                    transparentTheme,
                    oneDark,
                ],
            }),
            parent: editorParentRef.current,
      })
  
      return () => {
        editorView.destroy()
      }
    }, [editorParentRef])
  
    return <div ref={editorParentRef} className='editor'/>
}

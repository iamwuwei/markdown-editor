import React, { useRef, useEffect, useState } from 'react'

import { EditorState } from '@codemirror/state'
import { closeBrackets } from '@codemirror/autocomplete'
import { indentWithTab, defaultKeymap, historyKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import {
    syntaxHighlighting,
    HighlightStyle
} from '@codemirror/language'
import { tags } from "@lezer/highlight"
import { 
    highlightActiveLine, 
    EditorView, 
    keymap,
    highlightActiveLineGutter, 
    lineNumbers 
} from '@codemirror/view'
import { oneDark } from "@codemirror/theme-one-dark";

interface Props {
    initialDoc: string;
    setDoc: React.Dispatch<React.SetStateAction<string>>;
}

export const useCodeMirror = <T extends Element>(props: Props): [React.MutableRefObject<T | null>, EditorView?] => {
    const editorParentRef = useRef<T>(null);
    const [editorView, setEditorView] = useState<EditorView>();
    const transparentTheme = EditorView.theme({
        '&': {
            backgroundColor: 'transparent !important',
            height: '100%'
        }
    })
    const markdownHighlightingStyle = HighlightStyle.define([
        { 
            tag: tags.heading1, 
            fontSize: "2.2em", 
            fontWeight: "bold" },
        {
            tag: tags.heading2,
            fontSize: "2em",
            fontWeight: "bold",
        },
        {
            tag: tags.heading3,
            fontSize: "1.8em",
            fontWeight: "bold",
        },
        {
            tag: tags.heading4,
            fontSize: "1.6em",
            fontWeight: "bold",
        },
        {
            tag: tags.heading5,
            fontSize: "1.4em",
            fontWeight: "bold",
        },
        {
            tag: tags.heading6,
            fontSize: "1.2em",
            fontWeight: "bold",
        },
    ])
    useEffect(() => {
        if (!editorParentRef.current) return
        
        const editorInitailState = EditorState.create({
            doc: props.initialDoc,
            extensions: [
                keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]), // キー組み合わせ、タブでインデント
                closeBrackets(), // 閉じ brackets 補完
                lineNumbers(), // 行数表示
                highlightActiveLine(), // カーソル行ハイライト
                highlightActiveLineGutter(), // カーソル行の gutter ハイライト
                markdown({
                    base: markdownLanguage, // GFM支援
                }),
                transparentTheme,
                oneDark,
                syntaxHighlighting(markdownHighlightingStyle),
                EditorView.lineWrapping,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        // update doc state
                        props.setDoc(update.state.doc.toString());
                    }
                }),
            ],
        })

        const editorView = new EditorView({
            state: editorInitailState,
            parent: editorParentRef.current,
        })
        
        setEditorView(editorView)
        
        return () => {
            editorView.destroy()
        }
    }, [editorParentRef])
  
    return [editorParentRef, editorView]
}

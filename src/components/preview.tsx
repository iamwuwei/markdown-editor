import { createElement, Fragment, useContext, useEffect, useRef } from 'react'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeReact from 'rehype-react'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import "github-markdown-css/github-markdown-light.css";

import { DocContext, ScrollContext } from '../context/contexts'
let treeData: any = null;

export const Preview = () => {
  const previewerRef = useRef(null)
  const { docState } = useContext(DocContext)
  const { editorScrollState, editorScrollDispatch, lineElementState } = useContext(ScrollContext)

  useEffect(() => {
    console.log(editorScrollState)
    if (previewerRef.current) {
      const lineElementHeight: number = lineElementState.to - lineElementState.from;

      const previewerScrollable = previewerRef.current as HTMLDivElement
      previewerScrollable.scrollTop = previewerScrollable.scrollHeight * editorScrollState.scrollPercentage
    }
  }, [editorScrollState])


  const handleOnScroll = () => {
    console.log(treeData.children)
    // console.log(treeData.children.filter((value: any) => {
    //   return value.type == 'elem
    // }))
  }

  const markdown = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(() => (tree) => {
      treeData = tree; //treeData length corresponds to previewer's childNodes length
      return tree
    })
    .use(rehypeReact, {
      Fragment: Fragment,
      createElement: createElement,
    })
    .processSync(docState.content).result

  return (
    <div ref={previewerRef} className='preview-wrapper markdown-body dark' onScroll={ handleOnScroll }>{ markdown }</div>
  )
}

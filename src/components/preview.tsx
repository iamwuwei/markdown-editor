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
  const { editorScrollState, editorScrollDispatch } = useContext(ScrollContext)

  useEffect(() => {
    if (previewerRef.current) {
      const previewerScrollable = previewerRef.current as HTMLDivElement
      previewerScrollable.scrollTop = (previewerScrollable.scrollHeight - previewerScrollable.clientHeight) * editorScrollState.scrollPercentage
    }
  }, [editorScrollState])

  const markdown = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(() => (tree) => {
      treeData = tree; //treeData length corresponds to previewer's childNodes length
      console.log(tree)
      return tree
    })
    .use(rehypeReact, {
      Fragment: Fragment,
      createElement: createElement,
    })
    .processSync(docState.content).result

  return (
    <div ref={previewerRef} className='preview-wrapper markdown-body dark'>{ markdown }</div>
  )
}

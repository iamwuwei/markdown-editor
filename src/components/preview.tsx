import { createElement, Fragment, useContext } from 'react'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeReact from 'rehype-react'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import "github-markdown-css/github-markdown-light.css";

import { DocContext } from '../context/context'

export const Preview = () => {
    const { docState } = useContext(DocContext)

    const markdown = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeStringify)
        .use(rehypeReact, {
            Fragment: Fragment,
            createElement: createElement,
        })
        .processSync(docState.content).result

    return (
        <div className='preview-wrapper markdown-body dark'>{ markdown }</div>
    )
}

import { createElement, Fragment, useContext } from 'react'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import rehypeReact from 'rehype-react'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

import { DocContext } from '../context/context'
const SAMPLE: string = "# Heading 1";

export const Preview = () => {
    const { docState } = useContext(DocContext)

    const markdown = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .use(rehypeReact, {
            Fragment: Fragment,
            createElement: createElement,
        })
        .processSync(docState.content).result

    return (
        <div className='preview-wrapper'>{ markdown }</div>
    )
}

import { createElement, Fragment, useEffect, useState } from 'react'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import rehypeReact from 'rehype-react'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const SAMPLE: string = "# Heading 1";

export const Preview = () => {
    const markdown = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .use(rehypeReact, {
            Fragment: Fragment,
            createElement: createElement,
        })
        .processSync(SAMPLE).result

    return (
        <div className='preview-wrapper'>{ markdown }</div>
    )
}

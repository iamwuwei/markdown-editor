import { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Editor } from './components/editor';
import { Preview } from './components/preview';
import { DocContext, ScrollContext } from './context/contexts';
import { docReducer, editorScrollReducer, previewerScrollReducer, lineElementReducer } from './context/reducers';
import { Doc, Scroll } from './models/type';
import { SAMPLE } from '../resources/mock/mock';

export const App = () => {
  const initialDoc: Doc = {content: SAMPLE};
  const [docState, docDispatch] = useReducer(docReducer, initialDoc)

  const initialScroll: Scroll = { scrollPercentage: 0, scrollTop: 0 };
  const [editorScrollState, editorScrollDispatch] = useReducer(editorScrollReducer, initialScroll)
  const [previewerScrollState, previewerScrollDispatch] = useReducer(previewerScrollReducer, initialScroll)
  const [lineElementState, lineElementDispatch] = useReducer(lineElementReducer, {number: 0, from: 0 , to: 0})

  return (
    <div className="app">
      <DocContext.Provider value={{ docState, docDispatch }}>
        <ScrollContext.Provider
          value={{
            editorScrollState, editorScrollDispatch,
            previewerScrollState, previewerScrollDispatch,
            lineElementState, lineElementDispatch
          }}
        >
          <Editor />
          <div className='center-line'></div>
          <Preview />
        </ScrollContext.Provider>
      </DocContext.Provider>
    </div>
  );
};

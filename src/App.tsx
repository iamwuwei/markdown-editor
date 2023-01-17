import { useReducer } from 'react';
import './App.css';
import { Editor } from './components/editor';
import { Preview } from './components/preview';
import { DocContext, SAMPLE } from './context/context';
import { docReducer } from './context/reducers';
import { Doc } from './models/type';

export const App = () => {
  const initialDoc: Doc = {content: SAMPLE};
  const [docState, docDispatch] = useReducer(docReducer, initialDoc)

  return (
    <div className="app">
      <DocContext.Provider value={{ docState, docDispatch }}>
        <Editor />
        <Preview />
      </DocContext.Provider>
    </div>
  );
};

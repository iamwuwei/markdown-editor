import { useState } from 'react';
import './App.css';
import { Editor } from './component/editor';
import { Preview } from './component/preview';

export const App = () => {
  const [text, setText] = useState<string>('');

  return (
    <div className="app">
      <Editor />
      <Preview />
    </div>
  );
};

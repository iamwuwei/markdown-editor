import { useState } from 'react';
import './App.css';
import { Editor } from './component/editor';

export const App = () => {
  const [text, setText] = useState<string>('');

  return (
    <div className="app">
      <Editor defaultValue={text} />
    </div>
  );
};

import { createContext } from 'react'
import { Doc } from '../models/type';

type DocContextType = {
    docState: Doc;
    docDispatch: any;
};

export const DocContext = createContext<DocContextType>({
    docState: { content: '# Hello world' },
    docDispatch: null,
});
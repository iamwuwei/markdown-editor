import { createContext } from 'react'
import { Doc, Scroll } from '../models/type';

type DocContextType = {
	docState: Doc;
	docDispatch: any;
};

type ScrollContextType = {
	editorScrollState: Scroll;
	editorScrollDispatch: any;
	previewerScrollState: Scroll;
	previewerScrollDispatch: any;
}

export const DocContext = createContext<DocContextType>({
	docState: { content: ''},
	docDispatch: null,
});

export const ScrollContext = createContext<ScrollContextType>({
	editorScrollState: { scrollPercentage: 0, scrollTop: 0 },
	editorScrollDispatch: null,
	previewerScrollState: { scrollPercentage: 0, scrollTop: 0 },
	previewerScrollDispatch: null,
});
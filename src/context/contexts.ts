import { createContext } from 'react'
import { Doc, LineElement, Scroll } from '../models/type';

type DocContextType = {
	docState: Doc;
	docDispatch: any;
};

type ScrollContextType = {
	editorScrollState: Scroll;
	editorScrollDispatch: any;
	previewerScrollState: Scroll;
	previewerScrollDispatch: any;
	lineElementState: LineElement;
	lineElementDispatch: any;
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
	lineElementState: {from: 0, to: 0, number: 0},
	lineElementDispatch: null,
});
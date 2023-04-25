import { Doc, Scroll, LineElement } from "../models/type";

export enum DocActionType {
	Update
}

/**
example for action type
//type ACTIONTYPE =
    // | { type: "increment" }
    // | { type: typeof incrementType }
    // | { type: "decrement" };
    // | { type: typeof decrementType };
*/
export type DocActions = { type: DocActionType.Update, payload: string }

export const docReducer = (state: Doc, action: DocActions) => {
	switch(action.type) {
		case DocActionType.Update:
				return { ...state, content: action.payload }
		default: {
			throw Error('Unknown action: ' + action.type);
		}
	}
}

export enum ScrollActionType {
	Update,
}

export type ScrollActions = { type: ScrollActionType.Update, payload: Scroll }

export const editorScrollReducer = (state: Scroll, action: ScrollActions) => {
	switch(action.type) {
		case ScrollActionType.Update:
			return { ...state, scrollPercentage: action.payload.scrollPercentage, scrollTop: action.payload.scrollTop}
		default: {
			throw Error('Unknown action: ' + action.type);
		}
	}
}

export const previewerScrollReducer = (state: Scroll, action: ScrollActions) => {
	switch(action.type) {
		case ScrollActionType.Update:
			return { ...state, scrollPercentage: action.payload.scrollPercentage, scrollTop: action.payload.scrollTop}
		default: {
			throw Error('Unknown action: ' + action.type);
		}
	}
}

export enum LineElementActionType {
	Update,
}
export type LineElementActions = { type: LineElementActionType.Update, payload: LineElement }

export const lineElementReducer = (state: LineElement, action: LineElementActions) => {
	const { type, payload } = action;

	switch(type) {
		case LineElementActionType.Update:
			return { ...state, number: payload.number, from: payload.from, to: payload.to}
		default: {
			throw Error('Unknown action: ' + type);
		}
	}
}
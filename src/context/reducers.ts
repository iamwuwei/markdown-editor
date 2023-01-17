import { Doc } from "../models/type";

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
export type DocActions = {type: DocActionType.Update, payload: string}

export const docReducer = (state: Doc, action: DocActions) => {
    switch(action.type) {
        case DocActionType.Update:
            return { ...state, content: action.payload}
        default:
            return state
    }
}
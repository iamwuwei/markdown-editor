export interface Doc {
  content: string;
}

export interface Scroll {
  scrollTop: number;
  scrollPercentage: number;
}

/*
    number: line number in editor
*/
export interface LineElement {
  number: number;
  from: number;
  to: number;
}
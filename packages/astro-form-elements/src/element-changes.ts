import { ReplaySubject } from "rxjs";

export type ElementChangesEventType = "focus" | "blur" | "input";

export interface ElementChangesValue {
  type: string;
  element: {
    name: string;
  };
  data: {
    value: any;
    lastValueInsert: any;
  };
}
export class ElementChangesEvent extends ReplaySubject<ElementChangesValue> {}

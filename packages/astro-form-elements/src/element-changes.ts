import { ReplaySubject } from "rxjs";

export type ElementChangesEventType = "focus" | "blur" | "input";
export class ElementChangesEvent extends ReplaySubject<ElementChangesEvent> {
  type: ElementChangesEventType;
  value: any;
  lastValueInsert: any;
}

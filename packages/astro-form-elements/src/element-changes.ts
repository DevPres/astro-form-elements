import { ReplaySubject } from "rxjs";

export interface IElementChanges {
  value: any;
  lastInsert: any;
}
export class ElementChanges extends ReplaySubject<IElementChanges> {}

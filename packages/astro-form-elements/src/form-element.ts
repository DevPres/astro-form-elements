import { Observable } from "rxjs";
import { ElementChanges, IElementChanges } from "./element-changes";

export default class FormElement {
  constructor(formElementName: string) {
    let inputRef = document.querySelector(
      `input[data-formElementName="${formElementName}"]`
    ) as HTMLInputElement;
    if (!!inputRef) {
      this.element = inputRef;
      this._value = inputRef.value;
      this._data = inputRef.dataset;
      this.element.addEventListener("input", this._onChange.bind(this));
      this.element.addEventListener("focus", this._onFocus.bind(this));
    }
  }

  private element: HTMLInputElement;
  private _value: any;
  private _lastInsert: string;
  private _data: any;
  private _touched = false;
  private _elementChanges$ = new ElementChanges();

  private _propagateChanges() {
    this._elementChanges$.next({
      value: this._value,
      lastInsert: this._lastInsert,
    });
  }

  private _onChange(event: InputEvent): void {
    //console.log(event);
    const target = event.target as HTMLInputElement;
    this._lastInsert = event.data as string;
    this._value = target.value;
    this._propagateChanges();
    return;
  }

  private _onFocus(event: InputEvent): void {
    //console.log(event);
    this._touched = true;
    this._propagateChanges();
    return;
  }

  valueChanges(): Observable<IElementChanges> {
    return this._elementChanges$.asObservable();
  }
}

/* customElements.define("form-element", FormElement); */

/* 
const subscribers = [];

const subscribe = callback => {
  subscribers.push(callback);
};

const unsubscribe = callback => {
  const index = subscribers.indexOf(callback);
  if (index !== -1) {
    subscribers.splice(index, 1);
  }
};

const publish = value => {
  subscribers.forEach(callback => callback(value));
};

// Later, when you want to emit a value to the subscribers, you can call the
// `publish` function with the value.
publish();


*/

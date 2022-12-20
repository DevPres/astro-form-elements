import { Observable, ReplaySubject } from "rxjs";
import type { FormGroupElementChangesValue } from "../types";
import FormElements from "../form-elements-registry";

export interface ElementOptions {
  elementName: string;
}

export interface CustomFormElement {
  data: any;
  value: any;
}

export default class BaseFormGroupElement extends HTMLElement {
  constructor() {
    super();
    const nameDirective = this.getAttribute(this._formGroupElementDirective);
    if (!nameDirective) {
      throw Error(
        `formGroupElementName  id is required!
        `
      );
    }

    this.name = nameDirective;

    try {
      FormElements.registerElement(this, this.name);
    } catch (error) {
      throw Error(
        `Element with name ${this.name} already exist
        `
      );
    }
    console.log(`${this.name} registered`);
    console.dir(this);
  }
  /**
   * Attribute to register a FormElement
   */
  private readonly _formGroupElementDirective = "formGroupElementName";
  /**
   * WIP
   */
  private _lastEvent = "";
  /**
   * Change whe the user interact with the UI
   */
  private _touched = false;
  /**
   * WIP
   */
  private _elementChanges$ = new ReplaySubject<FormGroupElementChangesValue>();
  public value: any;
  public name: string;
  /**
   * callback called bt broswer when the element enter in page
   */
  connectedCallback(): void {}

  valueChanges(): Observable<FormGroupElementChangesValue> {
    return this._elementChanges$.asObservable();
  }

  /* registerEvent(e: Event | CustomEvent): void {
    let input = this.querySelector("[data-elementInput]");
    input?.addEventListener(e.type, e.c);
    console.log(e);
  } */

  private _elementChanges() {
    this._elementChanges$.next({
      eventType: this._lastEvent,
      element: {
        name: this.name,
      },
      data: {
        value: this.value,
      },
    });
  }
}

customElements.define("form-group-element", BaseFormGroupElement);

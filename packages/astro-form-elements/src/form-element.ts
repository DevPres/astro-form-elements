import { Observable, ReplaySubject } from "rxjs";
import { ElementChangesValue } from "./index.d";
import formService from "./form-service";

export interface ElementOptions {
  elementName: string;
}

export interface CustomFormElement {
  data: any;
  value: any;
}

export type ElementType = "text";

export default class FormElement extends HTMLElement {
  constructor() {
    super();
    //TODO Gestire errore:
    //TODO 1- stampare html del next e previous sibilings.
    //TODO 2- parsare indentazione dell'html
    const nameDirective = this.getAttribute(this._formElementDirective);
    if (!nameDirective) {
      throw Error(
        `formElementName  id is required!
        `
      );
    }

    this.name = nameDirective;

    try {
      formService.registerElement(this, this.name);
    } catch (error) {
      throw Error(
        `Element with name ${this.name} already exist
        at:
        `
      );
    }
    console.log(`${this.name} registered`);
  }
  /**
   * Attribute to register a FormElement
   */
  private readonly _formElementDirective = "formElementName";
  private _lastEvent: string;
  private _touched = false;
  private _elementChanges$ = new ReplaySubject<ElementChangesValue>();
  private _events: any;
  private _emitOnFocus: boolean;
  private _emitOnInput: boolean;
  private _emitOnUpdate: boolean;
  private _emitOnChange: boolean;
  public lastValueInsert: any;
  public type: string;
  public value: any;
  public name: string;
  /**
   * callback called bt broswer when the element enter in page
   */
  connectedCallback(): void {
    //TODO connetti tutti gli attributi
    let input = this.querySelector("[data-elementInput]");
    console.log(this.dataset);
    /*  this._emitOnFocus = this.hasAttribute('emitOnFocus') ? this.getAttribute('emitOnFocus') : true */

    /* this._events.foreach((x) => {
      console.log(x);
    }); */
    input?.addEventListener(this._events, this._onChange.bind(this));
    input?.addEventListener("focus", this._onFocus.bind(this));
    input?.addEventListener("blur", this._onBlur.bind(this));
  }

  valueChanges(): Observable<ElementChangesValue> {
    return this._elementChanges$.asObservable();
  }

  /* registerEvent(e: Event | CustomEvent): void {
    let input = this.querySelector("[data-elementInput]");
    input?.addEventListener(e.type, e.c);
    console.log(e);
  } */

  private _elementChanges() {
    this._elementChanges$.next({
      type: this._lastEvent,
      element: {
        name: this.name,
      },
      data: {
        value: this.value,
        lastValueInsert: this.lastValueInsert,
      },
    });
  }

  private _onChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement | CustomFormElement;
    this.lastValueInsert = event.data;
    this.value = target.value;
    this._lastEvent = event.type;
    this._elementChanges();
  }

  private _onFocus(event: FocusEvent): void {
    this._lastEvent = event.type;

    if (!this._touched) {
      this._touched = true;
    }
    this._elementChanges();
  }

  private _onBlur(event: FocusEvent): void {
    this._lastEvent = event.type;

    if (!this._touched) {
      this._touched = true;
    }
    this._elementChanges();
  }
}

customElements.define("form-element", FormElement);

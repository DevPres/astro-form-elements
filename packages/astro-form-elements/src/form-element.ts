import { Observable } from "rxjs";
import { AbstractElement } from "./abstract-element";
import {
  ElementChangesEvent,
  ElementChangesEventType,
  ElementChangesValue,
} from "./element-changes";
import formService from "./form-service";

export interface ElementOptions {
  elementName: string;
}

export default class FormElement extends HTMLElement {
  constructor() {
    super();
    //TODO Gestire errore:
    //TODO 1- stampare html del next e previous sibilings.
    //TODO 2- parsare indentazione dell'html
    const formElementName = this.hasAttribute("formElementName");
    const formElementId = this.hasAttribute("formElementId");

    if (!formElementName && !formElementId) {
      throw Error(
        `formElementName or a formElementId id is required!
        at:
        ${this.outerHTML}
        `
      );
    }
    if (formElementName && formElementId) {
      throw Error(
        `component cannot have both the 'formElementName' and 'formElementId' attributes. Please remove one of these directives and try again!
        at:
        ${this.outerHTML}
        `
      );
    }

    console.log(this);
    try {
      formService.registerElement(this);
    } catch (error) {
      throw Error(
        `Element with name or id
        at:
        ${this.outerHTML}
        `
      );
    }
    console.log(formService);
  }
  name: string;
  /**
   * callback called bt broswer when the element enter in page
   */
  connectedCallback(): void {
    console.log(this);
    try {
      formService.registerElement(this);
    } catch (error) {
      throw Error(
        `Element with name or id 
        at:
        ${this.outerHTML}
        `
      );
    }
    console.log(formService);
  }

  attributeChangedCallback(): void {}
}

customElements.define("form-element", FormElement);

/* 

constructor(formElementName: string) {
    super();
    console.log(this, formElementName);
    let ref = this.querySelector(`[data-formElementName="${formElementName}"]`);

    try {
      this._registerElement(ref, {
        elementName: formElementName,
      });
    } catch (error) {
      console.error(error);
    }

    if (ref instanceof HTMLInputElement) {
      this._element = ref;
      this._value = ref.value;
      this._data = ref.dataset;
      this._element.addEventListener("input", this._onChange.bind(this));
      this._element.addEventListener("focus", this._onFocus.bind(this));
      this._element.addEventListener("blur", this._onBlur.bind(this));
    }
  }

  private _element: HTMLInputElement;
  private _value: any;
  private _lastValueInsert: string;
  private _lastEvent: ElementChangesEventType;
  private _elementName: string;
  private _data: any;
  private _touched = false;
  private _elementChanges$ = new ElementChangesEvent();

  private _elementChanges() {
    this._elementChanges$.next({
      type: this._lastEvent,
      element: {
        name: this._elementName,
      },
      data: {
        value: this._value,
        lastValueInsert: this._lastValueInsert,
      },
    });
  }

  private _onChange(event: InputEvent): void {
    console.log(event);
    const target = event.target as HTMLInputElement;
    this._lastValueInsert = event.data as string;
    this._value = target.value;
    this._lastEvent = event.type as ElementChangesEventType;
    this._elementChanges();
  }

  private _onFocus(event: InputEvent): void {
    this._lastEvent = event.type as ElementChangesEventType;

    if (!this._touched) {
      this._touched = true;
      this._elementChanges();
    }
  }

  private _onBlur(event: InputEvent): void {
    this._lastEvent = event.type as ElementChangesEventType;

    if (!this._touched) {
      this._touched = true;
      this._elementChanges();
    }
  }

  private _registerElement(
    ref: Element | null,
    elementOptions: ElementOptions
  ): void {
    if (ref === null) {
      throw new ReferenceError(
        `A formElement with name '${elementOptions.elementName} was not found'`
      );
    }
    if (ref instanceof HTMLInputElement) {
      this._element = ref;
      this._elementName = elementOptions.elementName;
      return;
    }
    throw new TypeError(
      `The Element with name '${elementOptions.elementName}' has to extend the CustomElement interface in a way to be sync
      
      ex:
      \`\`\`
      class CustomInput extends CustomElement {
        ...
      }

      The class will be not instanciate.
      `
    );
  }

  valueChanges(): Observable<ElementChangesValue> {
    return this._elementChanges$.asObservable();
  }*/

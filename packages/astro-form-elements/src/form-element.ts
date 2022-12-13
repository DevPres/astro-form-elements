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
    if (!this.hasAttribute(this._formElementDirective)) {
      throw Error(
        `formElementName or a formElementId id is required!
        at:
        ${this.outerHTML}
        `
      );
    }

    this.name = this.getAttribute(this._formElementDirective)!;

    try {
      formService.registerElement(this);
    } catch (error) {
      throw Error(
        `Element with name ${this.name} already exist
        at:
        ${this.outerHTML}
        `
      );
    }
    this.attachShadow({ mode: "open" });
  }
  /**
   * Attribute to register a FormElement
   */
  private _formElementDirective = "formElementName";
  private _element: any;
  private _lastValueInsert: string;
  private _lastEvent: ElementChangesEventType;
  private _data: any;
  private _touched = false;
  private _elementChanges$ = new ElementChangesEvent();
  value: any;
  name: string;
  /**
   * callback called bt broswer when the element enter in page
   */
  connectedCallback(): void {
    //TODO WIP: lavorare sulla possibilita di caricare input da fuori
    const isCustom = false;
    let html;
    if (isCustom) {
      //...TBD
    } else {
      html = `
      <label for=${this.name}>label</label>
      <input name=${this.name} type="text" placeholder="placeholder"  />
      `;
    }

    let shadowRoot = this.shadowRoot!;
    shadowRoot.innerHTML = html;
    this._element = shadowRoot.querySelector(`[name=${this.name}]`);

    if (!this._element) {
      if (isCustom) {
        //TODO se si sta usando un html custom, colui che emette l'evento deve esser syncato TBD
        throw Error("TBD");
      }
      throw Error(
        "An input with name ${this.name} was not found in shadowRoot of FormElement"
      );
    }

    this._element.addEventListener("input", this._onChange.bind(this));
    this._element.addEventListener("focus", this._onFocus.bind(this));
    this._element.addEventListener("blur", this._onBlur.bind(this));

    console.log("connectedCallback", formService);
  }

  attributeChangedCallback(): void {}

  valueChanges(): Observable<ElementChangesValue> {
    return this._elementChanges$.asObservable();
  }

  private _elementChanges() {
    this._elementChanges$.next({
      type: this._lastEvent,
      element: {
        name: this.name,
      },
      data: {
        value: this.value,
        lastValueInsert: this._lastValueInsert,
      },
    });
  }

  private _onChange(event: InputEvent): void {
    console.log(event);
    const target = event.target as HTMLInputElement;
    this._lastValueInsert = event.data as string;
    this.value = target.value;
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

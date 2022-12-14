import FormElement, { ElementType } from "./form-element";

class FormService {
  constructor() {
    console.log("hello service");
  }

  #elementRegistry = new Map<string, FormElement>();
  #elementTypeRegistry: Set<ElementType> = new Set(["text"]);

  registerElement(element: FormElement, key: string) {
    let exist = this.#elementRegistry.has(key);
    if (exist) {
      throw new Error("Element already present in the registry");
    }
    this.#elementRegistry.set(key, element);
  }

  /**
   * Get the Element, if this is registered, or throw an Error instad
   *
   * @param key is the formElementName or formElement id of the FormElement to search
   */
  get(key: string): FormElement | undefined {
    let element = this.#elementRegistry.get(key);
    if (!!element) {
      return element;
    }
    return;
  }

  getAsElementType(type: any): ElementType | Error {
    if (this.#elementTypeRegistry.has(type)) {
      return type as ElementType;
    }
    throw Error(`The type ${type} is not present in the registry.`);
  }
}

export default new FormService();

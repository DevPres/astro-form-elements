import type FormElement from "./form-element";

class FormElementsService {
  constructor() {}

  #elementRegistry = new Map<string, FormElement>();

  registerElement(element: FormElement, key: string) {
    console.log();
    let exist = this.#elementRegistry.has(key);
    if (exist) {
      throw new Error("Element already present in the registry");
    }
    this.#elementRegistry.set(key, element);
  }

  /*  *
   * Get the Element, if this is registered, or throw an Error instad
   *
   * @param key is the formElementName or formElement id of the FormElement to search */

  get(key: string): FormElement | undefined {
    let element = this.#elementRegistry.get(key);
    if (!!element) {
      return element;
    }
    return;
  }
}

const FormElements = new FormElementsService();
/* export default new FormElementsService(); */
export default FormElements;

import type FormElement from "./components/base-form-element";
import type FormGroupElement from "./components/base-form-group-element";

class FormElementsService {
  constructor() {}

  #elementRegistry = new Map<string, FormElement | FormGroupElement>();

  registerElement(
    element: FormElement | FormGroupElement,
    key: string
  ): void | Error {
    let exist = this.#elementRegistry.has(key);
    if (exist) {
      let existingElement = this.#elementRegistry.get(key) as
        | FormElement
        | FormGroupElement;
      if (typeof existingElement === typeof element) {
        throw new Error("Element already present in the registry");
      }
    }
    this.#elementRegistry.set(key, element);
  }

  /**
   * Get the Element, if this is registered,
   *
   * @param formElementName
   */

  get(key: string): FormElement | FormGroupElement | undefined {
    let element = this.#elementRegistry.get(key);
    if (!!element) {
      return element;
    }
    return;
  }
}

const FormElementsRegistry = new FormElementsService();
/* export default new FormElementsService(); */
export default FormElementsRegistry;

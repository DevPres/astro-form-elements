import FormElement from "./form-element";

class FormService {
  constructor() {
    console.log("hello service");
  }

  #elementRegistry = new Map<string, FormElement>();

  registerElement(element: FormElement) {
    let key = this.getElementKey(element);
    let exist = this.checkIfElementAlreadyExist(key);

    if (exist) {
      throw new Error();
    }
    this.#elementRegistry.set(key, element);
  }

  private getElementKey(element: FormElement): string {
    let elementNameData = element.attributes.getNamedItem("formElementName");
    let elementIdData = element.attributes.getNamedItem("formElementId");
    if (!!elementNameData) {
      return elementNameData.value;
    }
    /**
     * At least one of the attributes is defined, because the constructor of
     * FormElement throw Error instad
     */
    return elementIdData!.value;
  }

  private checkIfElementAlreadyExist(key: string): boolean {
    return !!this.get(key);
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
}

export default new FormService();

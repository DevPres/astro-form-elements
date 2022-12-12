import FormElement from "./form-element";

class FormService {
  constructor() {
    console.log("hello service");
  }

  #elementRegistry = new Map();

  registerElement(element: FormElement) {
    this.#elementRegistry.set(
      element.attributes.getNamedItem("formElementName")!.value,
      element
    );
  }
}

export const formService = new FormService();

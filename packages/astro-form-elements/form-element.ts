import type BaseFormElement from "./components/base-form-element";
import FormElementsRegistry from "./form-elements-registry";

export default function FormElement(formElementName: string): BaseFormElement {
  const registry = FormElementsRegistry;

  const el = registry.get(formElementName);
  if (!el) {
    throw Error(
      `Form Element with name ${formElementName} was not found
        `
    );
  }
  return el;
}

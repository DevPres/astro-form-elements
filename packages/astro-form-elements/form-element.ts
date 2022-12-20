import type BaseFormElement from "./components/base-form-element";
import BaseFormGroupElement from "./components/base-form-group-element";
import FormElementsRegistry from "./form-elements-registry";

export default function FormElement(formElementName: string): BaseFormElement {
  const registry = FormElementsRegistry;

  const el: BaseFormElement | BaseFormGroupElement | undefined =
    registry.get(formElementName);
  if (el instanceof BaseFormGroupElement || !el) {
    throw Error(
      `Form Element with name ${formElementName} was not found
        `
    );
  }
  return el as BaseFormElement;
}

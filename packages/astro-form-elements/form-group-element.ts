import BaseFormElement from "./components/base-form-element";
import type BaseFormGroupElement from "./components/base-form-group-element";
import FormElementsRegistry from "./form-elements-registry";

export default function FormGroupElement(
  formElementName: string
): BaseFormGroupElement {
  const registry = FormElementsRegistry;

  const el: BaseFormElement | BaseFormGroupElement | undefined =
    registry.get(formElementName);
  if (el instanceof BaseFormElement || !el) {
    throw Error(
      `Form Group Element with name ${formElementName} was not found
        `
    );
  }
  return el as BaseFormGroupElement;
}

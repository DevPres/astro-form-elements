export default class FormElement {
  constructor(formElementName: string) {
    let ref = document.querySelector(
      `input[data-formElementName="${formElementName}"]`
    ) as HTMLInputElement;
    if (!!ref) {
      this.element = ref;
      this.element.addEventListener("input", (event: Event) => {
        return this._onChange(event);
      });
    }
  }

  private element: HTMLInputElement;
  private _value: string;
  private _lastInsert: string;

  private _onChange(event: Event) {
    console.log(event);
    this._value = this.element.value;
  }

  value() {
    return this._value;
  }
}

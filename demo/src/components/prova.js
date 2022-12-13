import { WebComponent, observe } from "rxjs";

class MyCustomComponent extends HTMLElement {
  constructor() {
    super();
    this.click$ = new Observable((observer) => {
      this.addEventListener("click", (event) => observer.next(event));
    });
  }
}

customElements.define("my-custom-component", MyCustomComponent);

const myCustomComponent = document.querySelector("my-custom-component");
const clickObserver = observe(myCustomComponent.click$);
clickObserver.subscribe((event) => {
  console.log("click event detected:", event);
});

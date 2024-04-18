export default class Card {
  public rootElement: HTMLElement;
  public buttonElement: HTMLButtonElement;

  constructor(id: string) {
    this.rootElement = this.getRootElement(id);
    this.buttonElement = this.getButtonElement();
  }

  private getRootElement(id: string) {
    const rootElement = document.getElementById(id);
    if (rootElement instanceof HTMLElement) {
      return rootElement;
    } else {
      throw new Error("The root is not defined");
    }
  }

  private getButtonElement() {
    const buttonElement = this.rootElement.querySelector('[data-id="button"]');
    if (buttonElement instanceof HTMLButtonElement) {
      return buttonElement;
    } else {
      throw new Error("The button is not defined");
    }
  }
}

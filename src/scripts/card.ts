export default class Card {
  public rootElement: HTMLElement;
  public buttonElement: HTMLButtonElement;

  constructor(templateId: string) {
    this.rootElement = this.getRootElement(templateId);
    this.buttonElement = this.getButtonElement();
  }

  private getRootElement(templateId: string) {
    const templateElement = document.getElementById(templateId);
    if (templateElement instanceof HTMLTemplateElement) {
      const fragment = <DocumentFragment>(
        templateElement.content.cloneNode(true)
      );
      const rootElement = fragment.firstElementChild;
      if (rootElement instanceof HTMLElement) {
        return rootElement;
      } else {
        throw new Error("The template article is not defined");
      }
    } else {
      throw new Error("The template is not defined");
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

import Card from "./card";

const ID = "confirmation-card";

export default class ConfirmationCard extends Card {
  public emailElement: HTMLSpanElement;

  public constructor() {
    super(ID);
    this.emailElement = this.getEmailElement();
  }

  private getEmailElement() {
    const emailElement = this.rootElement.querySelector('[data-id="email"]');
    if (emailElement instanceof HTMLSpanElement) {
      return emailElement;
    } else {
      throw new Error("The email is not defined");
    }
  }
}

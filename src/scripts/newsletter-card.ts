import Card from "./card";

const ID = "newsletter-card";

export default class NewsletterCard extends Card {
  public formElement: HTMLFormElement;
  public pictureElement: HTMLPictureElement;

  public constructor() {
    super(ID);
    this.formElement = this.getFormElement();
    this.pictureElement = this.getPictureElement();
  }

  public get formData() {
    const formData = new FormData(this.formElement);
    return Object.fromEntries(formData);
  }

  private getFormElement() {
    const formElement = this.rootElement.querySelector('[data-id="form"]');
    if (formElement instanceof HTMLFormElement) {
      return formElement;
    } else {
      throw new Error("The form is not defined");
    }
  }

  private getPictureElement() {
    const pictureElement = this.rootElement.querySelector(
      '[data-id="picture"]'
    );
    if (pictureElement instanceof HTMLPictureElement) {
      return pictureElement;
    } else {
      throw new Error("The picture is not defined");
    }
  }
}

import ConfirmationCard from "./confirmation-card";
import NewsletterCard from "./newsletter-card";

const TO_LEFT = true;
const TO_RIGHT = false;

function* fadeAndSlideXKeyframes(toLeft: boolean) {
  yield [
    { opacity: 1, transform: "translateX(0)", offset: 0 },
    {
      opacity: 0,
      transform: toLeft ? "translateX(-4rem)" : "translateX(4rem)",
      offset: 1,
    },
  ];
  return [
    {
      opacity: 0,
      transform: toLeft ? "translateX(4rem)" : "translateX(-4rem)",
      offset: 0,
    },
    { opacity: 1, transform: "translateX(0)", offset: 1 },
  ];
}

const animationTiming = {
  duration: 300,
  easing: "ease-in-out",
};

export default class App {
  rootElement: HTMLElement;
  newsletterCard: NewsletterCard;
  confirmationCard: ConfirmationCard;
  keyframeEffect: KeyframeEffect;
  animation: Animation;

  public constructor() {
    this.rootElement = this.getRootElement();
    this.newsletterCard = new NewsletterCard();
    this.confirmationCard = new ConfirmationCard();
    this.keyframeEffect = new KeyframeEffect(
      this.rootElement,
      null,
      animationTiming
    );
    this.animation = new Animation(this.keyframeEffect, document.timeline);

    this.onNewsletterCardButtonClick =
      this.onNewsletterCardButtonClick.bind(this);
    this.onConfirmationCardButtonClick =
      this.onConfirmationCardButtonClick.bind(this);
  }

  private getRootElement() {
    const rootElement = document.getElementById("root");
    if (rootElement instanceof HTMLElement) {
      return rootElement;
    } else {
      throw new Error("The root is not defined");
    }
  }

  private async playAnimation(keyframes: Keyframe[]) {
    this.keyframeEffect.setKeyframes(keyframes);
    this.animation.play();
    try {
      await this.animation.finished;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
  }

  public init() {
    this.confirmationCard.rootElement.dataset.visible = "false";
    this.newsletterCard.rootElement.dataset.visible = "true";
    this.newsletterCard.buttonElement.addEventListener(
      "click",
      this.onNewsletterCardButtonClick,
      { once: true }
    );
  }

  private async onNewsletterCardButtonClick() {
    const keyframeGenerator = fadeAndSlideXKeyframes(TO_LEFT);
    await this.playAnimation(keyframeGenerator.next().value);
    this.newsletterCard.rootElement.dataset.visible = "false";
    this.confirmationCard.rootElement.dataset.visible = "true";
    await this.playAnimation(keyframeGenerator.next().value);
    this.confirmationCard.buttonElement.addEventListener(
      "click",
      this.onConfirmationCardButtonClick,
      { once: true }
    );
  }

  private async onConfirmationCardButtonClick() {
    const keyframeGenerator = fadeAndSlideXKeyframes(TO_RIGHT);
    await this.playAnimation(keyframeGenerator.next().value);
    this.confirmationCard.rootElement.dataset.visible = "false";
    this.newsletterCard.rootElement.dataset.visible = "true";
    await this.playAnimation(keyframeGenerator.next().value);
    this.newsletterCard.buttonElement.addEventListener(
      "click",
      this.onNewsletterCardButtonClick,
      { once: true }
    );
  }
}

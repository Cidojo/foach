const sliderNode = document.querySelector(`.slider`);

class Slider {
  constructor(container, options) {
    this.options = options;
    this.container = container;
    this.slides = container.querySelectorAll(`.slider__item`);
    this.controls = {
      next: container.querySelector(`.slider__button--next`),
      prev: container.querySelector(`.slider__button--prev`)
    }

    this.currentSlideIndex = options.startAt || 0;
  }

  setCurrentSlideIndex(index) {
    this.currentSlideIndex = Math.abs(index + this.slides.length) % this.slides.length;
  }

  get currentSlide() {
    return this.slides[this.currentSlideIndex];
  }

  hashIndexToOrder(index) {
    return Math.abs(index - this.currentSlideIndex + this.slides.length) % this.slides.length || this.slides.length;
  }

  hashOrderToIndex(order) {
    return Math.abs(this.currentSlideIndex + order - 1 + this.slides.length) % this.slides.length;
  }

  onNextClick() {
    this.setCurrentSlideIndex(this.currentSlideIndex + 1);

    this.slides[this.hashOrderToIndex(this.options.slidesToShow - 1)].classList.remove(`slider__item--last`);
    this.slides[this.hashOrderToIndex(this.options.slidesToShow)].classList.add(`slider__item--last`);


    this.slides.forEach((slide, i) => {
      slide.style[`order`] = this.hashIndexToOrder(i + 1);
    });
  }

  onPrevClick() {
    this.setCurrentSlideIndex(this.currentSlideIndex - 1);
    this.slides[this.hashOrderToIndex(this.options.slidesToShow + 1)].classList.remove(`slider__item--last`);
    this.slides[this.hashOrderToIndex(this.options.slidesToShow - 1)].classList.remove(`slider__item--last`);
    this.slides[this.hashOrderToIndex(this.options.slidesToShow - 2)].classList.add(`slider__item--last`);


    this.slides.forEach((slide, i) => {
      slide.style[`order`] = this.hashIndexToOrder(i - 1);
    });
  }

  bind() {
    this.controls.next.addEventListener(`click`, this.onNextClick.bind(this));
    this.controls.prev.addEventListener(`click`, this.onPrevClick.bind(this));
  }
}


export default () => new Slider(sliderNode, {slidesToShow: 3}).bind();

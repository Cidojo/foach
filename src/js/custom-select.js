export default () => {
  const CustomSelectClassNames = {
    CONTAINER: `custom-select`,
    CONTAINER_ACTIVE: `custom-select--active`,
    SELECTED: `custom-select__selected`,
    OPTIONS: `custom-select__options`,
    OPTIONS_HIDDEN: `custom-select__options--hide`,
    OPTION: `custom-select__option`
  }

  const selectContainers = document.querySelectorAll(`.${CustomSelectClassNames.CONTAINER}`);


  class CustomSelect {
    constructor(container) {
      this.container = container;
      this.linkedSelect = container.querySelector(`select`);
      this.currentOption = document.createElement(`div`);
      this.optionsList = document.createElement(`ul`);

      this.currentOptionIndex = this.linkedSelect.selectedIndex;

      this.currentOption.innerText = this.linkedSelect[this.currentOptionIndex].innerText;
      this.currentOption.classList.add(CustomSelectClassNames.SELECTED);
      this.optionsList.classList.add(CustomSelectClassNames.OPTIONS);
      this.optionsList.classList.add(CustomSelectClassNames.OPTIONS_HIDDEN);


      this.onCloseCustomSelect = this.onCloseCustomSelect.bind(this);

      this.hideOption = true;
    }

    setCurrentOption() {
      this.currentOption.addEventListener(`click`, () => {
        this.toggleCustomSelectRender();
        document.addEventListener(`click`, this.onCloseCustomSelect);
      });
    }

    toggleCustomSelectRender(hideOption) {
      this.container.classList.toggle(CustomSelectClassNames.CONTAINER_ACTIVE, !hideOption);
      this.optionsList.classList.toggle(CustomSelectClassNames.OPTIONS_HIDDEN, hideOption);
    }

    setOptionsList() {
      const onOptionClick = (e) => {
        this.currentIndex = [...this.optionsList.children].reduce((accum, option, i) => option.innerText === e.target.innerText ? i : accum);

        this.linkedSelect.selectedIndex = this.currentIndex;
        this.currentOption.innerText = e.target.innerText;

        this.toggleCustomSelectRender();
      }


      [...this.linkedSelect.children].forEach((option) => {
        const customOption = document.createElement(`li`);
        customOption.classList.add(CustomSelectClassNames.OPTION);
        customOption.innerText = option.innerText;
        customOption.addEventListener(`click`, onOptionClick);
        this.optionsList.appendChild(customOption);
      });
    }

    create() {
      this.setCurrentOption();
      this.setOptionsList();

      this.container.appendChild(this.currentOption);
      this.container.appendChild(this.optionsList);
    }

    onCloseCustomSelect() {
      this.hideOption = !this.hideOption;

      if (this.hideOption) {
        this.toggleCustomSelectRender(this.hideOption);
        document.removeEventListener(`click`, this.onCloseCustomSelect);
      }

    }
  }


  selectContainers.forEach((container) => {
    new CustomSelect(container).create();
  });
};

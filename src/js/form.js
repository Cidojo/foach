import {submit} from './backend';

export default () => {
  const formContainer = document.querySelector(`.reg-form`);
  const usernameField = formContainer.querySelector(`.user-data__name-input`);
  const passwordField = formContainer.querySelector(`.password__input`);
  const countrySelect = formContainer.querySelector(`.user-data__country-select select`);
  const ageSelect = formContainer.querySelector(`.user-data__age-select select`);
  const genderRadios = formContainer.querySelectorAll(`.gender input`);
  const passwordConfirmField = formContainer.querySelector(`.password__input-confirm`);
  const emailField = formContainer.querySelector(`.user-data__email-input`);

  const passwordInfoRules = [...formContainer.querySelectorAll(`.password__rule`)].map((rule) => {
    return {
      type: (/password__rule--(.+?)$/).exec(rule.classList.value)[1],
      element: rule
    }
  });

  const passwordRuleTypes = {
    LENGTH: `length`,
    CAPTION: `caption`,
    DIGIT: `digit`
  }

  const passwordPatterns = {
    [passwordRuleTypes.LENGTH]: /^\S{6,}$/,
    [passwordRuleTypes.CAPTION]: /[A-Z][a-z]|[a-z][A-Z]/,
    [passwordRuleTypes.DIGIT]: /[!@#$%^&*()№?]+.*\d+|\d+.*[!@#$%^&*()№?]+/
  }

  const emailPattern = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/;


  const getFormDataAsJson = () => {
    return JSON.stringify({
      username: usernameField.value,
      email: emailField.value,
      password: passwordField.value,
      country: countrySelect.options[countrySelect.selectedIndex].innerText,
      age: ageSelect.options[ageSelect.selectedIndex].innerText,
      gender: [...genderRadios].reduce((current, next) => current.checked ? current.value : next.value)
    });
  }


  const getPasswordValidity = (password, type) => passwordPatterns[type].test(password);
  const getEmailValidity = () => emailPattern.test(emailField.value);
  const getPasswordConfirmValidity = () => passwordField.value === passwordConfirmField.value;
  const getRequiredValidity = () => getPasswordConfirmValidity() && getEmailValidity() && renderValidityRule(passwordField.value);


  const renderValidityRule = (password) => {
    let allPassStatus = true;

    passwordInfoRules.forEach((item) => {
      const currentRuleStatus = getPasswordValidity(password, item.type);
      item.element.classList.toggle(`password__rule--valid`, currentRuleStatus);

      allPassStatus = currentRuleStatus ? allPassStatus : false;
    });

    passwordField.classList.toggle(`password__input--valid`, allPassStatus);
    return allPassStatus;
  };


  const onPasswordConfirmChange = () => {
    passwordConfirmField.classList.toggle(`password__input-confirm--invalid`, !getPasswordConfirmValidity());
  }

  const onPasswordChange = () => {
    renderValidityRule(passwordField.value);
    onPasswordConfirmChange();
  }

  const onEmailChange = () => {
    emailField.classList.toggle(`user-data__email-input--invalid`, !getEmailValidity());
  }

  passwordField.addEventListener(`input`, onPasswordChange);
  passwordConfirmField.addEventListener(`input`, onPasswordConfirmChange);
  emailField.addEventListener(`input`, onEmailChange);

  formContainer.addEventListener(`submit`, (e) => {
    e.preventDefault();
     if (getRequiredValidity()) {
       submit(getFormDataAsJson());
     } else {
       console.log(`invalid field(s), find and fix it`) // eslint-disable-line
     }
  });
}

export default () => {
  const form = document.querySelector(`.reg-form`);
  const emailField = form.querySelector(`.user-data__email-input`);
  const passwordField = form.querySelector(`.password__input`);
  const passwordConfirmField = form.querySelector(`.password__input-confirm`);
  const passwordInfoRules = [...form.querySelectorAll(`.password__rule`)].map((rule) => {
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

  const validatePasswordType = (password, type) => {
    return passwordPatterns[type].test(password);
  }

  const renderValidityRule = (password) => {
    let allPassStatus = true;

    passwordInfoRules.forEach((item) => {
      const currentRuleStatus = validatePasswordType(password, item.type);
      item.element.classList.toggle(`password__rule--valid`, currentRuleStatus);

      allPassStatus = currentRuleStatus ? allPassStatus : false;
    });

    passwordField.classList.toggle(`password__input--valid`, allPassStatus);
  };

  const onPasswordChange = () => {
    renderValidityRule(passwordField.value);
    renderPasswordConfirmStatus();
  }

  const renderPasswordConfirmStatus = () => {
    passwordConfirmField.classList.toggle(`password__input-confirm--invalid`, !(passwordField.value === passwordConfirmField.value));
  }

  const onEmailChange = () => {
    emailField.classList.toggle(`user-data__email-input--invalid`, !emailPattern.test(emailField.value));
  }

  passwordField.addEventListener(`input`, onPasswordChange);
  passwordConfirmField.addEventListener(`input`, renderPasswordConfirmStatus);
  passwordConfirmField.addEventListener(`input`, renderPasswordConfirmStatus);
  emailField.addEventListener(`input`, onEmailChange);

  form.addEventListener(`submit`, (e) => {
    e.preventDefault();
  })
}

export default () => {
  const form = document.querySelector(`.reg-form`);
  const emailField = form.querySelector(`.user-data__email`);
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

  const passWordPatterns = {
    [passwordRuleTypes.LENGTH]: /^\S{6,}$/,
    [passwordRuleTypes.CAPTION]: /[A-Z][a-z]|[a-z][A-Z]/,
    [passwordRuleTypes.DIGIT]: /[!@#$%^&*()№?]+.*\d+|\d+.*[!@#$%^&*()№?]+/,
    // EMAIL: /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/
  }

  const validatePasswordType = (password, type) => {
    return passWordPatterns[type].test(password);
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

  const onPasswordChange = (e) => {
    const password = e.target.value;

    renderValidityRule(password);
  }

  passwordField.addEventListener(`input`, onPasswordChange);
  passwordConfirmField.addEventListener(`input`, (e) => {
    e.currentTarget.classList.toggle(`password__input-confirm--invalid`, !(passwordField.value === e.currentTarget.value));
  });
}

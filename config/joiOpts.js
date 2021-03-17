const joiOpts = {
  messages: {
    'string.base': 'Значение {#label} должно быть строкой',
    'number.base': 'Значение {#label} должно быть числом',
    'number.integer': 'Значение {#label} должно быть целым числом',
    'number.positive': 'Значение {#label} должно быть положительным числом',
    'string.min': 'Значение {#label} должно содержать минимум {#limit} символа(ов)',
    'string.max': 'Значение {#label} должно содержать максимум {#limit} символа(ов)',
    'string.length': 'Длина значения {#label} должна быть равна {#limit} символу(ам)',
    'string.hex': 'Значение {#label} должно быть в 16ричном формате',
    'any.required': '{#label} - обязательное поле',
  },
};

module.exports = joiOpts;

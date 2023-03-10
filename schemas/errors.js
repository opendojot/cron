const errors = {
  // internal server error
  internal: { error: 1, message: 'Something went wrong. Try again later.' },
  notfound: { error: 2, message: 'Resource not found.' },

  // invalid parameters
  invalid: {
    // global
    time: { error: 101, message: 'Invalid cron time.' },
    timezone: { error: 102, message: 'Invalid timezone.' },
    name: { error: 103, message: 'Invalide name.' },
    description: { error: 104, message: 'Invalid description.' },
    action: { error: 105, message: 'Invalid job action.' },
    // http
    http: {
      method: { error: 111, message: '(http action) Invalid method.' },
      headers: { error: 112, message: '(http action) Invalid headers.' },
      url: { error: 113, message: '(http action) Invalid http url.' },
      criterion: {
        error: 114,
        message: '(http action) Invalid success criterion.',
      },
      sregex: {
        error: 115,
        message: '(http action) Invalid regular expression for criterion 2.',
      },
      fregex: {
        error: 116,
        message: '(http action) Invalid regular expression for criterion 3.',
      },
      body: { error: 117, message: '(http action) Invalid body' },
    },
    // data broker
    broker: {
      subject: { error: 121, message: '(broker action) Invalid subject.' },
      message: { error: 122, message: '(broker action) Invalid message.' },
    },
    // function
    jscode: {
      snippet: { error: 131, message: 'Invalid code snippet.' },
    },
  },
};

function getErrors(error) {
  try {
    const propertyNames = Object.getOwnPropertyNames(error);
    const property = propertyNames[0];
    const { value } = Object.getOwnPropertyDescriptor(error, property);
    const stringErrors = value.split('\n');
    const arrayErros = stringErrors[0].split('Error: ');
    const jsonErrors = arrayErros.filter(Boolean).map((x) => JSON.parse(x));
    return jsonErrors;
  } catch (err) {
    return null;
  }
}

module.exports = { errors, getErrors };

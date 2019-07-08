module.exports = [
  {
    type: 'checkbox',
    name: 'providers',
    message: 'Web font providers:',
    choices: ['Custom', 'Fontdeck', 'Fonts.com', 'Google', 'Typekit'],
    validate: input => {
      if (input.length > 0) {
        return true;
      }

      return 'Please select at least one web font provider.';
    }
  },
  {
    type: 'input',
    name: 'custom',
    message:
      'What custom fonts are you using? (e.g. Roboto, Source Sans Pro, Helvetica)',
    validate: input => Boolean(input),
    when: answers => answers.providers.includes('Custom')
  },
  {
    type: 'input',
    name: 'fontdeck',
    message: 'What is your Fontdeck ID?',
    validate: input => Boolean(input),
    when: answers => answers.providers.includes('Fontdeck')
  },
  {
    type: 'input',
    name: 'monotype',
    message: 'What is your Fonts.com Project ID?',
    validate: input => Boolean(input),
    when: answers => answers.providers.includes('Fonts.com')
  },
  {
    type: 'input',
    name: 'google',
    message:
      'What Google fonts are you using? (e.g. Droid Sans, Open Sans Condensed:300,700)',
    validate: input => Boolean(input),
    when: answers => answers.providers.includes('Google')
  },
  {
    type: 'input',
    name: 'typekit',
    message: 'What is your Typekit Kit ID?',
    validate: input => Boolean(input),
    when: answers => answers.providers.includes('Typekit')
  }
];

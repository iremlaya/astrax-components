import React from 'react';

import TextInput from '../components/TextInput';

export default {
  title: 'Example/TextInput',
  component: TextInput,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <TextInput {...args} />;

export const Short = Template.bind({}); //default

export const Long = Template.bind({});
Long.args = {
  long: true,
};

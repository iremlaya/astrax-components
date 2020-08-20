import React from 'react';

import Checkbox from '../components/Checkbox';

export default {
  title: 'Example/Checkbox',
  component: Checkbox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Checkbox {...args} />;

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};
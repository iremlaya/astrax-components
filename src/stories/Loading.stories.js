import React from 'react';

import Loading from '../components/Loading';

export default {
  title: 'Example/Loading',
  component: Loading,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <Loading {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Loading',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Loading',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Loading',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Loading',
};

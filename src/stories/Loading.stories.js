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

export const Dots = Template.bind({});
Dots.args = {
  dots: true,
  slide: false,
  label: '',
};

export const Slider = Template.bind({});
Slider.args = {
  dots: false,
  slide: true,
  label: 'Loading',
};

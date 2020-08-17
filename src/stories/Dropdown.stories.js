import React from 'react';

import { Dropdown } from './Dropdown';

export default {
  title: 'Example/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Dropdown {...args} />;

export const Unsearchable = Template.bind({});
Unsearchable.args = {
  searchable: false,
};

export const Searchable = Template.bind({});
Searchable.args = {
  searchable: true,
};
export const MultiSelect = Template.bind({});
MultiSelect.args = {
  searchable: false,
  multiSelect: true,
};

export const MultiSearchable = Template.bind({});
MultiSearchable.args = {
  searchable: true,
  multiSelect: true,
};
/*
export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
*/
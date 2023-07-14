import type { Meta, StoryObj } from '@storybook/react';
import Card  from './Button';

const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    title:"hello",
    background:"red-500",
  },
};



export const Secondary: Story = {
  args: {
    title:"hello",
    background:"red-500",
    showSub:true
  },
};


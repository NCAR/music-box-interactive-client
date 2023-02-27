import React from 'react'
import LoadFile from '../components/getting_started_specific/LoadFile'

export default {
    title: 'Getting Started/LoadFile',
    component: LoadFile,
    parameters: {
        layout: 'centered'
    }
}

const Template = (args) => <LoadFile {...args} />;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Default = Template.bind({});
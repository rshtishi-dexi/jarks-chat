import React from 'react';
import ChatMessageBox, { chatMessageBoxProps } from './chatMessage';
import { Message } from "../../jark.models";

let props: chatMessageBoxProps = {
    id: "",
    message: {}
}

export default {
    args: props,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    title: 'Example/ChatMessage',
    component: ChatMessageBox
}

const Template = (args: chatMessageBoxProps) =>
    <ChatMessageBox {...args} />;

export const Title = Template.bind({});



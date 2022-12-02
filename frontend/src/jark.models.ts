// Generated using typescript-generator version 2.0.400 on 2022-12-01 20:18:26.

export interface Message {
    id?: string;
    content?: string;
    sender?: string;
    recipient?: string;
    created?: Date;
    type?: MessageType;
    status?: MessageStatus;
}

export interface MessageBuilder {
}

export interface User {
    userId?: string;
    username?: string;
    registerDate?: Date;
    password?: string;
    image?: any;
}

export interface UserBuilder {
}

export const enum MessageStatus {
    DELIVERED = 'DELIVERED',
    RECEIVED = 'RECEIVED',
    PENDING = 'PENDING',
}

export const enum MessageType {
    MESSAGE = 'MESSAGE',
    LEAVE = 'LEAVE',
    JOIN = 'JOIN',
}
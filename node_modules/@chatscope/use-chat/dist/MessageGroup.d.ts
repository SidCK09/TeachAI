import { ChatMessageId, UserId } from "./Types";
import { MessageDirection } from "./enums";
import { ChatMessage } from "./";
import { MessageContentType } from "./enums";
declare type MessageGroupParams = {
    id: string;
    senderId: string;
    direction: MessageDirection;
};
export declare class MessageGroup {
    readonly id: string;
    readonly senderId: UserId;
    readonly direction: MessageDirection;
    messages: Array<ChatMessage<MessageContentType>>;
    constructor({ id, senderId, direction }: MessageGroupParams);
    addMessage(message: ChatMessage<MessageContentType>): void;
    getMessage(id: ChatMessageId): [ChatMessage<MessageContentType>, number] | [undefined, undefined];
    /**
     * Replace the given message in the message collection
     * @param message
     */
    updateMessage(message: ChatMessage<MessageContentType>): void;
    /**
     * Replace the message at the specified index in the message collection.
     * Returns true if the message exists at the specified position.
     * Returns false if the given index is out of bound.
     * @param message
     * @param index
     */
    replaceMessage(message: ChatMessage<MessageContentType>, index: number): boolean;
}
export {};

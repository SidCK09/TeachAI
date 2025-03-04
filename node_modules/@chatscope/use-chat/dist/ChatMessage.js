"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
class ChatMessage {
    constructor({ id, status, contentType, senderId, direction, content, createdTime = new Date(), updatedTime, }) {
        this.id = id;
        this.status = status;
        this.contentType = contentType;
        this.senderId = senderId;
        this.direction = direction;
        this.content = content;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
exports.ChatMessage = ChatMessage;
//# sourceMappingURL=ChatMessage.js.map
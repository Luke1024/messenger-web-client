import { UserDto } from "./user-dto";

export interface ConversationStatusDto {
    conversationId:number;
    users:UserDto[];
    waitingMessages:number;
    direct:boolean;
}
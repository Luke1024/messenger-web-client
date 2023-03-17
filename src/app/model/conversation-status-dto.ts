import { UserDto } from "./user-dto";

export interface ConversationStatusDto {
    conversationId:number;
    users:string;
    waitingMessages:number;
    direct:boolean;
}
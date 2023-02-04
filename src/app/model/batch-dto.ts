import { MessageDto } from "./message-dto";

export interface BatchDto {
    id:number;
    messageDtoList:MessageDto[];
}
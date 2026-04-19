import { BaseConsumer } from "../../../shared/messaging/BaseConsumer";
import { ConsumeMessage } from "amqplib";

export class Consumer extends BaseConsumer {
    
    async handle(msg: ConsumeMessage): Promise<void> {
        console.log(msg.content);
    }
}
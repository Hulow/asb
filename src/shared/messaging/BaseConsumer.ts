import amqp from "amqplib";
import { ConsumeMessage } from "amqplib";

export abstract class BaseConsumer {
    protected channel: amqp.Channel;
    protected queueName: string;

    constructor(channel: amqp.Channel, queueName: string) {
        this.channel = channel;
        this.queueName = queueName
    }

    abstract handle(msg: ConsumeMessage): Promise<void>

    async consume() {
        await this.channel.consume(this.queueName, async(msg: any)=> {
            if (!msg) return;
            try {  
                await this.handle(msg);
                this.channel.ack(msg)

            } catch(err) {
                console.log(err)
            }
        })
    }
}
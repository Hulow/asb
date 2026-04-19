import amqp from "amqplib";

export abstract class BaseProducer {
    protected channel: amqp.Channel;
    protected queueName: string;

    constructor(channel: amqp.Channel, queueName: string) {
        this.channel = channel;
        this.queueName = queueName
    }
    
    protected publish(msg: string) {
        this.channel.sendToQueue(
            this.queueName,
            Buffer.from(msg)
        );
    }
}
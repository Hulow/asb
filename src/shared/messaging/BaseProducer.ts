import amqp from "amqplib";

export abstract class BaseProducer {
    protected channel: amqp.Channel;

    constructor(channel: amqp.Channel) {
        this.channel = channel;
    }
    
    protected publish(router: string, routingKey: string, msg: string) {
        this.channel.publish(
            router,
            routingKey,
            Buffer.from(msg)
        );
    }
}
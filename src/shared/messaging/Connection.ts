import amqp from "amqplib";
import { Config } from "../../config"

export class RabbitMQConnection {
    private connection!: amqp.ChannelModel;
    private channel!: amqp.Channel;
    private config: Config

    constructor(config: Config) {
        this.config = config
    }

    async init(): Promise<void> {
        this.connection = await amqp.connect(this.config.rabbitMQUri);
        this.channel = await this.connection.createChannel();
    }

    async addQueue(queueName: string): Promise<void> {
        this.channel.assertQueue(queueName, {
            durable: true,
        })
    }

    getChannel(): amqp.Channel {
        return this.channel;
    }
}
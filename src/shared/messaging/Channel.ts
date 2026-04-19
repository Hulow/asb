import amqp from "amqplib";
import { Config } from "../../config"

export class Channel {
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

    async purgeQueue() {
        await this.channel.purgeQueue('pixelQueue')
    }

    async addExchange(): Promise<void> {
        await this.channel.assertExchange(
            "pixel", 
            "topic", 
            {
                durable: true,
            }
        )
    }

    async addQueue(): Promise<void> {
        await this.channel.assertQueue(
            "pixelQueue",
            {
                durable: true
            }
        )
    }

    async bindQueue(): Promise<void> {
        await this.channel.bindQueue(
            'pixelQueue',
            "pixel", 
            "pixel.created"
        );
    }

    getChannel(): amqp.Channel {
        return this.channel;
    }
}
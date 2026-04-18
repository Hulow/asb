import amqp from "amqplib";

class Broker {
    private connection!: amqp.ChannelModel;
    private channel!: amqp.Channel;
    private queueName!: string;

    constructor(queueName: string) {
        this.queueName = queueName;
    }

    async init() {
        this.connection = await amqp.connect("amqp://admin:admin@localhost:5672");
        this.channel = await this.connection.createChannel();

        await this.channel.assertQueue(this.queueName, {
            durable: true,
        });
    }

    sendMsg(msg: string) {
        this.channel.sendToQueue(
            this.queueName,
            Buffer.from(msg)
        );
    }

    consume() {
        this.channel.consume(this.queueName, (msg) => {
            if (msg) {
                console.log("Received:", msg.content.toString());
                this.channel.ack(msg);
            }
        });
    }
}

async function main() {
    const broker = new Broker("test-queue");

    await broker.init();

    broker.consume(); 
    broker.sendMsg("ddd");
}

main().catch(console.error);
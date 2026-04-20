import { Channel } from "./src/shared/messaging/Channel";
import { Consumer } from "./src/pixel/adapters/messaging/Consumer";
import { Producer } from "./src/pixel/adapters/messaging/Producer";
import { config } from "./src/config"

async function main() {
    const queueName = 'pixelQueue';

    const connection = new Channel(config);
    await connection.init();
    await connection.addExchange();
    await connection.addQueue();
    await connection.bindQueue();
    
    const channel = connection.getChannel();
    const consumer = new Consumer(channel, queueName);

    const producer = new Producer(channel);
    await consumer.consume()

    await producer.producePixel(
        'pixel',
        'pixel.created',
        JSON.stringify({ message: "message" })
    );
}

main().catch(console.error);
import { RabbitMQConnection } from "./src/shared/messaging/Connection";
import { Consumer } from "./src/pixel/adapters/messaging/Consumer";
import { Producer } from "./src/pixel/adapters/messaging/Producer";
import { config } from "./src/config"

async function main() {
    const queueName = 'new-queue';

    const connection = new RabbitMQConnection(config);
    await connection.init();
    await connection.addQueue(queueName);
    
    const channel = connection.getChannel();
    const consumer = new Consumer(channel, queueName);

     const producer = new Producer(channel, queueName);
    await producer.producePixel('msg pusblished from pixel');

    await consumer.consume()

}

main().catch(console.error);
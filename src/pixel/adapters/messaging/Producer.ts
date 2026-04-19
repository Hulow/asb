import { BaseProducer } from "../../../shared/messaging/BaseProducer";

export class Producer extends BaseProducer {
    async producePixel(router: string, routingKey: string, msg: string): Promise<void> {
        this.publish(router, routingKey, msg);
    }
}
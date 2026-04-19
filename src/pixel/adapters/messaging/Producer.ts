import { BaseProducer } from "../../../shared/messaging/BaseProducer";

export class Producer extends BaseProducer {
    async producePixel(msg: string): Promise<void> {
        this.publish(msg);
    }
}
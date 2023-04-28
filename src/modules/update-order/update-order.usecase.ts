import { prismaClient } from "../../infra/database/prismaClient";
import { KafkaSendMessage } from "../../infra/providers/kafka/producer";

type UpdateOrderRequest = {
  id: string;
  status: string;
};

export class UpdateOrderUseCase {
  constructor() {}

  async execute(data: UpdateOrderRequest) {
    const orderUpdate = await prismaClient.order.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });

    const kafkaMessage = new KafkaSendMessage();
    await kafkaMessage.execute("ORDER_STATUS", {
      customerId: orderUpdate.id,
      status: orderUpdate.status,
    });
  }
}

import { prismaClient } from "../../infra/database/prismaClient";

type CreateOrderRequest = {
  customerId: string;
  status: string;
  items: [{ productId: string; quantity: number }];
};

export class CreateOrderUseCase {
  constructor() {}

  async execute(data: CreateOrderRequest) {
    const order = await prismaClient.order.create({
      data: {
        customerId: data.customerId,
        status: "AGUARDANDO_PAGAMENTO",
        OrderItems: {
          create: data.items,
        },
      },
    });
    console.log(order, "ORDER");
    return order;
  }
}

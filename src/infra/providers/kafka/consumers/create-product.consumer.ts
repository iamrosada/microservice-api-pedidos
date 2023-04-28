import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumers";

type ProductConsumer = {
  code: string;
  id: string;
};

export async function createProductConsumer() {
  console.log("PRODUCT CONSUMER");
  const consumer = await kafkaConsumer("PRODUCT_CREATED");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const menssageToString = message.value!.toString();
      const product = JSON.parse(menssageToString) as ProductConsumer;

      //saving the data from client API to pedido API
      await prismaClient.product.create({
        data: {
          externalId: product.id,
          code: product.code,
        },
      });
    },
  });
}

createProductConsumer();

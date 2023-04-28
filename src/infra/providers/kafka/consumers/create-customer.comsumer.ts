import { prismaClient } from "../../../database/prismaClient";
import { kafkaConsumer } from "../kafka.consumers";

type CustomerConsumer = {
  email: string;
  id: string;
};

export async function createCustomerConsumer() {
  console.log("CUSTOMER CONSUMER");
  const consumer = await kafkaConsumer("CUSTOMER_CREATED");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const menssageToString = message.value!.toString();
      const customer = JSON.parse(menssageToString) as CustomerConsumer;

      //saving the data from client API to pedido API
      await prismaClient.customer.create({
        data: {
          externalId: customer.id,
          email: customer.email,
        },
      });
    },
  });
}

createCustomerConsumer();

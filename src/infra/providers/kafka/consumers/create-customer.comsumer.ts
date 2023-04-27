import { kafkaConsumer } from "../kafka.consumers";

export async function createCustomerConsumer() {
  console.log("CUSTOMER CONSUMER");
  const consumer = await kafkaConsumer("CUSTOMER_CREATED");
  await consumer.run({
    eachMessage: async ({ message }) => {
      const menssageToString = message.value?.toString();

      console.log(menssageToString);
    },
  });
}

createCustomerConsumer();

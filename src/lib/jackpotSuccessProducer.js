import { Kafka ,Partitioners} from "kafkajs";

const jackpotSuccessProducer = async (username) => {
  const kafka = new Kafka({
    clientId: "safariheat",
    brokers: ['localhost:9092'], // Replace with your Kafka broker(s) configuration
  });

  const betProducer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
  await betProducer.connect();

  await betProducer.send({
    topic: "jackpotsuccess",
    messages: [{value:JSON.stringify({jackpot:334.34, win_username:username})}],
  });

  await betProducer.disconnect();
};

export default jackpotSuccessProducer;

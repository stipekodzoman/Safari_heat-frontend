import { Kafka ,Partitioners} from "kafkajs";

const betProducer = async (bet, username) => {
  const kafka = new Kafka({
    clientId: "safariheat",
    brokers: ['localhost:9092'], // Replace with your Kafka broker(s) configuration
  });
  
  const betProducer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
  await betProducer.connect();

  await betProducer.send({
    topic: "bet_"+username,
    messages: [{value:JSON.stringify({bet:bet})}],
  });

  await betProducer.disconnect();
};

export default betProducer;

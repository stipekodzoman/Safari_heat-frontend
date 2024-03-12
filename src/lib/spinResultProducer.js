import { Kafka ,Partitioners} from "kafkajs";

const spinResultProducer = async (username,lines,bet,spin_type, pay_lines,winning) => {
  const kafka = new Kafka({
    clientId: "safariheat",
    brokers: ['localhost:9092'], // Replace with your Kafka broker(s) configuration
  });

  const betProducer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
  await betProducer.connect();

  await betProducer.send({
    topic: "spinresult_"+username,
    messages: [{value:JSON.stringify({lines:lines,bet:bet,spin_type:spin_type,pay_lines:pay_lines,winning:winning})}],
  });

  await betProducer.disconnect();
};

export default spinResultProducer

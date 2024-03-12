import jackpotConsumerRun from "./jackpotConsumer.js";
import majorAndMinorConsumerRun from "./majorAndMinorConsumer.js";
import { Kafka } from "kafkajs";
const runKafka = async()=>{
    try{
        const kafka = new Kafka({
            clientId: "safariheat",
            brokers: ['localhost:9092'], 
        });
        await jackpotConsumerRun(kafka)
        await majorAndMinorConsumerRun(kafka)
        
    }catch(error){
        console.log(error)
    }
    
}

export default runKafka

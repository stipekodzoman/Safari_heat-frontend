
const jackpotConsumerRun=async(kafka)=> {
    // await createTopic("bet_"+username, 1,1)
    const jackpotConsumer = kafka.consumer({ groupId: "jackpot"});
    await jackpotConsumer.subscribe({ topic: "jackpot", fromBeginning: false });
    
    await jackpotConsumer.run({
        eachMessage: async ({ topic,message }) => {
            try{
                const {jackpot}=JSON.parse(message.value.toString());
                console.log(jackpot)
            // Use this data for some processing

            }catch(error){
                console.log("Error occured while processing message")
                console.log(error)
            }
            
        },
    });
    console.log("-------------->jackpot consumer is listening....")
}

export default jackpotConsumerRun
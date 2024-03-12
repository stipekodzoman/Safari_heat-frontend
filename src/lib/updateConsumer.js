const updateConsumerRun=async(kafka,username)=> {
    // await createTopic("bet_"+username, 1,1)
    const updateConsumer = kafka.consumer({ groupId: "update"+username});
    await updateConsumer.subscribe({ topic: "update"+username, fromBeginning: false });
    
    await updateConsumer.run({
        eachMessage: async ({ topic,message }) => {
            try{
                const {balance}=JSON.parse(message.value.toString());
                console.log(balance)
            // Use this data for some processing

            }catch(error){
                console.log("Error occured while processing message")
                console.log(error)
            }
            
        },
    });
    console.log("-------------->update consumer is listening....")
}

export default updateConsumerRun
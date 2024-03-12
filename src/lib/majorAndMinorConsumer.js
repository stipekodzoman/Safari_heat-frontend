
const majorAndMinorConsumerRun=async(kafka)=> {
    // await createTopic("bet_"+username, 1,1)
    const majorAndMinorConsumer = kafka.consumer({ groupId: "major_minor"});
    await majorAndMinorConsumer.subscribe({ topic: "major_minor", fromBeginning: false });
    
    await majorAndMinorConsumer.run({
        eachMessage: async ({ topic,message }) => {
            try{
                const {major,minor}=JSON.parse(message.value.toString());

            // Use this data for some processing

            }catch(error){
                console.log("Error occured while processing message")
                console.log(error)
            }
            
        },
    });
    console.log("-------------->major and minor consumer is listening....")
}
export default majorAndMinorConsumerRun
export const increaseBalance=(winning:number,setBalance: React.Dispatch<React.SetStateAction<number>>)=>{
    // const divider=parseFloat((100/winning).toFixed(2))
    let alt=0.0
    if(winning<0.2){
        setBalance((prev)=>parseFloat((prev+winning).toFixed(2)))
    }else{
        const intervalId=setInterval(()=>{
            
            alt+=winning/50+0.01
            if(alt>=winning){
                clearInterval(intervalId)
                setBalance((prev)=>parseFloat((prev+winning/50+0.01-alt+winning).toFixed(2)))
            }else{
                setBalance((prev)=>parseFloat((prev+winning/50+0.01).toFixed(2)))
            }
        },50)
    }
    
}
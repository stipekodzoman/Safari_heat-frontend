import { PAYLINES } from "../constants/paylines"
let winning=0.0
const get_winning_paylines=(result1:String[],result2:String[],result3:String[],result4:String[],result5:String[],line:number,betValue:number)=>{
    
    const scatter_winning=get_scatter_winning(result1,result2,result3,result4,result5,betValue)
    const general_winning=get_general_winning(result1,result2,result3,result4,result5,line,betValue)
    let result:number=winning
    winning=0.0
    return {scatter_winning,general_winning,result}
}

const get_scatter_winning=(result1:String[],result2:String[],result3:String[],result4:String[],result5:String[],betValue:number)=>{
    let count=0
    let locations: number[][]=[]
    locations[0]=[]
    locations[1]=[]
    locations[2]=[]
    locations[3]=[]
    locations[4]=[]
    count+=result1.filter((value) => value === "tree").length;
    count+=result2.filter((value) => value === "tree").length;
    count+=result3.filter((value) => value === "tree").length;
    count+=result4.filter((value) => value === "tree").length;
    count+=result5.filter((value) => value === "tree").length;
    result1.map((value,index) =>{
        if (value==="tree"){
            locations[0].push(index)
        }
    })
    result2.map((value,index) =>{
        if (value==="tree"){
            locations[1].push(index)
        }
    })
    result3.map((value,index) =>{
        if (value==="tree"){
            locations[2].push(index)
        }
    })
    result4.map((value,index) =>{
        if (value==="tree"){
            locations[3].push(index)
        }
    })
    result5.map((value,index) =>{
        if (value==="tree"){
            locations[4].push(index)
        }
    })
    if (count==2){
        winning+=betValue*2
    }
    if (count==3){
        winning+=betValue*5
    }
    if (count==4){
        winning+=betValue*20
    }
    if (count==5){
        winning+=betValue*500
    }
    // console.log(winning)
    return locations
}

const get_general_winning=(result1:String[],result2:String[],result3:String[],result4:String[],result5:String[],line:number,betValue:number)=>{
    let winned_paylines=new Array()
    PAYLINES.map((payline,index)=>{
        let wild_winning=0.0
        let wild_winning_count=0
        let general_winning=0.0
        let general_winning_count=0
        if (result1[payline[0]]==="lion"&&result2[payline[1]]&&"lion"){
            wild_winning_count=2
            wild_winning=betValue/line*10
            if(result1[payline[0]]==="lion"&&result3[payline[2]]&&"lion"){
                wild_winning_count=3
                wild_winning=betValue/line*250
                if(result1[payline[0]]==="lion"&&result4[payline[3]]&&"lion"){
                    wild_winning_count=4
                    wild_winning=betValue/line*2500
                    if(result1[payline[0]]==="lion"&&result5[payline[4]]&&"lion"){
                        wild_winning_count=5
                        wild_winning=betValue/line*10000
                    }
                }
            }
        }else if (result1[payline[0]]==="lion"){
            if(result2[payline[1]]==="elephant"){
                general_winning_count=2
                general_winning=betValue/line*2*2
                if(result3[payline[2]]==="elephant"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*25*2
                    if(result4[payline[3]]==="elephant"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*125*2
                        if(result5[payline[4]]==="elephant"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*750*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="rhino"){
                general_winning_count=2
                general_winning=betValue/line*2*2
                if(result3[payline[2]]==="rhino"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*25*2
                    if(result4[payline[3]]==="rhino"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*125*2
                        if(result5[payline[4]]==="rhino"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*750*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="zebra"){
                if(result3[payline[2]]==="zebra"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*15*2
                    if(result4[payline[3]]==="zebra"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*75*2
                        if(result5[payline[4]]==="zebra"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*250*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="zebra"){
                if(result3[payline[2]]==="zebra"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*15*2
                    if(result4[payline[3]]==="zebra"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*75*2
                        if(result5[payline[4]]==="zebra"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*250*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="bison"){
                if(result3[payline[2]]==="bison"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*15*2
                    if(result4[payline[3]]==="bison"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*75*2
                        if(result5[payline[4]]==="bison"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*250*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="flamingo"){
                if(result3[payline[2]]==="flamingo"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*20*2
                    if(result4[payline[3]]==="flamingo"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*100*2
                        if(result5[payline[4]]==="flamingo"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*500*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="king"){
                if(result3[payline[2]]==="king"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*10*2
                    if(result4[payline[3]]==="king"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*40*2
                        if(result5[payline[4]]==="king"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*150*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="ace"){
                if(result3[payline[2]]==="ace"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*10*2
                    if(result4[payline[3]]==="ace"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*40*2
                        if(result5[payline[4]]==="ace"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*150*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="queen"){
                if(result3[payline[2]]==="queen"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*5*2
                    if(result4[payline[3]]==="queen"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*30*2
                        if(result5[payline[4]]==="queen"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*125*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="jack"){
                if(result3[payline[2]]==="jack"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*5*2
                    if(result4[payline[3]]==="jack"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*25*2
                        if(result5[payline[4]]==="jack"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*100*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="ten"){
                if(result3[payline[2]]==="ten"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*5*2
                    if(result4[payline[3]]==="ten"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*25*2
                        if(result5[payline[4]]==="ten"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*100*2
                        }
                    }
                }
            }
            if(result2[payline[1]]==="nine"){
                general_winning_count=2
                general_winning=betValue/line*2*2
                if(result3[payline[2]]==="nine"||result3[payline[2]]==="lion"){
                    general_winning_count=3
                    general_winning=betValue/line*5*2
                    if(result4[payline[3]]==="nine"||result4[payline[3]]==="lion"){
                        general_winning_count=4
                        general_winning=betValue/line*25*2
                        if(result5[payline[4]]==="nine"||result5[payline[4]]==="lion"){
                            general_winning_count=5
                            general_winning=betValue/line*100*2
                        }
                    }
                }
            }
        }else{
            if(result1[payline[0]]==="elephant"){
                let is_double=false
                if(result2[payline[1]]==="elephant"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="elephant"){
                        general_winning_count=2
                        general_winning=betValue/line*2
                    }
                    if(result2[payline[1]]==="lion"){
                        general_winning_count=2
                        general_winning=betValue/line*2*2
                        is_double=true
                    }
                    if(result3[payline[2]]==="elephant"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="elephant"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*25*2
                            }else{
                                general_winning=betValue/line*25
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*25*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="elephant"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="elephant"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*125*2
                                }else{
                                    general_winning=betValue/line*125
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*125*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="elephant"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="elephant"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*750*2
                                    }else{
                                        general_winning=betValue/line*750
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*750*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
            if(result1[payline[0]]==="rhino"){
                let is_double=false
                if(result2[payline[1]]==="rhino"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="rhino"){
                        general_winning_count=2
                        general_winning=betValue/line*2
                    }
                    if(result2[payline[1]]==="lion"){
                        general_winning_count=2
                        general_winning=betValue/line*2*2
                        is_double=true
                    }
                    if(result3[payline[2]]==="rhino"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="rhino"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*25*2
                            }else{
                                general_winning=betValue/line*25
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*25*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="rhino"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="rhino"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*125*2
                                }else{
                                    general_winning=betValue/line*125
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*125*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="rhino"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="rhino"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*750*2
                                    }else{
                                        general_winning=betValue/line*750
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*750*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
            if(result1[payline[0]]==="zebra"){
                let is_double=false
                if(result2[payline[1]]==="zebra"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="lion"){
                        is_double=true
                    }
                    if(result3[payline[2]]==="zebra"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="zebra"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*15*2
                            }else{
                                general_winning=betValue/line*15
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*15*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="zebra"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="zebra"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*75*2
                                }else{
                                    general_winning=betValue/line*75
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*75*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="zebra"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="zebra"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*250*2
                                    }else{
                                        general_winning=betValue/line*250
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*250*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
            if(result1[payline[0]]==="bison"){
                let is_double=false
                if(result2[payline[1]]==="bison"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="lion"){
                        is_double=true
                    }
                    if(result3[payline[2]]==="bison"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="bison"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*15*2
                            }else{
                                general_winning=betValue/line*15
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*15*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="bison"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="bison"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*75*2
                                }else{
                                    general_winning=betValue/line*75
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*75*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="bison"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="bison"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*250*2
                                    }else{
                                        general_winning=betValue/line*250
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*250*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
            if(result1[payline[0]]==="flamingo"){
                let is_double=false
                if(result2[payline[1]]==="flamingo"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="lion"){
                        is_double=true
                    }
                    if(result3[payline[2]]==="flamingo"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="flamingo"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*20*2
                            }else{
                                general_winning=betValue/line*20
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*20*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="flamingo"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="flamingo"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*100*2
                                }else{
                                    general_winning=betValue/line*100
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*100*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="flamingo"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="flamingo"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*500*2
                                    }else{
                                        general_winning=betValue/line*500
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*500*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
            if(result1[payline[0]]==="king"){
                let is_double=false
                if(result2[payline[1]]==="king"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="lion"){
                        is_double=true
                    }
                    if(result3[payline[2]]==="king"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="king"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*10*2
                            }else{
                                general_winning=betValue/line*10
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*10*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="king"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="king"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*40*2
                                }else{
                                    general_winning=betValue/line*40
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*40*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="king"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="king"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*150*2
                                    }else{
                                        general_winning=betValue/line*150
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*150*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
            if(result1[payline[0]]==="ace"){
                let is_double=false
                if(result2[payline[1]]==="ace"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="lion"){
                        is_double=true
                    }
                    if(result3[payline[2]]==="ace"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="ace"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*10*2
                            }else{
                                general_winning=betValue/line*10
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*10*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="ace"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="ace"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*40*2
                                }else{
                                    general_winning=betValue/line*40
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*40*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="ace"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="ace"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*150*2
                                    }else{
                                        general_winning=betValue/line*150
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*150*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
            if(result1[payline[0]]==="queen"){
                let is_double=false
                if(result2[payline[1]]==="queen"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="lion"){
                        is_double=true
                    }
                    if(result3[payline[2]]==="queen"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="queen"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*5*2
                            }else{
                                general_winning=betValue/line*5
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*5*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="queen"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="queen"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*30*2
                                }else{
                                    general_winning=betValue/line*30
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*30*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="queen"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="queen"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*125*2
                                    }else{
                                        general_winning=betValue/line*125
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*125*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
            if(result1[payline[0]]==="jack"){
                let is_double=false
                if(result2[payline[1]]==="jack"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="lion"){
                        is_double=true
                    }
                    if(result3[payline[2]]==="jack"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="jack"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*5*2
                            }else{
                                general_winning=betValue/line*5
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*5*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="jack"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="jack"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*25*2
                                }else{
                                    general_winning=betValue/line*25
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*25*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="jack"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="jack"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*100*2
                                    }else{
                                        general_winning=betValue/line*100
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*100*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
            if(result1[payline[0]]==="ten"){
                let is_double=false
                if(result2[payline[1]]==="ten"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="lion"){
                        is_double=true
                    }
                    if(result3[payline[2]]==="ten"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="ten"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*5*2
                            }else{
                                general_winning=betValue/line*5
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*5*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="ten"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="ten"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*25*2
                                }else{
                                    general_winning=betValue/line*25
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*25*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="ten"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="ten"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*100*2
                                    }else{
                                        general_winning=betValue/line*100
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*100*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
            if(result1[payline[0]]==="nine"){
                let is_double=false
                if(result2[payline[1]]==="nine"||result2[payline[1]]==="lion"){
                    if(result2[payline[1]]==="nine"){
                        general_winning_count=2
                        general_winning=betValue/line*2
                    }
                    if(result2[payline[1]]==="lion"){
                        general_winning_count=2
                        general_winning=betValue/line*2*2
                        is_double=true
                    }
                    if(result3[payline[2]]==="nine"||result3[payline[2]]==="lion"){
                        if(result3[payline[2]]==="nine"){
                            general_winning_count=3
                            if (is_double){
                                general_winning=betValue/line*5*2
                            }else{
                                general_winning=betValue/line*5
                            }
                        }
                        if(result3[payline[2]]==="lion"){
                            general_winning_count=3
                            general_winning=betValue/line*5*2
                            is_double=true
                        }
                        if(result4[payline[3]]==="nine"||result4[payline[3]]==="lion"){
                            if(result4[payline[3]]==="nine"){
                                general_winning_count=4
                                if (is_double){
                                    general_winning=betValue/line*25*2
                                }else{
                                    general_winning=betValue/line*25
                                }
                            }
                            if(result4[payline[3]]==="lion"){
                                general_winning_count=4
                                general_winning=betValue/line*25*2
                                is_double=true
                            }
                            if(result5[payline[4]]==="nine"||result5[payline[4]]==="lion"){
                                if(result5[payline[4]]==="nine"){
                                    general_winning_count=5
                                    if (is_double){
                                        general_winning=betValue/line*100*2
                                    }else{
                                        general_winning=betValue/line*100
                                    }
                                }
                                if(result5[payline[4]]==="lion"){
                                    general_winning_count=5
                                    general_winning=betValue/line*100*2
                                    is_double=true
                                }
                                
                            }
                        }
                    }
                }
            }
        }
        if (general_winning_count!=0 || wild_winning_count!=0){
            if (general_winning>=wild_winning){
                winning+=general_winning
                winned_paylines.push({count:general_winning_count,payline:index})
            }else{
                winning+=wild_winning
                winned_paylines.push({count:wild_winning_count,payline:index})
            }
        }
    })
    return winned_paylines
}
export default get_winning_paylines

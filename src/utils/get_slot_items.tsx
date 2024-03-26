import { INITIAL_ITEMS } from "../constants/iinitial_items.js"
import { generate_random_numbers } from "./generate_random_numbers.js"
export const get_slot_items = (count:number)=>{
    const index_list=generate_random_numbers(count)
    const items=new Array()
    index_list.map((index:number)=>{
        items.push(INITIAL_ITEMS[index])
    })
    return items
}
export const get_initial_items=()=>{
    const index_list=generate_random_numbers(3)
    const items=new Array()
    index_list.map((index:number)=>{
        items.push(INITIAL_ITEMS[index])
    })
    return items
}
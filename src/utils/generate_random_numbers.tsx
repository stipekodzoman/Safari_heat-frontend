export const generate_random_numbers=(count:number)=>{
    let numbers = [];
    for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * 100);
        numbers.push(randomNumber);
    }
    return numbers
}
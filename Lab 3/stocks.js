const axios = require('axios');
const people = require("./people");

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;
}

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
}

async function listShareholders(stockName){
    //input handling
    if(typeof stockName != 'string'){
        throw 'Input must be a string!';
    }
    stockName = stockName.trim();
    if(stockName.length == 0){
        throw 'Input must not be an empty string!';
    }
    let stock = {};
    const stocks = await getStocks();
    for(let i=0; i<stocks.length; i++){
        if(stockName === stocks[i].stock_name.trim()){
            stock = stocks[i];
        }
    }
    if(Object.keys(stock).length === 0){
        throw 'Stock not found!';
    }
    //function
    let shareholders = stock.shareholders;
    for(let i=0; i<shareholders.length; i++){
        let person = await people.getPersonById(shareholders[i].userId);
        let shares = shareholders[i].number_of_shares;
        delete shareholders[i].userId;
        delete shareholders[i].number_of_shares;
        shareholders[i].first_name = person.first_name;
        shareholders[i].last_name = person.last_name;
        shareholders[i].number_of_shares = shares;
    }
    stock.shareholders = shareholders;
    return stock;
}

async function totalShares(stockName){
    //input handling
    if(typeof stockName != 'string'){
        throw 'Input must be a string!';
    }
    stockName = stockName.trim();
    if(stockName.length == 0){
        throw 'Input must not be an empty string!';
    }
    let stock = {};
    const stocks = await getStocks();
    for(let i=0; i<stocks.length; i++){
        if(stockName === stocks[i].stock_name.trim()){
            stock = stocks[i];
        }
    }
    if(Object.keys(stock).length === 0){
        throw 'Stock not found!';
    }
    //function
    let shareholders = stock.shareholders;
    let shares = 0;
    for(let i=0; i<shareholders.length; i++){
        shares += shareholders[i].number_of_shares;
    }
    if(shareholders.length > 1){
        return `${stockName}, has ${shareholders.length} shareholders that own a total of ${shares} shares.`;
    }else if(shareholders.length == 1){
        return `${stockName}, has ${shareholders.length} shareholder that owns a total of ${shares} shares.`;
    }else{
        return `${stockName} currently has no shareholders.`;
    }
}

async function listStocks(firstName, lastName){
    //input handling
    if(typeof firstName != 'string'){
        throw 'Input1 must be of type string!';
    }
    if(typeof lastName != 'string'){
        throw 'Input2 must be of type string!';
    }
    firstName = firstName.trim();
    lastName = lastName.trim();
    if(firstName.length == 0){
        throw 'Input1 must not be an empty string!';
    }
    if(lastName.length == 0){
        throw 'Input2 must not be an empty string!';
    }
    const people = await getPeople();
    let id = '';
    for(let i=0; i<people.length; i++){
        if(people[i].first_name.trim() === firstName && people[i].last_name.trim() === lastName){
            id = people[i].id;
        }
    }
    if(id.length == 0){
        throw 'Person not found!';
    }
    //function
    const stocks = await getStocks();
    let result = [];
    for(let i=0; i<stocks.length; i++){
        const shareholders = stocks[i].shareholders;
        for(let j=0; j<shareholders.length; j++){
            if(shareholders[j].userId === id){
                const entry = {};
                entry.stock_name = stocks[i].stock_name;
                entry.number_of_shares = shareholders[j].number_of_shares;
                result.push(entry);
            }
        }
    }
    if(result.length == 0){
        throw 'Person does not own any shares in a company!';
    }
    return result;
}

async function getStockById(id){
    //input handling
    if(typeof id != 'string'){
        throw 'Input must be of type string!';
    }
    id = id.trim();
    if(id.length == 0){
        throw 'Input must not be an empty string!';
    }
    //function
    const stocks = await getStocks();
    for(let i=0; i<stocks.length; i++){
        if(stocks[i].id === id){
            return stocks[i];
        }
    }
    throw 'Stock not found!';
}

module.exports = {listShareholders, totalShares, listStocks, getStockById};
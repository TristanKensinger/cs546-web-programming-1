const people = require("./people");
const stocks = require("./stocks");

async function main(){
    //getPersonById
    console.log('getPersonById')
    try{
        const personData = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log(personData);
    }catch(e){
        console.log(e);
    }
    //sameEmail
    console.log('sameEmail')
    try{
        const sameEmails = await people.sameEmail("HARVARD.EDU");
        console.log(sameEmails);
    }catch(e){
        console.log(e);
    }
    //manipulateIp
    console.log('manipulateIp')
    try{
        const ip = await people.manipulateIp();
        console.log(ip);
    }catch(e){
        console.log(e);
    }
    //sameBirthday
    console.log('sameBirthday')
    try{
        const birthdays = await people.sameBirthday(8, '   ');
        console.log(birthdays);
    }catch(e){
        console.log(e);
    }
    //listShareholders
    console.log('listShareholders')
    try{
        const shareholders = await stocks.listShareholders('   ');
        console.log(shareholders);
    }catch(e){
        console.log(e);
    }
    //totalShares
    console.log('totalShares')
    try{
        const totalShares = await stocks.totalShares();
        console.log(totalShares);
    }catch(e){
        console.log(e);
    }
    //listStocks
    console.log('listStocks')
    try{
        const allStocks = await stocks.listStocks(1,2);
        console.log(allStocks);
    }catch(e){
        console.log(e);
    }
    //getStockById
    console.log('getStockById')
    try{
        const stockInfo = await stocks.getStockById("f652F797-7ca0-4382-befb-2ab8be914ff0");
        console.log(stockInfo);
    }catch(e){
        console.log(e);
    }
}

main();
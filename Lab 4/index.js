const bands = require('./data/bands');
const connection = require('./config/mongoConnection');

async function main(){
    //1. Create a band of your choice.
    let band1;
    try {
        band1 = await bands.create('Hall & Oates', ['Pop rock', 'Blue-eyed soul', 'Rhythm and blues'], 'http://www.hallandoates.com',
        'Atlantic', ['Daryl Hall', 'John Oates'], 1970);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //2. Log the newly created band. (Just that band, not all bands)
    console.log(band1);

    //3. Create another band of your choice.
    let band2;
    try {
        band2 = await bands.create('Creedence Clearwater Revival', ['Country music', 'Rock'], 'http://www.creedence-revisited.com',
        'Fantasy', ['John Fogerty', 'Tom Fogerty', 'Stu Cook', 'Doug Clifford'], 1967);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //4. Query all bands, and log them all
    try {
        let allBands1 = await bands.getAll();
        console.log(allBands1);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //5. Create the 3rd band of your choice.
    let band3;
    try {
        band3 = await bands.create('Wham!', ['Pop'], 'http://www.wikipedia.org/wiki/Wham!.com', 'Columbia',
        ['George Micheal', 'Andrew Ridgeley'], 1981);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //6. Log the newly created 3rd band. (Just that band, not all bands)
    console.log(band3);

    //7. Rename the first band
    let band1New;
    try {
        band1New = await bands.rename(band1._id, 'Oates & Hall');
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //8. Log the first band with the updated name. 
    console.log(band1New);

    //9. Remove the second band you created.
    try {
        let output = await bands.remove(band2._id);
        console.log(output);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //10. Query all bands, and log them all
    try {
        let allBands2 = await bands.getAll();
        console.log(allBands2);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //11. Try to create a band with bad input parameters to make sure it throws errors.
    try {
        let band1Bad = await bands.create('Hall & Oates', [], 'http://www.hallandoates.com',
        'Atlantic', ['Daryl Hall', 'John Oates'], 1970);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //12. Try to remove a band that does not exist to make sure it throws errors.
    try {
        let output1 = await bands.remove('doesnotexist');
        console.log(output1);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //13. Try to rename a band that does not exist to make sure it throws errors.
    try {
        let band1NewBad = await bands.rename('badId', 'Oates & Hall');
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
    try {
        let band2NewBad = await bands.rename(band1._id, '          ');
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //15. Try getting a band by ID that does not exist to make sure it throws errors.
    try {
        let output2 = await bands.get('doesnotexist');
        console.log(output2);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    //close connection
    const db = await connection.connectToDb();
    await connection.closeConnection();
    console.log('Done!');
}   

main();
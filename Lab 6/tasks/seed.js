const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const bands = data.bands;
const albums = data.albums;

async function main() {
  const db = await dbConnection.connectToDb();
  await db.dropDatabase();

  //band1
  let band1;
  try {
    band1 = await bands.create('Hall & Oates', ['Pop rock', 'Blue-eyed soul', 'Rhythm and blues'], 'http://www.hallandoates.com',
    'Atlantic', ['Daryl Hall', 'John Oates'], 1970);
  } catch(e) {
    console.log('Got an error!');
    console.log(e);
  }

  //band2
  let band2;
  try {
    band2 = await bands.create('Creedence Clearwater Revival', ['Country music', 'Rock'], 'http://www.creedence-revisited.com',
    'Fantasy', ['John Fogerty', 'Tom Fogerty', 'Stu Cook', 'Doug Clifford'], 1967);
  } catch(e) {
    console.log('Got an error!');
    console.log(e);
  }

  //band3
  let band3;
  try {
    band3 = await bands.create('Wham!', ['Pop'], 'http://www.wikipedia.org/wiki/Wham!.com', 'Columbia',
    ['George Micheal', 'Andrew Ridgeley'], 1981);
  } catch(e) {
    console.log('Got an error!');
    console.log(e);
  }

  //band4
  let band4;
  try {
    band4 = await bands.create('Pink Floyd', ['Progressive Rock', 'Psychedelic rock', 'Classic Rock'], 'http://www.pinkfloyd.com',
    'EMI', ['Roger Waters', 'David Gilmour', 'Nick Mason', 'Richard Wright', 'Sid Barrett'], 1965);
  } catch(e) {
    console.log('Got an error!');
    console.log(e);
  }

  //band4 album1
  let band4album1;
  try {
    band4album1 = await albums.create(band4._id, 'Wish You Were Here', '09/12/1975', ['Shine On You Crazy Diamond, Pts. 1-5', 
    'Welcome to the Machine','Have a Cigar (Ft. Roy Harper)', 'Wish You Were Here','Shine On You Crazy Diamond, Pts. 6-9'], 3.36);
  } catch(e) {
    console.log('Got an error!');
    console.log(e);
  }

  //band4 album2
  let band4album2;
  try {
    band4album2 = await albums.create(band4._id, 'The Dark Side of the Moon', '03/01/1973', ['Brain Damage', 
    'Time', 'Money', 'Breathe', 'Eclipse'], 5);
  } catch(e) {
    console.log('Got an error!');
    console.log(e);
  }
  
  //remove band4albums
  // try {
  //   let newband4 = await albums.remove(band4album1._id.toString());
  //   console.log(newband4);
  // } catch(e) {
  //   console.log('Got an error!');
  //   console.log(e);
  // }
  
  //print all bands
  // try {
  //   let allBands = await bands.getAll();
  //   console.log(JSON.stringify(allBands, null, 4));
  // } catch(e) {
  //   console.log('Got an error!');
  //   console.log(e);
  // }

  console.log('Done seeding database');

  await dbConnection.closeConnection();
}

main();
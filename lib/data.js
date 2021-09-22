import fs from 'fs';
import path from 'path';

// get filepath to data directory
const dataDir = path.join(process.cwd(), 'data');

// function returns ids for all json objects in array
export function getAllIds() {
  // get filepath to json file
  let filePath = path.join(dataDir, 'users.json');
  // load json file contents
  let jsonString = fs.readFileSync(filePath, 'utf8');
  // convert string from file into json array object
  let jsonObj = JSON.parse(jsonString);

  filePath = path.join(dataDir, 'users2.json');
  jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonObj2 = JSON.parse(jsonString);

  let joinedObj = jsonObj.concat(jsonObj2);
  // use map() on array to extract just id properties into new array of obj values
  return joinedObj.map(item => {
    return {
      params: {
        id: item.id.toString()
      }
    }
  });
}

// function returns names and ids for all json objects in array, sorted by name property
export function getSortedList() {
// get filepath to json file
  let filePath = path.join(dataDir, 'users.json');
  // load json file contents
  let jsonString = fs.readFileSync(filePath, 'utf8');
  // convert string from file into json array object
  let jsonObj = JSON.parse(jsonString);

  filePath = path.join(dataDir, 'users2.json');
  jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonObj2 = JSON.parse(jsonString);

  let joinedObj = jsonObj.concat(jsonObj2);

  // use map() on array to extract just id + name properties into new array of obj values
  return joinedObj.map(item => {
    return {
      id: item.id.toString(),
      name: item.first_name + " " + item.last_name
    }
  });
}

export async function getData(idRequested) {
  // get filepath to json file
  let filePath = path.join(dataDir, 'users.json');
  // load json file contents
  let jsonString = fs.readFileSync(filePath, 'utf8');
  // convert string from file into json array object
  let jsonObj = JSON.parse(jsonString);

  filePath = path.join(dataDir, 'users2.json');
  jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonObj2 = JSON.parse(jsonString);

  let joinedObj = jsonObj.concat(jsonObj2);

  const objMatch = joinedObj.filter(obj => {
    return obj.id.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }

  const colorCompanions = joinedObj.filter(obj => {
    if (obj.fav_color === objReturned.fav_color){
      return obj;
    }
  })
  const colorCompanionIds = colorCompanions.map(obj => {
    return {
      id: obj.id.toString(),
      name: obj.first_name + " " + obj.last_name
    }
  }).filter(obj=> obj.id != idRequested);
  
  objReturned.color_companions = colorCompanionIds;
  // return object value found
  return objReturned;
}
export default function getRelatedUsers(){
}

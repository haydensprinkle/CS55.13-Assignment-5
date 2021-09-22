import fs from 'fs';
import path from 'path';

//use path to build a filepath to our data subdirectory
const dataDir = path.join(process.cwd(), "data");

// console.log(dataDir);

export default function handler(req, res) {
  res.status(200).json(jsonObj);
}

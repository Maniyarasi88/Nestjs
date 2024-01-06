import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { elementAt } from 'rxjs';
import { executionAsyncResource } from 'async_hooks';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.gethello1();
  }

  @Get('/json')
  getjson(): string {
    return this.appService.getjson();
  }
}

// .bind .call
// Replicationlag mongodb  -  Replication lag refers to the amount of time that it takes to copy (i.e. replicate) a write operation on the primary to a secondary. Some small delay period may .

// To solve increase  space of sec , network of server should be stable  , throw alter if exists more than 2 minutes  , Increase bandwidth between the primary and secondary.

// queue callback

// closure    A closure is a feature of JavaScript that allows inner functions to access the outer scope of a function

// hashedpassword  - differnt password

//set immediate


// sharding  - splitting large data sets into small data sets across multiple MongoDB instances.

// var LoginSchema = new Schema({attribut: String}, 
//   { shardkey: { at: 1, _user: 1 }}
//  )

// gridfs
// large files storing more than 16mb  . breaks file into small chunks 

// const db = client.db(dbName);
// const bucket = new mongodb.GridFSBucket(db, { bucketName: 'myCustomBucket' });
// fs.createReadStream('./meistersinger.mp3').
//      pipe(bucket.openUploadStream('meistersinger.mp3', {
//          chunkSizeBytes: 1048576,
//          metadata: { field: 'myField', value: 'myValue' }
//      }));



// {
// 	"_id" : ObjectId("561fc381e81346c82d6397bb"),
// 	"length" : 27847575,
// 	"chunkSize" : 1048576,
// 	"uploadDate" : ISODate("2015-10-15T15:17:21.819Z"),
// 	"md5" : "2459f1cdec4d9af39117c3424326d5e5",
// 	"filename" : "meistersinger.mp3"
// }

//   const cursor = bucket.find({});
// for await (const doc of cursor) {
//    console.log(doc);
// }


// file read opener
// multer - to accept the file as formdata  format from postman or client side  and the file can be taken from req.file
// reverse string
// function reverse1(str){
//   let r = "";
//   for(let i = str.length-1; i >= 0; i--){
//     r += str[i];
//   }
//   return r;
// }

// console.log(reverse1("javascript"))

// find least unique array elementAt

// for (const i of arr ){

// }

// for (var i = 0; i < 10; i++) {
//   console.log(i);   // print 0 to 9
//  // i is your integer
// }

// console.log(i);  // 10 



// for (let i = 0; i < 10; i++) {
//   console.log(i);   // print 0 to 9
//  // i is your integer
// }

// console.log(i);  // error


// console.log(1>2>3);  //prints false


// performance


// const obj = { name : "john" , mobile : "8888" }

// const obj1 = { mobile : '8888' , name : "john"}

// console.log(Object.entries(obj).sort().toString() ===
//             Object.entries(obj1).sort().toString())
            
//             for(const [key,value] of Object.entries(obj)){
//                 console.log(key);
//             }
            
//             console.log(Object.keys(obj));


// fetch('https://example.com')
//     .then(res => {
//       res.text()       // response body (=> Promise)
//       res.json()       // parse response body (=> Promise)
//       res.status       //=> 200
//       res.statusText   //=> 'OK'
//       res.redirected   //=> false
//       res.ok           //=> true
//       res.url          //=> 'https://new.example.com'
//       res.type         //=> 'basic'
//                        //   ('cors' 'default' 'error'
//                        //    'opaque' 'opaqueredirect')
//       res.headers.get('Content-Type')
// })


// fetch() is that it returns a javascript Promise, so you can write async code like this:

// let fetch = require('node-fetch');

// fetch('http://localhost', {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: '{}'
// }).then(response => {
//   return response.json();
// }).catch(err => {console.log(err);});

// nest js upgrade
// exception
// token oath , jwt
// mysql sp
// website
// splice 
// array operation  spread operator
// ngrx
// rest javascript
// see exceltojson in angular
// test case
// mail template


// print date of sat ,sun

// req.params

// sum of two array

//disad of redis cache



// const EventEmitter = require('events');
// const eventEmitter = new EventEmitter();
 
// eventEmitter.on('myEvent', (data) => {
//     console.log(data, '- FIRST');
// });
 
// console.log('Statement A');
 
// eventEmitter.on("myEvent", data => {
//     console.log(data, '- SECOND');
// });
 
// eventEmitter.emit('myEvent', 'Emitted Statement');
 
// console.log("Statement B");


// node-input-validator to validate data in express

// app.use(
//   cors({origin: ['http://localhost:8888', 'http://127.0.0.1:8888']})
// );


// deep cloning

// default memory in express js   
    //  default the memory limit in Node. js is 512MB
    //  These options are now documented officially by node. For a 2GB machine, you should probably use:

    //  NODE_OPTIONS=--max-old-space-size=1536   (set in environment variable)

// true+ true+ true * 3;


// promise states   - pending , fulfilled , rejected

// logger modules express js   - morgan

// log nest js  


// global objects in node js    - set time out , process , set immediate , exports  , console , require 


// const screens = {
//   "768": "large",
//   "200": "small"
// }

// const keys = Object.keys(screens).map(key => parseInt(key))
//                                        // OR Number(key)

// console.log(keys) // Output [200, 768]

// get methods available in aoi

// function in mysql , union , unionall , view use

// excel uplod postman  req.file
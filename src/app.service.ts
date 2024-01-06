import { Get, Injectable } from '@nestjs/common';
import { elementAt } from 'rxjs';

@Injectable()
export class AppService {
  arr5 = [
    {
      place: "san francisco",
      name: "jane",
    },
    {
      place: "san francisco",
      name: "jane",
    },
    {
      place: "new york",
      name: "james",
    },
  ];

  array = [3 ,5 ,2 ,8 ,1 , 9];
  arraystring = ["3" ,"5" ,"2" ,"8" ,"1" , "9"];
  getHello(): any {

    //find min and max elem in array
    const arr = [2, 9, 3, 5, 1];
    const v = arr.sort((a: any, b: any) => a - b)
    console.log("min max", [v[0], v[v.length - 1]]);

    //reverse
    const arrayreverse = [1, 2, 3, 4, 5, 6];
    console.log("reverse", arrayreverse.map((item, idx: any) => arrayreverse[arrayreverse.length - 1 - idx]));

    //count array occurence
    let countarray = [
      'geeks', 2, 'geeks', 2, 'Javascript', 4,
      'Javascript', 5, 'for', 6, 'Javascript', 1,
      'for', 5, 7, 8, 'for'
    ];
    const countarrayoutput = {};
    countarray.forEach(ele => {
      if (countarrayoutput[ele]) {
        countarrayoutput[ele] += 1;
      } else {
        countarrayoutput[ele] = 1;
      }
    })
    console.log(countarrayoutput, "countarrayoutput");

    //find sum of sub array
    var sumarr = [[1, 2, 3], [4, 5, 6]];
    var result = sumarr.map(item => item.reduce((a, b) => a + b));
    console.log(result);


    //find the element whose sum is 9 or given num (not exact one)
    const arraysum = [1, 3, 6, 5, 7, 2];
    const num = 9
    var obj = [];
    var obj1;

    arraysum.forEach((element, index) => {
      if (element + arraysum[index + 1] == num) {
        // obj.push([element + ',' + arraysum[index + 1]]);
        obj1 = element + ',' + arraysum[index + 1];
        element + ',' + arraysum[index + 1]
      }
      const num1 = arraysum.filter((x)=> x + element == num);
      if(num1 && num1.length > 0){
           num1.forEach((element1)=>{
          obj.push([element + ',' + element1])
      })
      }
    })
    console.log(obj1, "sum"); // find single object
    console.log(obj, "sum"); // find more matching sum


//sum of 2 arrays
    var arr7 = [1,2,3,4];
var arr2 = [1,1,1,2];

var squares = arr2.map((a, i) => a + arr7[i]);

console.log(squares);


    // separate negative positive
    const negarray = [2, 4, -45, 6, 0, -19, 19];
    console.log("negarray", negarray.sort((a, b) => a - b));


    // find unique array
    const uniqarray = [2, 4, 4, 2, 19, 18];
    console.log(uniqarray.filter((arr, index, item) => index == item.indexOf(arr)));


    // find unique array length
    console.log(uniqarray.filter((arr, index, item) => index == item.indexOf(arr)).length);


    // Find vowels count from given array of elements?
  //  const data = ['a','k','j','e','b','i','d','o'];
   
  //  const vowelset = ['a' , 'e'  , 'i' , 'o'  , 'u'] ;
  //   let count = 0;   
  //  data.forEach((element)=>{
  //      if(vowelset.indexOf(element) != -1){
  //           count++;
  //      }
  //  })
   
  //  console.log(count);

    console.log("array",this.array);
    console.log("slice",this.array.slice(0)); // does nothing
    console.log("slice",this.array.slice(2)); // Removes first 2 elements
    console.log("slice",this.array.slice(3)); // Removes first 3 elements
    console.log("slice",this.array.slice(0,2)); // Removes from index 0 to 1 and prints those removed
    console.log("slice",this.array.slice(-1)); //prints only last element 
    

//to print intersection of elements
    var arr3 = [1, 2 ,3 , 4];
     const arr4 = [3,4,5];

     arr3 = arr3.filter((x)=>  arr4.indexOf(x) != -1 )
  console.log(arr3 , "value");
  

    // yes
    // process
    // settime
    // settime1
    // setimemed

      
    console.log("yes");
    process.nextTick(()=>{
      console.log("process.net")
    })
     setTimeout(()=>{
      console.log("settime")
     });

     setImmediate(()=>{
      console.log("setimmmediate")
     });
    setTimeout(()=>{
      console.log("settime1")
     },1);

     console.log("yes1");
     process.nextTick(()=>{
       console.log("process.net1")
     })
    //  setInterval(()=>{
    //   console.log("setinterval")
    //  },3000);

    //  setImmediate(()=>{
    //   console.log("setimmmediate")
    //  });
    
    return v;
  }

  gethello1():any {
    var arr = [];

function startday(month , year , value) {
  var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
   var weekdays1 = ['Sunday', 'Saturday'];
  
//   var d = new Date(year, month-1, 10);
     const daycount = this.daysInMonth(month,year);
    while(value <= daycount){
         var d = new Date(year, month-1, value);
         const dayvalue = weekdays1[d.getDay()];
        //  console.log(daycount, )
         if(dayvalue == 'Saturday' || dayvalue == 'Sunday') {
             arr.push( value+'-'+month+'-'+year+','+ dayvalue)
         }
         value++;
    }
     return arr;
 } 

console.log(startday(11, 2023 , 1));

  }

   daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

  getjson(): any {
    // To find unique json
    console.log(this.arr5.filter((arr, index, item) => index == item.findIndex((x) => JSON.stringify(x) == JSON.stringify(arr))));


    //TO find unique and group same points
    var sum = [];
    const empdetails = [{ emp_id: 1, points: 5 }, { emp_id: 2, points: 10 }, { emp_id: 2, points: 7 }, { emp_id: 1, points: 9 }]
    empdetails.forEach(element => {
      if (sum && sum.length && sum.length > 0) {
        const a = sum.filter((x) => {
          if (x.emp_id && x.emp_id == element.emp_id) {
            x.points = x.points + element.points;
            return x;
          }
        })
        if (a.length == 0) {
          sum.push(element);
        }
      } else {
        sum.push(element);
      }
    })

    console.log("print sum", sum);
    console.log("slice",this.array.slice(2));


    //find whether object is empty
    var arr = {
      place: "new york",
      name: "james",
    }
   console.log(Object.keys(arr).length ==0)
  //  console.log(Object.entries(arr).length ==0)


//find returns 1st matching object and doesnot go all object if it finds  but filter(all matching in array format)
  const restaurants = 
  [
    {"restaurant" : { "name" : "McDonald's", "food" : "chicken" }},
    {"restaurant" : { "name" : "KFC",        "food" : "chicken" }},
    {"restaurant" : { "name" : "Pizza Hut",  "food" : "pizza" }}
  ];
  
console.log( restaurants.find(item => {
   return item.restaurant.food == 'chicken'
}));

    return "v";
  }

  @Get('/arraysplice')
  arraysplice(): any  {
  console.log("slice",this.array.slice(2));
  return "a";
  }

}

function Logger(logtring: string) {
  return function (constructor: Function) {
    console.log(logtring);
    // console.log(constructor);
  };
}

function WithTemplete(templete: string, hookId: string) {
  return function (constructor: any) {
    console.log(templete);
    const hookElem = document.getElementById(hookId);
    //   // console.log(constructor);
    if (hookElem) {
      const o = new constructor();
      hookElem.innerHTML = `<h1>${o.name}</h1>`;
    }
  };
}

@Logger("Logger")
@WithTemplete("WithTemplete", "app")
class D {
  name: string = "kush";
  constructor() {
    console.log("class A...");
  }
}

function Log(target: any, name: string) {
  // return function(constructor:any){
  console.log("product log");
  console.log(name);
  // }
}

class Product {
  title: string;
  @Log
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }

  getDetails() {
    console.log(`title : ${this.title}, price : ${this.price}`);
  }
}

const p = new Product("pen", 5);
p.getDetails();

type rootValidator = {
  [classs: string]: {
    [validatableProp: string]: string[];
  };
};

const validator: rootValidator = {};

function Required(target: any, name: string) {
  console.log("req");
  validator[target.constructor.name] = { [name]: ["required"] };
}
function PositiveNum(target: any, name: string) {
  console.log("pos");
  validator[target.constructor.name] = { [name]: ["positive"] };
}

function Validate(obj: any) {
  console.log("val");
  console.log("validator", validator);
  const objValidatorConfig = validator[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  for (const prop in objValidatorConfig) {
    for (const v of objValidatorConfig[prop]) {
      console.log("v", v);
      switch (v) {
        case "required":
          console.log("obj[prop]", obj[prop]);
          return obj[prop];
        case "positive":
          console.log("obj[prop]", obj[prop]);
          return obj[prop] > 0;
      }
    }
  }
  return true;
}

class Course {
  @Required
  name: string;
  @PositiveNum
  courses: number;

  constructor(n: string, c: number) {
    this.name = n;
    this.courses = c;
  }
}

const frm = document.querySelector(".form")!;

frm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submit");
  const nameEl = document.getElementById("name") as HTMLInputElement;
  const crsEl = document.getElementById("crs") as HTMLInputElement;

  const name = nameEl.value;
  const crs = +crsEl.value;

  const course = new Course(name, crs);
  if (!Validate(course)) {
    alert("invalid input");
    return;
  }
});

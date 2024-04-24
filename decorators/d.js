"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function Logger(logtring) {
    return function (constructor) {
        console.log(logtring);
        // console.log(constructor);
    };
}
function WithTemplete(templete, hookId) {
    return function (constructor) {
        console.log(templete);
        const hookElem = document.getElementById(hookId);
        //   // console.log(constructor);
        if (hookElem) {
            const o = new constructor();
            hookElem.innerHTML = `<h1>${o.name}</h1>`;
        }
    };
}
let D = class D {
    constructor() {
        this.name = "kush";
        console.log("class A...");
    }
};
D = __decorate([
    Logger("Logger"),
    WithTemplete("WithTemplete", "app"),
    __metadata("design:paramtypes", [])
], D);
function Log(target, name) {
    // return function(constructor:any){
    console.log("product log");
    console.log(name);
    // }
}
class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    getDetails() {
        console.log(`title : ${this.title}, price : ${this.price}`);
    }
}
__decorate([
    Log,
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
const p = new Product("pen", 5);
p.getDetails();
const validator = {};
function Required(target, name) {
    console.log("req");
    validator[target.constructor.name] = { [name]: ["required"] };
}
function PositiveNum(target, name) {
    console.log("pos");
    validator[target.constructor.name] = { [name]: ["positive"] };
}
function Validate(obj) {
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
    constructor(n, c) {
        this.name = n;
        this.courses = c;
    }
}
__decorate([
    Required,
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    PositiveNum,
    __metadata("design:type", Number)
], Course.prototype, "courses", void 0);
const frm = document.querySelector(".form");
frm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submit");
    const nameEl = document.getElementById("name");
    const crsEl = document.getElementById("crs");
    const name = nameEl.value;
    const crs = +crsEl.value;
    const course = new Course(name, crs);
    if (!Validate(course)) {
        alert("invalid input");
        return;
    }
});

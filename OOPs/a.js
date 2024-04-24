"use strict";
class A {
    //   name: string;
    //   id:number
    constructor(name, id) {
        this.name = name;
        this.id = id;
        // this.name = n;
        // this.id = i;
    }
}
const a = new A("kush", 9);
console.log("a.name", a.name);
console.log("a.id", a.id);
// let e : unkEmp;
function f(e) {
    if ("sal" in e)
        console.log("emp:", e.name);
    if ("stp" in e)
        console.log("trn:", e.name);
}
let e1 = {
    name: "kush",
    stp: 40000,
    sal: 30000,
};
let e2 = {
    name: "kkkk",
    sal: 15000,
};
f(e1);
function larger(n1, n2) {
    if (typeof n1 === "number" && typeof n2 === "number")
        console.log("ans : ", n1 > n2 ? n1 : n2);
    if (typeof n1 === "string" && typeof n2 === "string")
        console.log("ans : ", n1 > n2);
}
larger(4, 4);
larger('a', 'f');
console.log("aa" > "saa");
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
loggingIdentity(['a', 9, 'htdhu', false]);

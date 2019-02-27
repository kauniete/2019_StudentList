"use strict";
const baseLink = "https://petlatkea.dk/2019/hogwarts/students.json";
const studentObject = {
  firstname: "-student first name-",
  lastname: "-student last name-",
  house: "-student house-"
};
let arrayOfStudents = [];
window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
  getJSON();
}
function getJSON() {
  fetch(baseLink)
    .then(event => event.json())
    .then(data => createObject(data));
  console.log("getJSON");
}

function createObject(data) {
  data.forEach(element => {
    const astudent = Object.create(studentObject);
    //console.log(astudent);
    let name = element.fullname;
    astudent.firstname = name.substring(0, name.indexOf(" "));
    astudent.lastname = name.substring(name.lastIndexOf(" ") + 1);
    astudent.house = element.house;
    arrayOfStudents.push(astudent);
  });
  console.log(arrayOfStudents);
  displayList(arrayOfStudents);
}
function displayList(arrayOfStudents) {
  //console.log(arrayOfStudents);
  document.querySelector("#list").innerHTML = "";
  arrayOfStudents.forEach(student => {
    //console.log(student.firstname);
    const template = document.querySelector("#studentTemplate").content;
    const clone = template.cloneNode(true);
    clone.querySelector(".first span").textContent = student.firstname;
    clone.querySelector(".last span").textContent = student.lastname;
    clone.querySelector(".house span").textContent = student.house;

    clone.querySelector("li").id = student.firstname;
    document.querySelector("#list").appendChild(clone);
  });
}

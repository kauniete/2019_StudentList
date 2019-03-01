"use strict";
const baseLink = "https://petlatkea.dk/2019/hogwarts/students.json";
const studentObject = {
  firstname: "-student first name-",
  lastname: "-student last name-",
  house: "-student house-"
};
let arrayOfStudents = [];
let filteredList = [];
let currentFilter;
let filter;
let currentSort;
window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  document.querySelector("#btnall").addEventListener("click", filterList);
  document.querySelector("#Gryffindor").addEventListener("click", filterList);
  document.querySelector("#Hufflepuff").addEventListener("click", filterList);
  document.querySelector("#Ravenclaw").addEventListener("click", filterList);
  document.querySelector("#Slytherin").addEventListener("click", filterList);
  document.querySelector("#btnfirst").addEventListener("click", sortByFirst);
  document.querySelector("#btnlast").addEventListener("click", sortByLast);
  document.querySelector("#btnhouse").addEventListener("click", sortByHouse);
  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
  getJSON();
}
function getJSON() {
  fetch(baseLink)
    .then(event => event.json())
    .then(data => createObject(data));
  //console.log("getJSON");
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
    filteredList = arrayOfStudents;
  });
  console.log(arrayOfStudents);
  displayList(arrayOfStudents);
}

function filterList() {
  currentFilter = this.getAttribute("id");
  if (currentFilter === "btnall") {
    displayList(arrayOfStudents);
    filteredList = arrayOfStudents;
  } else {
    function filterByHouse(student) {
      return student.house === currentFilter;
    }
    filteredList = arrayOfStudents.filter(filterByHouse);
    displayList(filteredList);
    //console.log(filteredList);
  }
}

function sortByFirst() {
  function sort(a, b) {
    if (a.firstname < b.firstname) {
      return -1;
    } else {
      return 1;
    }
  }
  filteredList.sort(sort);
  document.querySelector("#list").innerHTML = "";
  displayList(filteredList);
  //console.log(filteredList);
}

function sortByLast() {
  function sort(a, b) {
    if (a.lastname < b.lastname) {
      return -1;
    } else {
      return 1;
    }
  }

  document.querySelector("#list").innerHTML = "";
  filteredList.sort(sort);
  displayList(filteredList);
  //console.log(filteredList);
}
function sortByHouse() {
  function sort(a, b) {
    if (a.house < b.house) {
      return -1;
    } else {
      return 1;
    }
  }
  document.querySelector("#list").innerHTML = "";
  filteredList.sort(sort);
  displayList(filteredList);
  //console.log(filteredList);
}

function displayList(arrayOfStudents) {
  //console.log(arrayOfStudents);
  document.querySelector("#list").innerHTML = "";
  arrayOfStudents.forEach(student => {
    //console.log(student.firstname);
    const template = document.querySelector("#studentTemplate").content;
    const clone = template.cloneNode(true);
    clone
      .querySelector("#btnstudent")
      .addEventListener("click", () => showDetails(student));
    clone.querySelector(".first span").textContent = student.firstname;
    clone.querySelector(".last span").textContent = student.lastname;
    clone.querySelector(".house span").textContent = student.house;

    clone.querySelector("li").id = student.firstname;
    document.querySelector("#list").appendChild(clone);
  });
}

const imgbase = "images/";
function showDetails(student) {
  //console.log(student);
  const modal = document.querySelector(".modal");
  modal.querySelector(".modal-content").id = student.name;
  modal.querySelector(".studentImg").src = student.image;
  modal.querySelector(".name span").textContent =
    student.firstname + " " + student.lastname;
  modal.querySelector(".house span").textContent = student.house;
  modal.querySelector(".crestImg").src = student.crestimage;
  if (student.house == "Gryffindor") {
    modal.querySelector(".crestImg").src = imgbase + "gryffindor.png";
  }
  if (student.house == "Slytherin") {
    modal.querySelector(".crestImg").src = imgbase + "slytherin.png";
  }
  if (student.house == "Ravenclaw") {
    modal.querySelector(".crestImg").src = imgbase + "ravenclaw.png";
  }
  if (student.house == "Hufflepuff") {
    modal.querySelector(".crestImg").src = imgbase + "hufflepuff.png";
  }

  modal.classList.remove("hide");
  modal.addEventListener("click", () => modal.classList.add("hide"));
}

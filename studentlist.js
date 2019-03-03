"use strict";
const baseLink = "https://petlatkea.dk/2019/hogwarts/students.json";
const familyLink = "http://petlatkea.dk/2019/hogwarts/families.json";
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
  document
    .querySelector("section")
    .addEventListener("click", expelButtonClicked);
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
    let astudent = Object.create(studentObject);
    //console.log(astudent);
    let name = element.fullname;
    astudent.firstname = name.substring(0, name.indexOf(" "));
    astudent.lastname = name.substring(name.lastIndexOf(" ") + 1);
    astudent.house = element.house;
    arrayOfStudents.push(astudent);
    filteredList = arrayOfStudents;
  });
  addNewStudent(arrayOfStudents);
  arrayOfStudents.forEach(student => {
    //console.log(student);
    const uniqueID = uuidv4();
    student.id = uniqueID;
  });
  console.log(arrayOfStudents);
  displayList(arrayOfStudents);
}
function addNewStudent(arrayOfStudents) {
  let newStudent = {
    firstname: "Indre",
    lastname: "Karalkeviciute",
    house: "Gryffindor"
  };
  arrayOfStudents.push(newStudent);
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
    clone.querySelector("[data-action=btnexpel]").id = student.id;
    clone.querySelector("li").id = student.firstname;
    document.querySelector("#list").appendChild(clone);
  });

  countStudents(arrayOfStudents);
}

function showDetails(student) {
  //console.log(student);
  const modal = document.querySelector(".modal");
  const imgbase = "images/";
  //modal.querySelector(".modal-content").id = student.name;
  modal.querySelector(".name span").textContent =
    student.firstname + " " + student.lastname;
  modal.querySelector(".studenthouse span").textContent = student.house;
  if (student.house == "Gryffindor") {
    modal.querySelector(".crestImg").src = imgbase + "gryffindor.png";
    modal.style.color = "#fdb02e";
    document.querySelector(".modal-content").style.backgroundColor = "#ce3a0a";
  }
  if (student.house == "Slytherin") {
    modal.querySelector(".crestImg").src = imgbase + "slytherin.png";
    modal.style.color = "#c0b1c6";
    document.querySelector(".modal-content").style.backgroundColor = " #588c39";
  }

  if (student.house == "Ravenclaw") {
    modal.querySelector(".crestImg").src = imgbase + "ravenclaw.png";
    modal.style.color = "#e9ba36";
    document.querySelector(".modal-content").style.backgroundColor = "#395f9d";
  }

  if (student.house == "Hufflepuff") {
    modal.querySelector(".crestImg").src = imgbase + "hufflepuff.png";
    modal.style.color = "#0b0000";
    document.querySelector(".modal-content").style.backgroundColor = "#ffc02a";
  }

  if (student.lastname == "Finch-Fletchley") {
    modal.querySelector(".studentImg").src = imgbase + "fletchley_j.png";
  } else {
    modal.querySelector(".studentImg").src =
      imgbase +
      student.lastname.toLowerCase() +
      "_" +
      student.firstname[0].toLowerCase() +
      ".png";
  }
  modal.classList.remove("hide");
  modal.addEventListener("click", () => modal.classList.add("hide"));
}

function expelButtonClicked(event) {
  //console.log(event.target.dataset.action === "btnexpel");
  //Figure out if a button was clicked
  if (event.target.dataset.action === "btnexpel") {
    const eventId = event.target.id;
    console.log(eventId);
    clickRemove(eventId);
  }
  //Figure out if it was a remove-button
  //If so, call clickRemove
}

/*function findByFirstName(firstname) {
  return arrayOfStudents.findIndex(obj => obj.firstname === "Indre");}
  let doNotRemove = findByFirstName(firstname);
  console.log(doNotRemove);
}*/

function clickRemove(eventId) {
  console.log(arrayOfStudents);
  // Figure out which element should be removed
  // Find the element index in the array
  function findById(id) {
    return arrayOfStudents.findIndex(obj => obj.id === id);
  }
  // Splice that element from the array
  let removeObject = findById(eventId);
  console.log(removeObject);
  arrayOfStudents.splice(removeObject, 1);
  // Re-display the list
  displayList(arrayOfStudents);
}
//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

//counter only work when all houses are shown. also, dunno why when I expel the last student and the array count is 0, the final count on the screen is 1 (should be 0)
function countStudents(arrayOfStudents) {
  const counts = {
    Gryffindor: 0,
    Slytherin: 0,
    Hufflepuff: 0,
    Ravenclaw: 0
  };
  arrayOfStudents.forEach(student => {
    counts[student.house]++;
    document.querySelector(".gryffindorenlisted span").innerHTML =
      counts.Gryffindor;
    document.querySelector(".hufflepuffenlisted span").innerHTML =
      counts.Hufflepuff;
    document.querySelector(".slytherinenlisted span").innerHTML =
      counts.Slytherin;
    document.querySelector(".ravenclawenlisted span").innerHTML =
      counts.Ravenclaw;
    document.querySelector(".totalnumber span").innerHTML =
      arrayOfStudents.length;
    /*counts.Gryffindor +
      counts.Slytherin +
      counts.Hufflepuff +
      counts.Ravenclaw;*/
    document.querySelector(".numberofexpelled span").innerHTML =
      35 - arrayOfStudents.length;
    /*(counts.Gryffindor +
        counts.Slytherin +
        counts.Hufflepuff +
        counts.Ravenclaw);*/
  });
  //return countStudents();
}

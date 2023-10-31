let input = document.querySelector(".input");
let sumbit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let deletall = document.querySelector(".deletall");
let Toarray = [];

//* get data to array

if (window.localStorage.getItem("data")) {
  Toarray = JSON.parse(window.localStorage.getItem("data"));
}
gettasksoflocalestorage();

//* click on sumbit

sumbit.onclick = function () {
  if (input.value !== "") {
    addtasksToarry(input.value);
    input.value = "";
  }
};

//* addtasksToarry

function addtasksToarry(inputvalue) {
  const task = {
    id: Date.now(),
    title: input.value,
  };
  Toarray.push(task);
  addtasksTopage(Toarray);
  addtasksTolocalestorage(Toarray);
}

//* addtasksTopage

function addtasksTopage(Toarray) {
  tasks.innerHTML = "";
  Toarray.forEach((task) => {
    let div = document.createElement("div");
    div.setAttribute("data-id", task.id);
    div.className = "task";
    div.append(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.appendChild(document.createTextNode("Delet"));
    span.className = "del";
    div.appendChild(span);
    tasks.appendChild(div);
  });
}

//* addtasksTolocalestorage

function addtasksTolocalestorage(Toarray) {
  window.localStorage.setItem("data", JSON.stringify(Toarray));
}

//* get tasks of localestorage

function gettasksoflocalestorage() {
  if (window.localStorage.getItem("data")) {
    let data = JSON.parse(window.localStorage.getItem("data"));
    addtasksTopage(data);
  }
}

//* delet some task

tasks.addEventListener("click", (delet) => {
  if (delet.target.classList.contains("del")) {
    delet.target.parentElement.remove();
    updateTolocalStorage(delet.target.parentElement.getAttribute("data-id"));
  }
});

//*1695301991662
function updateTolocalStorage(someid) {
  Toarray = Toarray.filter((task) => task.id != someid);
  addtasksTolocalestorage(Toarray);
}

deletall.onclick = function () {
  tasks.innerHTML = "";
  Toarray = [];
  addtasksTolocalestorage(Toarray);
};
if (window.localStorage.getItem("backcolo")) {
  document.body.style.backgroundColor =
    window.localStorage.getItem("backcolo");
}
setInterval(() => {
  let num_letter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let color_num_letter = [];
  for (let i = 0; i < 6; i++) {
    color_num_letter.push(
      num_letter[Math.trunc(Math.random() * num_letter.length)]
    );
  }
  let final_color = `#${color_num_letter.join("")}`;
  document.body.style.backgroundColor = final_color;
  window.localStorage.setItem("backcolo", final_color);
}, 3000);

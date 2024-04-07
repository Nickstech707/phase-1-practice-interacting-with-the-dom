// This function to convert an iterable to an array
function toConsumableArray(iterable) {
  return Array.isArray(iterable) ? Array.from(iterable) : [...iterable];
}

// States variable to control the timer
let playing = true;

// This is a timer function to increment the counter every second
const timer = () => setInterval(() => {
  const counterElement = document.getElementById("counter");
  let count = parseInt(counterElement.innerText);
  counterElement.innerText = count + 1;
}, 1000);

// Starts the timer
let interval = timer();

// DOM elements
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const heart = document.getElementById("heart");
const pause = document.getElementById("pause");
const commentForm = document.querySelector("form");

// Decrements counter
minus.addEventListener("click", () => {
  const counterElement = document.getElementById("counter");
  let count = parseInt(counterElement.innerText);
  counterElement.innerText = count - 1;
});

// Increments counter
plus.addEventListener("click", () => {
  const counterElement = document.getElementById("counter");
  let count = parseInt(counterElement.innerText);
  counterElement.innerText = count + 1;
});

// Likes a number
heart.addEventListener("click", () => {
  const counterElement = document.getElementById("counter");
  const count = parseInt(counterElement.innerText);
  const likesList = document.querySelector(".likes");
  let item;

  if (toConsumableArray(likesList.children).map(elem => parseInt(elem.dataset.num)).includes(count)) {
    item = document.querySelector(`[data-num="${count}"]`);
    let likes = parseInt(item.children[0].innerText);
    item.innerHTML = `${count} has been liked <span>${likes + 1}</span> times`;
  } else {
    item = document.createElement("li");
    item.setAttribute("data-num", count);
    item.innerHTML = `${count} has been liked <span>1</span> time`;
    likesList.appendChild(item);
  }
});

// Pause or resume the timer
pause.addEventListener("click", () => {
  if (playing) {
    playing = false;
    clearInterval(interval);
    pause.innerText = "resume";
  } else {
    playing = true;
    interval = timer();
    pause.innerText = "pause";
  }

  toConsumableArray(document.querySelectorAll("button")).forEach(button => {
    if (button.id !== "pause") {
      button.disabled = !playing;
    }
  });
});

// Adds a comment
commentForm.addEventListener("submit", event => {
  event.preventDefault();
  const input = commentForm.querySelector("input");
  const comment = input.value;
  input.value = "";

  const commentsContainer = document.querySelector(".comments");
  const newComment = document.createElement("p");
  newComment.innerText = comment;
  commentsContainer.appendChild(newComment);
});
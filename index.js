import { data } from "./data.js";

const question = document.querySelector("#question");
const errorElement = document.querySelector(".error");
const form = document.querySelector("form");
const submitButton = document.querySelector("button[type='submit']");

function generateRandomNumber(length) {
  return Math.floor(Math.random() * length);
}

function generateAnswer() {
  const randomNumber = generateRandomNumber(data.length);
  const answer = data[randomNumber];
  return answer;
}

function createAnswerElement(tagName, className, value) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  element.innerHTML = value;
  return element;
}

function validateQuestion() {
  const questionWithoutSpaces = question.value.replace(" ", "");
  return questionWithoutSpaces.length >= 3;
}

function showErrorMessage() {
  errorElement.style.display = "block";
}

function hideErrorMessage() {
  errorElement.style.display = "none";
}

function clearFormAndNewElement() {
  question.value = "";
  submitButton.removeAttribute("disabled");
  const answerElement = document.querySelector(".answer");
  if (answerElement) answerElement.remove();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateQuestion()) {
    showErrorMessage();
    return;
  }

  hideErrorMessage();
  const answer = generateAnswer();
  const answerElement = document.querySelector(".answer");

  if (!answerElement) {
    const element = createAnswerElement("span", "answer", answer.value);
    submitButton.parentNode.insertBefore(element, submitButton.previousSibling);
  } else {
    answerElement.innerHTML = answer.value;
  }

  submitButton.setAttribute("disabled", true);
  setTimeout(() => {
    clearFormAndNewElement();
  }, 3000)
})


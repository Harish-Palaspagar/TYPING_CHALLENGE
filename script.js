const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

//set Values

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    
    const paragraph = [
        "Avoid daydreaming about the years to come. Focus on the present moment, for it is all we truly have. Embrace the challenges that life presents, for they are opportunities in disguise. Remember, the journey is often more important than the destination.",
        "You are the most important person in your whole life. Treat yourself with kindness, love, and respect. Take care of your physical, emotional, and mental well-being. Your happiness and fulfillment matter more than anyone else's expectations.",
        "Always be true to who you are, and ignore what other people have to say about you. Your worth is not determined by the opinions of others. Stay authentic to your values, beliefs, and passions. The right people will appreciate you for who you are.",
        "Only demonstrate your strength when it’s really required. True strength lies in knowing when to be gentle, when to be firm, and when to be vulnerable. Sometimes, the bravest thing you can do is ask for help.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. Embrace both success and failure as opportunities for growth. Keep moving forward, learning from your experiences, and striving for your goals.",
        "The only way to do great work is to love what you do. Find your passion and pursue it with dedication and enthusiasm. When you love what you do, work doesn't feel like work – it becomes a fulfilling expression of who you are.",
        "In the end, we only regret the chances we didn't take. Take risks, step out of your comfort zone, and seize every opportunity that comes your way. Embrace uncertainty and see where life takes you. You'll never know unless you try.",
        "Believe you can and you're halfway there. Confidence and self-belief are powerful drivers of success. Trust in your abilities, stay positive, and persevere in the face of challenges. With the right mindset, anything is possible.",
        "Life is 10% what happens to us and 90% how we react to it. Our attitudes and actions shape our experiences and determine our outcomes. Choose resilience, optimism, and gratitude in every situation. Your response is within your control.",
        "The future belongs to those who believe in the beauty of their dreams. Dare to dream big, set ambitious goals, and work tirelessly to turn your dreams into reality. With passion, determination, and perseverance, you can create the life you desire."
      ];

  const randomIndex = Math.floor(Math.random() * paragraph.length);

  typingText.innerHTML = "";

  for (const char of paragraph[randomIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
  typingText.addEventListener("click", () => input.focus());
}

// handle user input

function initTyping() {
  const char = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);

  if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = true;
    }

    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add("correct");
      console.log("correct");
    } else {
      mistake++;
      char[charIndex].classList.add("incorrect");
      console.log("incorrect");
    }
    charIndex++;
    char[charIndex].classList.add("active");
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;
  } else {
    clearInterval(timer);
    input.value = "";
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerHTML = timeLeft + "s";
    let wpmVal = Math.round(
      ((charIndex - mistake) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm.innerText = wpmVal;
  } else {
    clearInterval(timer);
  }
}

function reset() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  time.innerText = timeLeft;
  input.value = "";
  charIndex = 0;
  mistake = 0;
  isTyping = false;
  wpm.innerText = 0;
  cpm.innerText = 0;
  mistakes.innerText = 0;

}

input.addEventListener("input", initTyping);

btn.addEventListener("click", reset);

loadParagraph();

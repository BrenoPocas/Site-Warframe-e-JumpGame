const character = document.getElementById("character");
const block = document.getElementById("block");
let counter = 0;
let paused = false;
let isJumping = false;
const walkSpeed = 3;
let charPosX = 0;

document.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
    jump();
  }

  if (e.code === "ArrowRight" || e.code === "KeyD") {
    walkRight();
  }

  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    walkLeft();
  }

  if (e.code === "ArrowDown" || e.code === "KeyS") {
    crouch();
  }

  if (e.code === "KeyP") {
    paused = !paused;
    if (!paused) {
      checkDead();
      block.style.animation = "block 3s infinite linear";
    } else {
      block.style.animation = "none";
    }
  }
});

function crouch(){
    //to do
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    character.classList.add("animate");
    setTimeout(() => {
      character.classList.remove("animate");
      isJumping = false;
    }, 500);
  }
}

function walkRight() {
  console.log(character.style);
  charPosX++;
  character.style.left = charPosX + "px";
}

function walkLeft() {
  if (charPosX > 0) {
    charPosX--;
    character.style.left = charPosX + "px";
  }
}

function checkDead() {
  const characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  const blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );

  if (blockLeft < charPosX + 20 && blockLeft > charPosX && characterTop >= 130) {
    block.style.animation = "none";
    alert("Fim de jogo. Pontuação: " + Math.floor(counter / 100));
    counter = 0;
    block.style.animation = "block 3s infinite linear";
  } else {
    counter++;
    document.getElementById("scoreSpan").innerText = Math.floor(counter / 100);
  }
  setTimeout(() => {
    if (!paused) {
      checkDead();
    }
  }, 10);
}

checkDead();
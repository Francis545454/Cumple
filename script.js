document.addEventListener("DOMContentLoaded", () => {

  /* ELEMENTOS */
  const btn = document.getElementById("startBtn");
  const sunflowerContainer = document.getElementById("sunflower-container");
  const message = document.getElementById("message");
  const phase2 = document.getElementById("phase2");

  const emoji = document.getElementById("emoji");
  const letter = document.getElementById("letter");
  const ribbon = document.getElementById("ribbon");
  const guideText = document.getElementById("guide-text");

  const gameScreen = document.getElementById("gameScreen");
  const questionContainer = document.getElementById("questionContainer");
  const scoreElement = document.getElementById("score");

  const questions = [
    { question: "Zharick tiene esquizofrenia?", answer: true },
    { question: "Tu color favorito es el azul?", answer: true },
    { question: "Fran está cuerdo?", answer: false },
    { question: "Mentiste en la anterior pregunta?", answer: true },
    { question: "Zharick es alérgica al salmón (importante)?", answer: true }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  /* =======================
     FASE 1 → FASE 2
  ======================= */
  btn.addEventListener("click", () => {
    btn.style.opacity = 0;
    setTimeout(() => btn.style.display = "none", 800);

    sunflowerContainer.classList.add("animate-riseZoom");
    setTimeout(() => message.classList.add("animate-fade"), 4000);

    setTimeout(() => {
      sunflowerContainer.style.display = "none";
      message.style.display = "none";

      document.body.classList.remove("blue-background");
      document.body.classList.add("yellow-background");

      phase2.classList.add("show");
    }, 7000);
  });

  /* =======================
     FASE 2 → Abrir carta
  ======================= */
  emoji.addEventListener("click", () => {
    letter.classList.add("open");
    ribbon.style.display = "block";
    ribbon.textContent = "Ciérrame";
    guideText.textContent = "Carta abierta";

    document.body.classList.remove("yellow-background");
    document.body.classList.add("red-background");
  });

  /* =======================
     FASE 3 → Cerrar carta y mostrar JUGAR
  ======================= */
  ribbon.addEventListener("click", () => {
    emoji.style.display = "none";
    guideText.style.display = "none";

    letter.style.transform = "translateX(-150%)";
    letter.style.opacity = "0";
    ribbon.style.display = "none";
    phase2.classList.remove("show");

    generateHearts();

    // Crear botón JUGAR dinámicamente
    const playBtn = document.createElement("button");
    playBtn.id = "playButtonDynamic";
    playBtn.textContent = "Jugar";
    playBtn.style.padding = "20px 40px";
    playBtn.style.fontSize = "1.8rem";
    playBtn.style.cursor = "pointer";
    playBtn.style.border = "none";
    playBtn.style.borderRadius = "12px";
    playBtn.style.backgroundColor = "#ff6f91";
    playBtn.style.color = "white";
    playBtn.style.position = "absolute";
    playBtn.style.top = "50%";
    playBtn.style.left = "50%";
    playBtn.style.transform = "translate(-50%, -50%)";
    playBtn.style.zIndex = "10";

    document.body.appendChild(playBtn);

    playBtn.addEventListener("click", () => {
        playBtn.remove();
        gameScreen.style.display = "flex";

        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = `Puntaje: ${score}`;
        loadQuestion();
    });
  });

  /* =======================
     CARGAR PREGUNTAS
  ======================= */
  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      questionContainer.innerHTML = `<p>💖Feliz cumple💖. Puntaje final: ${score}</p>`;
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    questionContainer.innerHTML = `
      <p>${currentQuestion.question}</p>
      <button id="btnTrue">Verdadero</button>
      <button id="btnFalse">Falso</button>
    `;

    const btnTrue = document.getElementById("btnTrue");
    const btnFalse = document.getElementById("btnFalse");

    btnTrue.addEventListener("click", () => answer(true, btnTrue, btnFalse));
    btnFalse.addEventListener("click", () => answer(false, btnFalse, btnTrue));
  }

  function answer(selectedAnswer, clickedButton, otherButton) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answer) {
      score++;
      clickedButton.style.backgroundColor = "green";
    } else {
      clickedButton.style.backgroundColor = "red";
      otherButton.style.backgroundColor = "green";
    }

    scoreElement.textContent = `Puntaje: ${score}`;

    clickedButton.disabled = true;
    otherButton.disabled = true;

    currentQuestionIndex++;
    setTimeout(loadQuestion, 1000);
  }

  /* =======================
     CORAZONES FLOTANTES
  ======================= */
  function generateHearts() {
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = window.innerHeight + "px";
      heart.style.animationDelay = (Math.random() * 2) + "s";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 4000);
    }
  }

});

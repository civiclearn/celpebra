// ----------------------------
// SETTINGS
// ----------------------------
const QUESTIONS_PER_ROW = 3;

// ----------------------------
// FULL QUESTION POOL — CELPE-BRAS (Brazilian Portuguese, B2+)
// Crase, regência verbal, subjunctive, idiomatic expressions,
// formal register, false friends BR/PT, concordância,
// Brazilian culture & society, text genre awareness
// ----------------------------
const INLINE_TEST_QUESTIONS = [
  {
    q: "«Ele chegou a pé, mas foi _____ festa de carro.» Qual alternativa completa corretamente?",
    a: [
      "à",
      "a",
      "há"
    ],
    correct: 0
  },
  {
    q: "O que significa a expressão «pagar o pato»?",
    a: [
      "Sofrer as consequências por algo que não fez",
      "Pagar uma conta muito cara",
      "Comprar um pato no mercado"
    ],
    correct: 0
  },
  {
    q: "Qual é a regência correta? «O diretor assistiu _____ reunião inteira.»",
    a: [
      "à",
      "a",
      "na"
    ],
    correct: 0
  },
  {
    q: "«Embora ele _____ muito esforço, não passou no concurso.» Complete com o verbo correto.",
    a: [
      "tenha feito",
      "fez",
      "fazia"
    ],
    correct: 0
  },
  {
    q: "No Brasil, o que é um «concurso público»?",
    a: [
      "Um processo seletivo para cargos no governo",
      "Um concurso de beleza",
      "Uma competição esportiva"
    ],
    correct: 0
  },
  {
    q: "«Ela não quis que eu _____ sozinho.» Qual forma verbal está correta?",
    a: [
      "fosse",
      "ia",
      "fui"
    ],
    correct: 0
  },
  {
    q: "Qual frase usa a concordância nominal corretamente?",
    a: [
      "É necessária muita paciência para esse trabalho.",
      "É necessário muita paciência para esse trabalho.",
      "É necessários muita paciência para esse trabalho."
    ],
    correct: 0
  },
  {
    q: "O que significa «dar um jeitinho»?",
    a: [
      "Encontrar uma solução criativa ou informal para um problema",
      "Consertar um objeto quebrado",
      "Fazer uma pose para uma foto"
    ],
    correct: 0
  },
  {
    q: "«Se eu _____ antes, teria conseguido um lugar.» Complete corretamente.",
    a: [
      "tivesse chegado",
      "chegava",
      "cheguei"
    ],
    correct: 0
  },
  {
    q: "Em um texto formal, qual expressão substitui «a gente vai resolver»?",
    a: [
      "Nós resolveremos a questão",
      "A gente vai dar um jeito",
      "Vamos resolver isso aí"
    ],
    correct: 0
  },
  {
    q: "«Ela mora _____ Copacabana, mas trabalha _____ centro.» Complete corretamente.",
    a: [
      "em — no",
      "na — no",
      "em — ao"
    ],
    correct: 0
  },
  {
    q: "O que é o SUS?",
    a: [
      "O sistema público de saúde do Brasil",
      "Um sindicato de trabalhadores",
      "Uma universidade federal"
    ],
    correct: 0
  },
  {
    q: "«Faço questão _____ que todos participem.» Qual preposição completa a frase?",
    a: [
      "de",
      "a",
      "com"
    ],
    correct: 0
  },
  {
    q: "Qual é o significado de «ficar de braços cruzados»?",
    a: [
      "Não fazer nada diante de uma situação",
      "Estar com raiva de alguém",
      "Estar com frio"
    ],
    correct: 0
  },
  {
    q: "«Caso o governo _____ novas medidas, a economia pode melhorar.» Complete corretamente.",
    a: [
      "adote",
      "adota",
      "adotará"
    ],
    correct: 0
  },
  {
    q: "No Brasil, «trem» pode significar «qualquer coisa» em qual região?",
    a: [
      "Minas Gerais",
      "Rio Grande do Sul",
      "Bahia"
    ],
    correct: 0
  },
  {
    q: "Qual frase apresenta uso correto do pronome relativo?",
    a: [
      "A empresa em que trabalho fica no centro.",
      "A empresa que trabalho fica no centro.",
      "A empresa onde trabalho nela fica no centro."
    ],
    correct: 0
  },
  {
    q: "«Ela pediu para eu não _____ barulho.» Qual é a forma correta?",
    a: [
      "fazer",
      "faça",
      "fizer"
    ],
    correct: 0
  },
  {
    q: "O que significa «vestir a camisa» no contexto de trabalho?",
    a: [
      "Comprometer-se totalmente com a empresa ou projeto",
      "Usar o uniforme da empresa",
      "Trocar de emprego"
    ],
    correct: 0
  },
  {
    q: "«Prefiro café _____ chá.» Qual é a regência correta de «preferir»?",
    a: [
      "a",
      "do que",
      "que"
    ],
    correct: 0
  }
];

// ----------------------------
// STATE
// ----------------------------
let correctCount = 0;
let wrongCount = 0;
let answeredCount = 0;
let totalQuestions = INLINE_TEST_QUESTIONS.length;

let currentRow = 0;

// ----------------------------
// UI TARGETS
// ----------------------------
const container = document.getElementById("inline-test-questions");

// ----------------------------
// PROGRESS DISPLAY
// ----------------------------
function updateProgressDisplay() {
  const el = document.getElementById("inline-progress-text");
  if (el) el.textContent = `Progresso: ${answeredCount} / ${totalQuestions} questões`;
}

function updateProgressBar() {
  const pct = (answeredCount / totalQuestions) * 100;
  document.getElementById("inline-progressbar").style.width = pct + "%";
}

// ----------------------------
// UTILITIES
// ----------------------------
function shuffleAnswers(question) {
  const combined = question.a.map((opt, index) => ({
    text: opt,
    isCorrect: index === question.correct
  }));

  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  question.a = combined.map(i => i.text);
  question.correct = combined.findIndex(i => i.isCorrect);
}

function createDonutChart() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const C = 2 * Math.PI * 40;

  return `
    <div class="donut-wrapper">
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#d4edda" stroke-width="12" fill="none"></circle>
        <circle cx="50" cy="50" r="40" stroke="#2e7d32" stroke-width="12" fill="none"
          stroke-dasharray="${(pct / 100) * C} ${(1 - pct / 100) * C}"
          transform="rotate(-90 50 50)" stroke-linecap="round"></circle>
      </svg>
      <div class="donut-center">${pct}%</div>
    </div>
  `;
}

function createEndCard() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const card = document.createElement("div");
  card.className = "inline-question-card end-card";

  const title =
    pct >= 80 ? "Excelente trabalho!" :
    pct >= 50 ? "Muito bem!" :
    pct >= 25 ? "Bom começo!" :
    "Continue treinando!";

  card.innerHTML = `
    <h3>${title}</h3>
    ${createDonutChart()}
    <p>Você completou as questões de exemplo gratuitas.
    Obtenha acesso a <strong>todas as simulações e tarefas</strong>, com avaliação detalhada por IA.</p>
    <a href="https://civiclearn.com/celpe/checkout" class="hero-primary-btn">Acesso completo</a>
  `;

  return card;
}

// ----------------------------
// BUILD ROWS
// ----------------------------
const rows = [];
for (let i = 0; i < totalQuestions; i += QUESTIONS_PER_ROW) {
  rows.push(INLINE_TEST_QUESTIONS.slice(i, i + QUESTIONS_PER_ROW));
}

INLINE_TEST_QUESTIONS.forEach(q => shuffleAnswers(q));

// ----------------------------
// RENDERING
// ----------------------------
function renderRow(rowIndex) {
  if (!rows[rowIndex]) return;

  rows[rowIndex].forEach((q, offset) => {
    const absoluteIndex = rowIndex * QUESTIONS_PER_ROW + offset;
    container.appendChild(createQuestionCard(q, absoluteIndex));
  });
}

function createQuestionCard(questionObj, absoluteIndex) {
  const card = document.createElement("div");
  card.className = "inline-question-card";

  const title = document.createElement("h3");
  title.textContent = questionObj.q;

  const feedback = document.createElement("div");
  feedback.className = "inline-feedback";

  card.append(title);

  questionObj.a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "inline-option-btn";
    btn.textContent = opt;

    btn.onclick = () => {
      answeredCount++;
      updateProgressDisplay();
      updateProgressBar();

      card.querySelectorAll("button").forEach(b => (b.disabled = true));

      if (i === questionObj.correct) {
        correctCount++;
        btn.style.background = "rgba(24, 160, 110, 0.15)";
        btn.style.borderColor = "#18a06e";
        btn.style.color = "#14805a";
        feedback.textContent = "Correto!";
        feedback.classList.add("inline-correct");
      } else {
        wrongCount++;
        btn.style.background = "rgba(230, 57, 70, 0.12)";
        btn.style.borderColor = "#e63946";
        btn.style.color = "#c5303b";
        const allBtns = card.querySelectorAll("button");
        allBtns[questionObj.correct].style.background = "rgba(24, 160, 110, 0.15)";
        allBtns[questionObj.correct].style.borderColor = "#18a06e";
        allBtns[questionObj.correct].style.color = "#14805a";
        feedback.textContent =
          "Resposta correta: " + questionObj.a[questionObj.correct];
        feedback.classList.add("inline-wrong");
      }

      card.appendChild(feedback);

      const isLastQuestion = absoluteIndex === totalQuestions - 1;

      if (isLastQuestion) {
        setTimeout(() => container.appendChild(createEndCard()), 300);
      }

      const isLastInRow =
        (absoluteIndex + 1) % QUESTIONS_PER_ROW === 0 &&
        absoluteIndex !== totalQuestions - 1;

      if (isLastInRow) {
        currentRow++;
        renderRow(currentRow);
      }
    };

    card.appendChild(btn);
  });

  return card;
}

// ----------------------------
// INITIAL RENDER
// ----------------------------
renderRow(0);
updateProgressDisplay();
updateProgressBar();

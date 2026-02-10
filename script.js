const facts = [
  'Liczba 0 jest jedyną liczbą, która nie jest ani dodatnia, ani ujemna.',
  'Suma kątów w trójkącie na płaskiej powierzchni zawsze wynosi 180°.',
  'Liczba π jest niewymierna i ma nieskończone, nieokresowe rozwinięcie dziesiętne.',
  'Kwadrat liczby kończącej się na 5 zawsze kończy się na 25.',
  'Istnieje nieskończenie wiele liczb pierwszych — udowodnił to Euklides.'
];

const quizQuestions = [
  {
    question: 'Która liczba jest liczbą pierwszą?',
    answers: ['21', '29', '39', '51'],
    correct: '29'
  },
  {
    question: 'Ile wynosi 2⁵?',
    answers: ['16', '32', '64', '25'],
    correct: '32'
  },
  {
    question: 'Jaka jest suma pierwszych 5 liczb naturalnych (1+2+3+4+5)?',
    answers: ['10', '15', '20', '25'],
    correct: '15'
  }
];

const factEl = document.getElementById('fact');
const factBtn = document.getElementById('factBtn');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const quizFeedbackEl = document.getElementById('quizFeedback');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const numberInput = document.getElementById('numberInput');
const primeBtn = document.getElementById('primeBtn');
const primeResultEl = document.getElementById('primeResult');

let currentQuestionIndex = 0;

factBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  factEl.textContent = facts[randomIndex];
});

function renderQuestion() {
  const quizItem = quizQuestions[currentQuestionIndex];
  questionEl.textContent = quizItem.question;
  answersEl.innerHTML = '';
  quizFeedbackEl.textContent = '';
  quizFeedbackEl.className = 'feedback';

  quizItem.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = answer;
    button.addEventListener('click', () => checkAnswer(answer));
    answersEl.appendChild(button);
  });
}

function checkAnswer(selected) {
  const quizItem = quizQuestions[currentQuestionIndex];
  const isCorrect = selected === quizItem.correct;

  if (isCorrect) {
    quizFeedbackEl.textContent = 'Brawo! To poprawna odpowiedź ✅';
    quizFeedbackEl.classList.add('ok');
    quizFeedbackEl.classList.remove('bad');
  } else {
    quizFeedbackEl.textContent = `Niestety nie. Poprawna odpowiedź to: ${quizItem.correct}`;
    quizFeedbackEl.classList.add('bad');
    quizFeedbackEl.classList.remove('ok');
  }
}

nextQuestionBtn.addEventListener('click', () => {
  currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
  renderQuestion();
});

function isPrime(number) {
  if (!Number.isInteger(number) || number < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i += 1) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

primeBtn.addEventListener('click', () => {
  const value = Number(numberInput.value);

  if (!numberInput.value.trim()) {
    primeResultEl.textContent = 'Wpisz liczbę, aby sprawdzić wynik.';
    primeResultEl.className = 'feedback bad';
    return;
  }

  if (!Number.isInteger(value) || value < 0) {
    primeResultEl.textContent = 'Podaj nieujemną liczbę całkowitą.';
    primeResultEl.className = 'feedback bad';
    return;
  }

  if (isPrime(value)) {
    primeResultEl.textContent = `${value} jest liczbą pierwszą.`;
    primeResultEl.className = 'feedback ok';
  } else {
    primeResultEl.textContent = `${value} nie jest liczbą pierwszą.`;
    primeResultEl.className = 'feedback bad';
  }
});

renderQuestion();

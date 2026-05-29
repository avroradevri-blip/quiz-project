const questions = [
  {
    question: 'Сколько дней в неделе?',
    answers: ['5', '6', '7', '8'],
    correct: 2
  },
  {
    question: 'Какого цвета обычно трава летом?',
    answers: ['Синяя', 'Зелёная', 'Красная', 'Чёрная'],
    correct: 1
  },
  {
    question: 'Как называется программа для просмотра сайтов?',
    answers: ['Калькулятор', 'Браузер', 'Будильник', 'Плеер'],
    correct: 1
  },
  {
    question: 'Что нужно нажать, чтобы напечатать пробел?',
    answers: ['Enter', 'Shift', 'Пробел', 'Esc'],
    correct: 2
  },
  {
    question: 'Какой знак обычно используют в конце вопроса?',
    answers: ['.', '!', '?', ','],
    correct: 2
  },
  {
    question: 'Что из этого является фруктом?',
    answers: ['Яблоко', 'Картошка', 'Хлеб', 'Соль'],
    correct: 0
  },
  {
    question: 'Сколько будет 2 + 2?',
    answers: ['3', '4', '5', '6'],
    correct: 1
  },
  {
    question: 'Как называется устройство для ввода текста?',
    answers: ['Монитор', 'Клавиатура', 'Колонка', 'Принтер'],
    correct: 1
  },
  {
    question: 'Какой месяц идёт после января?',
    answers: ['Март', 'Февраль', 'Июнь', 'Декабрь'],
    correct: 1
  },
  {
    question: 'Что включают, чтобы осветить комнату?',
    answers: ['Лампу', 'Книгу', 'Подушку', 'Чашку'],
    correct: 0
  }
];

const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionCounter = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const questionTitle = document.getElementById('question-title');
const answersContainer = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  answered = false;
  nextButton.disabled = true;

  questionCounter.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;
  scoreElement.textContent = `Баллы: ${score}`;
  progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  questionTitle.textContent = currentQuestion.question;
  answersContainer.innerHTML = '';

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-btn';
    button.textContent = answer;
    button.addEventListener('click', () => chooseAnswer(button, index));
    answersContainer.appendChild(button);
  });

  nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Результаты' : 'Следующий вопрос';
}

function chooseAnswer(selectedButton, selectedIndex) {
  if (answered) return;

  answered = true;
  const currentQuestion = questions[currentQuestionIndex];
  const answerButtons = document.querySelectorAll('.answer-btn');

  answerButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === currentQuestion.correct) {
      button.classList.add('correct');
    }
  });

  if (selectedIndex === currentQuestion.correct) {
    score++;
    scoreElement.textContent = `Баллы: ${score}`;
  } else {
    selectedButton.classList.add('wrong');
  }

  nextButton.disabled = false;
}

function showResults() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  finalScore.textContent = `Твой результат: ${score} из ${questions.length}`;

  if (score === questions.length) {
    resultMessage.textContent = 'Идеально! Все ответы правильные.';
  } else if (score >= 7) {
    resultMessage.textContent = 'Отличный результат, почти максимум!';
  } else if (score >= 4) {
    resultMessage.textContent = 'Неплохо, но можно повторить материал.';
  } else {
    resultMessage.textContent = 'Попробуй ещё раз — получится лучше.';
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  renderQuestion();
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showResults();
  }
});

restartButton.addEventListener('click', restartQuiz);

renderQuestion();

let clickCount = 0;
let matchedPairs = 0;
let firstCard = undefined;
let secondCard = undefined;
let timeElapsed = 0;
let timerInterval;
const totalPairs = 3; // Change this if you add more pairs

const startTimer = () => {
  timerInterval = setInterval(() => {
    timeElapsed++;
    updateStats();
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

const updateStats = () => {
  $('#click-count').text(clickCount);
  $('#matched-pairs').text(matchedPairs);
  $('#total-pairs').text(totalPairs);
  $('#pairs-left').text(totalPairs - matchedPairs);
  $('#timer').text(timeElapsed);
};

const resetGame = () => {
  stopTimer();
  timeElapsed = 0;
  clickCount = 0;
  matchedPairs = 0;
  firstCard = undefined;
  secondCard = undefined;
  $('.card').removeClass('flip').on('click');
  updateStats();
};

$('#reset-button').click(resetGame);

$('#start-button').click(() => {
  resetGame();
  startTimer();
});

const setup = () => {
  $(".card").on("click", function () {
    if (secondCard) return;
    if (firstCard && $(this).find(".front_face")[0].id === firstCard.id) return;

    $(this).toggleClass("flip");
    clickCount++;
    updateStats();

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
    } else {
      secondCard = $(this).find(".front_face")[0];
      if (firstCard.src === secondCard.src) {
        matchedPairs++;
        updateStats();
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");
        if (matchedPairs === totalPairs) {
          alert('You won!');
          stopTimer();
        }
        firstCard = undefined;
        secondCard = undefined;
      } else {
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip");
          $(`#${secondCard.id}`).parent().toggleClass("flip");
          firstCard = undefined;
          secondCard = undefined;
        }, 1000);
      }
    }
  });
};

$(document).ready(setup);

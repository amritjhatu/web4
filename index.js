let firstCard;
let secondCard;
let clickCount = 0;
let matchedPairs = 0;
let totalPairs = 3; 
let timer = undefined;
let timerCount = 0;

const resetGame = () => {
  $('.card').removeClass('flip');
  firstCard = undefined;
  secondCard = undefined;
  clickCount = 0;
  matchedPairs = 0;
  totalPairs = Number($('#difficulty').val());
  $('#click-count').text(0);
  $('#matched-pairs').text(0);
  $('#total-pairs').text(totalPairs);
  $('#pairs-left').text(totalPairs);
  stopTimer();
  timerCount = 0;
  $('#timer').text(0);
};

const startTimer = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    timerCount++;
    $('#timer').text(timerCount);
  }, 1000);
};

const stopTimer = () => {
  if (timer) clearInterval(timer);
};

const updateStats = () => {
  $('#click-count').text(clickCount);
  $('#matched-pairs').text(matchedPairs);
  $('#pairs-left').text(totalPairs - matchedPairs);
};

$('#difficulty').change(resetGame);
$('#theme').change(() => {
  const theme = $('#theme').val();
  $('body').removeClass('light dark').addClass(theme);
});

$('#reveal-button').click(() => {
  $('.card').addClass('flip');
  setTimeout(() => $('.card').removeClass('flip'), 3000);
});

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

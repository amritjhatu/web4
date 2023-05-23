let firstCard;
let secondCard;
let clickCount = 0;
let matchedPairs = 0;
let totalPairs = 3; 
let timer = undefined;
let timerCount = 0;

// Implementation of resetGame function
const resetGame = () => {
  // You need to write your own implementation for this
  // Reset variables
  clickCount = 0;
  matchedPairs = 0;
  timerCount = 0;
  // Reset game state
  // For example, un-flip all the cards, reshuffle, etc.
  $('.card').removeClass('flip');
  updateStats();
};

// Implementation of startTimer function
const startTimer = () => {
  // Starting the timer
  timer = setInterval(() => {
    timerCount++;
    $('#timer').text(timerCount + " Seconds");
  }, 1000);
};

// Stop timer function
const stopTimer = () => {
  clearInterval(timer);
};

// Update game statistics
const updateStats = () => {
  $('#click-count').text(clickCount);
  $('#matched-pairs').text(matchedPairs);
  $('#total-pairs').text(totalPairs);
  $('#pairs-left').text(totalPairs - matchedPairs);
};

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

$(document).ready(() => {
  $('#difficulty').change(() => {
    const difficulty = $('#difficulty').val();
    totalPairs = difficulty;
    resetGame();
  });

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
  
  setup();
});

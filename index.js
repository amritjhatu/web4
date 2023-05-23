let firstCard;
let secondCard;
let clickCount = 0;
let matchedPairs = 0;
let totalPairs = 3; 
let timer = undefined;
let timerCount = 0;

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
  $("#powerup-notification").text("Power Up Active! Cards are revealed for 3 seconds.");
  setTimeout(() => {
    $('.card').removeClass('flip');
    $("#powerup-notification").text("");
  }, 3000);
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

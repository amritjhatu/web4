let clickCount = 0;
let matchedPairs = 0;
const totalPairs = 3; // Change this if you add more pairs

const updateStats = () => {
  $('#click-count').text(clickCount);
  $('#matched-pairs').text(matchedPairs);
  $('#total-pairs').text(totalPairs);
  $('#pairs-left').text(totalPairs - matchedPairs); // Number of pairs left
};

const setup = () => {
  let firstCard = undefined;
  let secondCard = undefined;

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

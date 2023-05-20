let isFlipping = false;

const setup = () => {
    let firstCard = undefined;
    let secondCard = undefined;

    $(".card").on("click", function () {
        // Ignore clicks if game is currently flipping cards back
        if (isFlipping) {
            return;
        }

        // Ignore double clicks on the same card
        if (firstCard && firstCard === $(this).find(".front_face")[0]) {
            return;
        }

        $(this).toggleClass("flip");

        if (!firstCard) {
            firstCard = $(this).find(".front_face")[0];
        } else {
            secondCard = $(this).find(".front_face")[0];
            console.log(firstCard, secondCard);

            if (firstCard.src === secondCard.src) {
                console.log("match");
                $(`#${firstCard.id}`).parent().off("click");
                $(`#${secondCard.id}`).parent().off("click");
                firstCard = undefined;
                secondCard = undefined;
            } else {
                console.log("no match");
                isFlipping = true;
                setTimeout(() => {
                    $(`#${firstCard.id}`).parent().toggleClass("flip");
                    $(`#${secondCard.id}`).parent().toggleClass("flip");
                    firstCard = undefined;
                    secondCard = undefined;
                    isFlipping = false;
                }, 1000);
            }
        }
    });
}

$(document).ready(setup);

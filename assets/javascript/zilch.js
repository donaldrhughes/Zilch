// Wait until browser loads fully
$(document).ready(function () {



    // Declare Global Vars
    //================================================


    var totalgames = 0;

    // Player Object
    var player = {
        pnum: "",
        name: "player1",
        isTurn: false,
        onBoard: false,
        wins: 0,
        losses: 0,
        score: 0,
        bank: 0,
    };



    //Functions
    //======================================================================

    // Start the Game

    function startGame() {
        var turn = 1;
        player.bank = 0;
        $("#turn-text").text(turn);
        var round = 1;
        $("#round-text").text(round);
        var rollcount = 0;
        var diceResult = [];
        var holdArea = [];
        var dieCount = [];
        // Roll Button click handler
        $("#roll-button").on("click", function () {
            rollcount++;
            $("#rollcount-text").text(rollcount);

            rolldice();
        })
    }


    //Roll the dice!
    function rolldice() {
        var diceResult = [];
        var diceResult = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
        var results = [];
        results = diceResult.join(" ");
        var dieCount = [];
        scoring(diceResult, dieCount);
        $("#result-text").text(results);


    };

    //Jquery for HTML updates
    // function assignVars() {
    //     var resultText = $("#result-text");
    //     var turnText = $("#turn-text");
    //     var roundText = $("#round-text");
    //     var rollcountText = $("#rollcount-text");
    //     var bankText = $("#bank-text");

    // }



    // Hold Dice



    //Scoring
    function scoring(diceResult) {
        countDice(diceResult);
        updateBank();



        console.log("Player Bank" + " " + player.bank);
    }


    function countDice(diceResult) {
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var count4 = 0;
        var count5 = 0;
        var count6 = 0;

        console.log(diceResult);
        for (j = 0; j < diceResult.length; j++) {
            if (diceResult[j] == 1)
                count1++;



            if (diceResult[j] == 2)
                count2++;


            if (diceResult[j] == 3)
                count3++;


            if (diceResult[j] == 4)
                count4++;


            if (diceResult[j] == 5)
                count5++;



            if (diceResult[j] == 6)
                count6++;
        };
        dieCount = [count1, count2, count3, count4, count5, count6];



    }


    function updateBank() {

        if (dieCount[0] == 1) {
            player.bank += 100;
        }

        if (dieCount[0] == 2) {
            player.bank += 200;
        }
        if (dieCount[0] == 3) {
            player.bank += 1000;
        }
        if (dieCount[0] == 4) {
            player.bank += 2500;

        }
        if (dieCount[0] == 5) {
            player.bank += 5000;

        }
        if (dieCount[0] == 6) {
            player.bank += 10000;

        }
        if (dieCount[4] == 1) {
            player.bank += 50;
        }

        if (dieCount[4] == 2) {
            player.bank += 100;
        }
        if (dieCount[4] == 3) {
            player.bank += 500;
        }
        if (dieCount[4] == 4) {
            player.bank += 2000;

        }
        if (dieCount[4] == 5) {
            player.bank += 5000;

        }
        if (dieCount[4] == 6) {
            player.bank += 10000;

        }

        console.log(dieCount);

    }

    //Check if won


    //Check if over 10,000




    //Main Section
    //===================================================
    startGame();






})

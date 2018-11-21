// Wait until browser loads fully
$(document).ready(function () {



    // Declare Global Vars
    //================================================

    var Zilch = "Zilch!";
    var totalgames = 0;

    // Player Object
    var player = [{
        pnum: "",
        name: "player1",
        isTurn: false,
        onBoard: false,
        wins: 0,
        losses: 0,
        score: 0,
        bank: 0,
    }
    ];
    // Dice Objects

    var dice = [{
        result: 0,
    },

    {
        obj: 1,
        value: 0,
        src: "assets/images/D1.gif",
        width: 35,
        height: 35,
        inholdArea: false,
        clickable: false
    },
    {
        obj: 2,
        value: 0,
        src: "assets/images/D2.gif",
        width: 35,
        height: 35,
        inholdArea: false,
        clickable: false
    },
    {
        obj: 3,
        value: 0,
        src: "assets/images/D3.gif",
        width: 35,
        height: 35,
        inholdArea: false,
        clickable: false
    },
    {
        obj: 4,
        value: 0,
        src: "assets/images/D4.gif",
        width: 35,
        height: 35,
        inholdArea: false,
        clickable: false
    },
    {
        obj: 5,
        value: 0,
        src: "assets/images/D5.gif",
        width: 35,
        height: 35,
        inholdArea: false,
        clickable: false
    },
    {
        obj: 6,
        value: 0,
        src: "assets/images/D6.gif",
        width: 35,
        height: 35,
        inholdArea: false,
        clickable: false
    },


    ];
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
    function rolldice(rolldice) {
        dice.result = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
        //Number testing...
        // dice.result = [6,2,2,5,2,2];
        var results = [];
        results = dice.result.join(" ");
        var dieCount = [];
        scoring(dice.result, dieCount);
        $("#result-text").text(results);
        $("#bank-text").text(" " + player.bank);


    };



    // Hold Dice



    //Scoring
    function scoring(threePairs) {
        load_dice();
        countDice();
        updateBank(dieCount, threePairs);

        console.log("Player Bank" + " " + player.bank);
    }

    //Count how many dice of each number you got
    //========
    function countDice() {
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var count4 = 0;
        var count5 = 0;
        var count6 = 0;

        console.log(dice.result);
        for (j = 0; j < dice.result.length; j++) {
            if (dice.result[j] == 1)
                count1++;



            if (dice.result[j] == 2)
                count2++;


            if (dice.result[j] == 3)
                count3++;


            if (dice.result[j] == 4)
                count4++;


            if (dice.result[j] == 5)
                count5++;



            if (dice.result[j] == 6)
                count6++;
        };
        dieCount = [count1, count2, count3, count4, count5, count6];



    }



    function updateBank(dieCount) {
        // used for testing specific rolls, as needed
        player.bank = 0;
        //3 pairs main variable
        var threePairs = [0, 0, 0];
        var onePair = false;
        for (k = 0; k < dieCount.length; k++) {
            if (dieCount[k] == 2) {
                threePairs.unshift("Valid");
                threePairs.splice(-1, 3);
                onePair = true;
            }
        }
        console.log(onePair);
        console.log(threePairs);
        console.log(player.bank);


        // ^^ Pyramid
        if (dieCount[0] == 1 && dieCount[1] == 2 && dieCount[2] == 3) {
            player.bank += 3500;
        }
        // ^^ Straight
        else if (dieCount[0] == 1 && dieCount[1] == 1 && dieCount[2] == 1 && dieCount[3] == 1 && dieCount[4] == 1 && dieCount[5] == 1) {
            player.bank += 4000;
        }
        // ^^ 3 Pairs
        else if (threePairs[0] == "Valid" && threePairs[1] == "Valid" && threePairs[2] == "Valid") {
            player.bank += 3000;
        }
        // ^^ 3 Pairs w 4 of a kind and 1 pair
        else if (onePair == true && ((dieCount[0] == 4) || (dieCount[1] == 4) || (dieCount[2] == 4) || (dieCount[3] == 4) || (dieCount[4] == 4) || (dieCount[5] == 4))) {
            player.bank += 3000;
        }

        else {
            //Remainder of rolls -- 1's 5's 2,3,4,5,6 of a kind
            //====
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



            if (dieCount[1] == 3) {
                player.bank += 200;
            }
            if (dieCount[1] == 4) {
                player.bank += 2000;

            }
            if (dieCount[1] == 5) {
                player.bank += 5000;

            }
            if (dieCount[1] == 6) {
                player.bank += 10000;
            }


            if (dieCount[2] == 3) {
                player.bank += 300;
            }
            if (dieCount[2] == 4) {
                player.bank += 2000;

            }
            if (dieCount[2] == 5) {
                player.bank += 5000;

            }
            if (dieCount[2] == 6) {
                player.bank += 10000;
            }


            if (dieCount[3] == 3) {
                player.bank += 400;
            }
            if (dieCount[3] == 4) {
                player.bank += 2000;

            }
            if (dieCount[3] == 5) {
                player.bank += 5000;

            }
            if (dieCount[3] == 6) {
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


            if (dieCount[5] == 3) {
                player.bank += 600;
            }
            if (dieCount[5] == 4) {
                player.bank += 2000;

            }
            if (dieCount[5] == 5) {
                player.bank += 5000;

            }
            if (dieCount[5] == 6) {
                player.bank += 10000;
            }


            if (player.bank == 0) {


                $('#myModal').modal('show');


                console.log(player.bank);

            }

        }

        console.log(dieCount);

    }


    //load dice
    function load_dice() {
        // dice.result.forEach(function(elem) {
        //     console.log(elem);
        //     dice.value.push(elem);
        //     console.log(dice.value);
        //   });


        dice.forEach(function (elem, i) {

           
           
            //Loads the dice images
            diceImg = $("<img>");
            diceImg.addClass("img-fluid clickable");
            diceImg.attr("src", elem.src);
            diceImg.attr("width", elem.width);
            diceImg.attr("height", elem.height);
            $("#img" + i).append(diceImg);
           


            $('.clickable').click(function () {
                $(this).prependTo('#holdArea');


            })


        });

        console.log(dice);


    };

    //Check if won


    //Check if over 10,000




    //Main Section
    //===================================================
    startGame();






})

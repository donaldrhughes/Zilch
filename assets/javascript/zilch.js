$(document).ready(function () {



    // Declare Global Vars
    //================================================
    var numPlayers = 1;
    var rollcount = 1;
    var Zilch = "Zilch!";
    var totalgames = 0;
    var diceResult = [];
    var database;

    // Player Objects
    var players = [{
        pnum: "1",
        name: "player1",
        isTurn: false,
        onBoard: false,
        wins: 0,
        losses: 0,
        score: 0,
        bank: 0,
        src: "assets/images/avatar1.png",
        width: 100,
        height: 100,
        clickable: false

    },
    {
        pnum: "2",
        name: "player2",
        isTurn: false,
        onBoard: false,
        wins: 0,
        losses: 0,
        score: 0,
        bank: 0,
        src: "assets/images/avatar2.png",
        width: 50,
        height: 50,
        clickable: false

    },
    {
        pnum: "3",
        name: "player3",
        isTurn: false,
        onBoard: false,
        wins: 0,
        losses: 0,
        score: 0,
        bank: 0,
        src: "assets/images/avatar3.png",
        width: 50,
        height: 50,
        clickable: false

    },
    {
        pnum: "4",
        name: "player4",
        isTurn: false,
        onBoard: false,
        wins: 0,
        losses: 0,
        score: 0,
        bank: 0,
        src: "assets/images/avatar4.png",
        width: 50,
        height: 50,
        clickable: false

    },
    {
        pnum: "5",
        name: "player5",
        isTurn: false,
        onBoard: false,
        wins: 0,
        losses: 0,
        score: 0,
        bank: 0,
        src: "assets/images/avatar5.png",
        width: 50,
        height: 50,
        clickable: false

    },
    {
        pnum: "6",
        name: "player6",
        isTurn: false,
        onBoard: false,
        wins: 0,
        losses: 0,
        score: 0,
        bank: 0,
        src: "assets/images/avatar6.png",
        width: 50,
        height: 50,
        clickable: false

    }
    ];


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

    var currentPlayer;

    //Dice Objects

    var dice = [

        {

            value: 0,
            src: "assets/images/D1.jpg",
            width: 25,
            height: 25,
            inholdArea: false,
            clickable: false
        },
        {

            value: 0,
            src: "assets/images/D2.gif",
            width: 25,
            height: 25,
            inholdArea: false,
            clickable: false
        },
        {

            value: 0,
            src: "assets/images/D3.jpg",
            width: 25,
            height: 25,
            inholdArea: false,
            clickable: false
        },
        {

            value: 0,
            src: "assets/images/D4.jpg",
            width: 25,
            height: 25,
            inholdArea: false,
            clickable: false
        },
        {

            value: 0,
            src: "assets/images/D5.jpg",
            width: 25,
            height: 25,
            inholdArea: false,
            clickable: false
        },
        {

            value: 0,
            src: "assets/images/D6.jpg",
            width: 25,
            height: 25,
            inholdArea: false,
            clickable: false
        }

    ];

    //Cup Object
    var cup =
    {
        src: "assets/images/Dicecup.png",
        width: 125,
        height: 125,
        clickable: true
    };

    // console.log(dice[1].value);

    //Functions
    //======================================================================

    // Start the Game

    function startGame() {
        var turn = 1;
        player.bank = 0;
        $("#turn-text").text("Turn: " + turn);
        var round = 1;
        $("#round-text").text("Round: " + round);

        var diceResult = [];
        var holdArea = [];
        var dieCount = [];



    };

    //Roll the dice!
    function rolldice(rolldice) {

        $("#message-text").empty();
        var diceResult = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
        console.log(database);
   
        //Number testing...
        // diceResult = [1,2,2,3,3,3];
        // console.log(diceResult);
        // console.log(diceResult[0]);
        // console.log(dice.value);
        var sortResults = diceResult.slice();
        sortResults.sort();
        var results = sortResults.join(" ");
        database.ref().set({
            sort: results,
            csvSort: diceResult

        });
        console.log(sortResults);
        for (i = 0; i < diceResult.length; i++) {
            dice[i].value = diceResult[i];
            dice[i].src = "assets/images/D" + dice[i].value + ".jpg";

        }

        //Displays point value in html


        var dieCount = [];

        //run scoring
        scoring(diceResult, dieCount);

        //show results
        $("#result-text").text(results);
        $("#value-text").text("Value: " + player.bank);


    };



    // Hold Dice



    //Scoring
    function scoring(diceResult, threePairs) {
        load_dice(diceResult);
        countDice(diceResult);
        updateBank(dieCount, threePairs);

        console.log("Player Bank" + " " + player.bank);
    }

    //Count how many dice of each number you got
    //========
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
            $("#message-text").text("You rolled a Pyramid!");
            $("#message-text").addClass("big-dog");

        }
        // ^^ Straight
        else if (dieCount[0] == 1 && dieCount[1] == 1 && dieCount[2] == 1 && dieCount[3] == 1 && dieCount[4] == 1 && dieCount[5] == 1) {
            player.bank += 4000;
            $("#message-text").text("You rolled a Straight!");
            $("#message-text").addClass("big-dog");
        }
        // ^^ 3 Pairs
        else if (threePairs[0] == "Valid" && threePairs[1] == "Valid" && threePairs[2] == "Valid") {
            player.bank += 3000;
            $("#message-text").text("You rolled Three Pairs!");
            $("#message-text").addClass("big-dog");
        }
        // ^^ 3 Pairs w 4 of a kind and 1 pair
        else if (onePair == true && ((dieCount[0] == 4) || (dieCount[1] == 4) || (dieCount[2] == 4) || (dieCount[3] == 4) || (dieCount[4] == 4) || (dieCount[5] == 4))) {
            player.bank += 3000;
            $("#message-text").text("You rolled Three Pairs!");
            $("#message-text").addClass("big-dog");
        }

        else {
            //Remainder of rolls -- 1's 5's 3,4,5,6 of a kind
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
                $("#message-text").text("You rolled Four of a Kind!");
                $("#message-text").addClass("big-dog");
            }
            if (dieCount[0] == 5) {
                player.bank += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
                $("#message-text").addClass("big-dog");
            }
            if (dieCount[0] == 6) {
                player.bank += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
                $("#message-text").addClass("big-dog");
            }



            if (dieCount[1] == 3) {
                player.bank += 200;
            }
            if (dieCount[1] == 4) {
                player.bank += 2000;
                $("#message-text").text("You rolled Four of a Kind!");
                $("#message-text").addClass("big-dog");
            }
            if (dieCount[1] == 5) {
                player.bank += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
                $("#message-text").addClass("big-dog");
            }
            if (dieCount[1] == 6) {
                player.bank += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
                $("#message-text").addClass("big-dog");
            }


            if (dieCount[2] == 3) {
                player.bank += 300;
            }
            if (dieCount[2] == 4) {
                player.bank += 2000;
                $("#message-text").text("You rolled Four of a Kind!");
                $("#message-text").addClass("big-dog");

            }
            if (dieCount[2] == 5) {
                player.bank += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
                $("#message-text").addClass("big-dog");

            }
            if (dieCount[2] == 6) {
                player.bank += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
                $("#message-text").addClass("big-dog");
            }


            if (dieCount[3] == 3) {
                player.bank += 400;
            }
            if (dieCount[3] == 4) {
                player.bank += 2000;
                $("#message-text").text("You rolled Four of a Kind!");
                $("#message-text").addClass("big-dog");

            }
            if (dieCount[3] == 5) {
                player.bank += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
                $("#message-text").addClass("big-dog");

            }
            if (dieCount[3] == 6) {
                player.bank += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
                $("#message-text").addClass("big-dog");
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
                $("#message-text").text("You rolled Four of a Kind!");
                $("#message-text").addClass("big-dog");
            }
            if (dieCount[4] == 5) {
                player.bank += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
                $("#message-text").addClass("big-dog");
            }
            if (dieCount[4] == 6) {
                player.bank += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
                $("#message-text").addClass("big-dog");
            }


            if (dieCount[5] == 3) {
                player.bank += 600;
            }
            if (dieCount[5] == 4) {
                player.bank += 2000;
                $("#message-text").text("You rolled Four of a Kind!");
                $("#message-text").addClass("big-dog");
            }
            if (dieCount[5] == 5) {
                player.bank += 5000;
                $("#message-text").text("You rolled Five of a Kind!");
                $("#message-text").addClass("big-dog");
            }
            if (dieCount[5] == 6) {
                player.bank += 10000;
                $("#message-text").text("You rolled Six of a Kind!");
                $("#message-text").addClass("big-dog");
            }


            if (player.bank == 0) {
                // alert(Zilch);

                $('#myModal').modal('show');


                console.log(player.bank);

            }

        }

        console.log(dieCount);

    }



    //load dice
    function load_dice() {


        dice.forEach(function (elem, i) {
            $("#img" + i).empty();

            //Loads the dice images
            diceImg = $("<img>");
            diceImg.addClass("img-fluid dice");
            diceImg.attr("src", elem.src);
            diceImg.attr("width", elem.width);
            diceImg.attr("height", elem.height);
            $("#img" + i).append(diceImg);



            diceImg.on("click", function () {
                $("#img" + i).prependTo('#holdArea');
                countArray(diceResult);

            })





        });
        console.log(dice);
    };

    //Load Cup
    function loadCup() {

        cupImg = $("<img>");
        cupImg.addClass("img-fluid diceCup");
        cupImg.attr("src", cup.src);
        cupImg.attr("width", cup.width);
        cupImg.attr("height", cup.height);
        $("#roll-cup").append(cupImg);



        cupImg.on("click", function () {
            startGame();
            $("#rollcount-text").text("Roll: " + rollcount);
            rollcount++;
            rolldice();

        })


    };

    function load_players() {

        players.forEach(function (elem, i) {
            //emptys the player images and data
            
            $("#player" + (i + 1)).empty();

            //Loads the player images
            playerImg = $("<img>");
            playerImg.addClass("img-fluid m-1 border");
            playerImg.attr("src", elem.src);
            playerImg.attr("width", elem.width);
            playerImg.attr("height", elem.height);
            playerImg.text(elem.name);
            $("#player" + (i + 1)).append(playerImg);


            //loads the player data
            playerData = $("<div>");
            playerData.attr("score", elem.score);
            console.log(database);

            // when player has score:
            // database.ref().push({


        })


    };

    function dbAuth() {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyD_MbeNXvxMo1ECZz1CumhkdmRlg5oI2YI",
            authDomain: "tournament-zilch.firebaseapp.com",
            databaseURL: "https://tournament-zilch.firebaseio.com",
            projectId: "tournament-zilch",
            storageBucket: "tournament-zilch.appspot.com",
            messagingSenderId: "1040397840764"
        };
        firebase.initializeApp(config);

        // Create a variable to reference the database
        database = firebase.database();
        console.log(database);
    
        
    };


    //Count Array
    function countArray() {
        //how many dice are we rolling
        var dieTotal = diceResult.length;
        console.log(dieTotal);
        for (i = 0; i < dieTotal; i++) {

            if (dieTotal == 6) {
                console.log(dieTotal);
            }
            if (dieTotal == 5) {
                console.log(dieTotal);
                console.log("5 in array");
            }
            else {
                console.log("6 in array");
            }
        }
    };

    //Check if won


    //Check if over 10,000




    //Main Section
    //===================================================
    loadCup();
    dbAuth();
    load_players();





})
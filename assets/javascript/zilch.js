$(document).ready(function () {

// Declare Global Vars
//================================================


//Jquery for HTML updates
var userText = $("#user-text");
var turnText = $("#turn-text");
var roundText = $("#round-text");
var rollcountText = $("#rollcount-text");

// Main Vars and arrays
var diceresult = [];
var turn = 1;
turnText.text(turn);
var round = 1;
roundText.text(round);
var rollcount = 0;
var totalgames;

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

//Roll the dice!
function rolldice() {
    for (var index = 0; index < 6; index++) {
    
    var min = 1;
    var max = 7;

    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    
    diceresult += random + " "
    userText.text(diceresult);

}}

//Main Section
//===================================================


// Roll Button click handler


    $("#roll-button").on("click", function () {
        diceresult=[];
        rollcount++;
        rollcountText.text(rollcount);
        
            rolldice();

    })

});






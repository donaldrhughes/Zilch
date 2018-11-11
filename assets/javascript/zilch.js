// Wait until browser loads fully
$(document).ready(function () {



            // Declare Global Vars
            //================================================
      
    var turn = 1;
    var round = 1;
    var rollcount = 0;
    var totalgames = 0;
    var diceResult = [];

 

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
        var diceResult = [];
        var diceResult = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
        var results = [];
        results = diceResult.join(" ");
        
        // updateHTML();
        $("#result-text").text(results);
        console.log(diceResult);
        // for (var i = 0; i < diceResult.length; i++) {


    };

       //Jquery for HTML updates
    function assignVars(){
        var resultText = $("#result-text");
        var turnText = $("#turn-text");
        var roundText = $("#round-text");
        var rollcountText = $("#rollcount-text");
        var bankText = $("#bank-text");
    
    }

        // updateHTML();
    function updateHTML(){
        $("#turn-text").text(turn);
        $("#round-text").text(round);
        $("#rollcount-text").text(rollcount);
    }


 //Resets
    function reset(){
      var turn = 1;
      var round = 1;
      var rollcount = 0;
      var totalgames = 0;
    }

//Main Section
//===================================================
reset();
assignVars();
updateHTML();


// Roll Button click handler


$("#roll-button").on("click", function () {
    rollcount++;
    updateHTML();
    rolldice();
})
});
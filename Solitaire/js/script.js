/*
	Jack is treadted as 11
	Queen is treated as 12
	King is treated as 13
	Ace is treated as 1
*/

const GAME_SETTINGS = {
	numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
	signs: ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
	amounts: {
		total: 52,
		dealDeck: 24,
		decks: [1, 2, 3, 4, 5, 6, 7], // amount of cards in every playing deck
		deal: 1
	},
	suits: [0, 1, 2, 3], //hearts, diamonds, clovers, spades
	suitsNames: ['hearts', 'diamonds', 'clovers', 'spades'],
	colors: [0, 1] //red, black
}

window.addEventListener('load', function() {
	new Game();
});

function Game() {
	this.dealDeck = null;
	this.finishDecks = [];
	this.playDecks = [];

	this.$stashContainer = document.getElementById('stashDecks');
	this.$playContainer = document.getElementById('playDecks');
	this.$container = document.getElementById('game');
	this.$playContainer.addEventListener("click", cardClick);
}

function cardClick(e)
{
	var selectedCards = document.querySelectorAll(".selected");
	if(selectedCards.length == 1)
	{
		if(selectedCards[0].parentElement != event.target.parentElement
			&& (event.target.classList.contains("card") 
				|| event.target.classList.contains("deck"))){

		console.log(selectedCards[0]);

		selectedCards[0].classList.remove("selected");

		var selectedElements = new Array(selectedCards[0]);
		var selectedParent = selectedCards[0].parentElement;
		var nextElementSibling = selectedCards[0].nextElementSibling;
		selectedParent.removeChild(selectedCards[0]);

		while(nextElementSibling != null){
			selectedElements.push(nextElementSibling);
			var nextElementSibling1 = nextElementSibling.nextElementSibling;
			selectedParent.removeChild(nextElementSibling);
			nextElementSibling = nextElementSibling1;
		}

			var newParent;
			if(event.target.classList.contains("card")){
				newParent = event.target.parentNode;
			}else if (event.target.classList.contains("deck")){
				newParent = event.target;
			}else	{
				throw new Exception("not implemented");
			}

			for(var i = 0; i < selectedElements.length; i++){
				newParent.appendChild(selectedElements[i]);
			}

			if(selectedParent.lastElementChild != null){
				selectedParent.lastElementChild.classList.add("open");
			}
			return;
			//check if deck is full
			//check if game is over / player wins
		}
		else{
			//cannot move modal box
		}
	}

	document.querySelectorAll(".selected").forEach(function(e){
		e.classList.remove("selected");
	});

	if(event.target.classList.contains("open"))
	{
		event.target.classList.add("selected");
	}
}
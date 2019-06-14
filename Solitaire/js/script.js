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
	
	this.$stashContainer = document.getElementById('stashDecks').getElementsByClassName("col-3")[0];
	this.$playContainer = document.getElementById('playDecks');
	this.$container = document.getElementById('game');

	this.$playContainer.addEventListener("click", cardClick);
	this.$stashContainer.addEventListener("click", stashClick);
}

function Card()
{

}

Card.prototype = {
	isSelected: function(card){
		return card.classList.contains("card") 
				&& card.classList.contains("open") 
				&& card.classList.contains("selected");
	},

	isOpened: function(card){
		return card.classList.contains("card") 
				&& card.classList.contains("open") 
				&& card.classList.contains("selected");
	}
}


function stashClick()
{
	if(event.target.classList.contains("card") && event.target.classList.contains("open") == false)
	{
		var parent = event.target.parentElement;
		parent.removeChild(event.target);
		parent.appendChild(event.target);
		event.target.classList.add("open");
	}
	else if(event.target.classList.contains('deck'))
	{
		Array.from(event.target.children).forEach(function(e){
			e.classList.remove("open");
		});
	}
	else if(event.target.classList.contains("open"))
	{
		event.target.classList.toggle("selected");
	}
}

function cardClick()
{
	var playSelected = document.getElementById('playDecks').querySelectorAll(".selected")[0];
	var stashSelected = document.getElementById('stashDecks').querySelectorAll(".selected")[0];
	
	if(playSelected != undefined)
	{
		playSelected.classList.remove("selected");
		
		if(playSelected.parentElement != event.target.parentElement
			&& (event.target.classList.contains("card") 
				|| event.target.classList.contains("deck")))
		{
			dropDownPlayCard(playSelected);
			//check if deck is full
			//check if game is over / player wins
		}
		else{
			playSelected.classList.remove("selected");
		}
	}
	else if(stashSelected != undefined){
		dropDownStashCard(stashSelected);
	}
	else
	{
		pickUpPlayCard();
	}
}

function pickUpPlayCard()
{
	if(event.target.classList.contains("open"))
	{
		event.target.classList.add("selected");
	}
}

function dropDownPlayCard(selectedCard)
{
	var selectedElements = new Array(selectedCard);
	var selectedParent = selectedCard.parentElement;
	selectedParent.removeChild(selectedCard);
	var nextElementSibling = selectedCard.nextElementSibling;

	while(nextElementSibling != null)
	{
		selectedElements.push(nextElementSibling);
		var nextElementSibling1 = nextElementSibling.nextElementSibling;
		selectedParent.removeChild(nextElementSibling);
		nextElementSibling = nextElementSibling1;
	}

	var newParent;
	if(event.target.classList.contains("card"))
	{
		newParent = event.target.parentNode;
	}
	else if (event.target.classList.contains("deck"))
	{
		newParent = event.target;
	}
	else	
	{
		throw new Exception("not implemented");
	}

	for(var i = 0; i < selectedElements.length; i++)
	{
		newParent.appendChild(selectedElements[i]);
	}
	if(selectedParent.lastElementChild != null)
	{
		selectedParent.lastElementChild.classList.add("open");
	}
}

function dropDownStashCard(selectedCard)
{
	var selectedParent = selectedCard.parentElement;
	selectedParent.removeChild(selectedCard);

	var newParent;
	if(event.target.classList.contains("card"))
	{
		newParent = event.target.parentNode;
	}
	else if (event.target.classList.contains("deck"))
	{
		newParent = event.target;
	}
	else	
	{
		throw new Exception("not implemented");
	}

	newParent.appendChild(selectedCard);
	selectedCard.classList.remove("selected");
}

function unselectAll(){
	document.querySelectorAll(".select").forEach(function(e){
		e.classList.remove("selected");
	})
}
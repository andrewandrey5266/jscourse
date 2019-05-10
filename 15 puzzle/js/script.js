function init(){
    document.getElementById("playGround").innerHTML = "";
    var playGround =  document.getElementById("playGround");
    
    var tableElement = document.createElement("table");
    tableElement.setAttribute('id', 'table');
    var tbodyElement = document.createElement("tbody");
    tbodyElement.addEventListener("click", move);
    for(var i = 0; i< 4; i++)
    {
    var trElement = document.createElement("tr");
    for(var j = 0; j< 4; j++)
        {
        var tdElement = document.createElement("td");
        tdElement.setAttribute("data-row", i );
        tdElement.setAttribute("data-column",  j);
        tdElement.setAttribute("data-index",  i * 4 + j + 1);
          tdElement.innerText = i * 4 + j + 1;  
          trElement.appendChild(tdElement);
        }   
        tbodyElement.appendChild(trElement);
    }

    tableElement.appendChild(tbodyElement);
    playGround.appendChild(tableElement);

    tableElement.querySelector("[data-index='16']").innerText = "";
}

function newGame(){
   console.log("notImplementedException");
}

function move(){
    var tbodyElement = document.getElementById("table");
    
    var rowIndex = parseInt(event.target.dataset.row);
    var columnIndex = parseInt(event.target.dataset.column);

    if(rowIndex + 1 < 4 && tbodyElement.rows[rowIndex+1].cells[columnIndex].innerText === ""){
        tbodyElement.rows[rowIndex+1].cells[columnIndex].innerText = tbodyElement.rows[rowIndex].cells[columnIndex].innerText;
        tbodyElement.rows[rowIndex].cells[columnIndex].innerText = "";
    }
    if(rowIndex - 1 > -1 && tbodyElement.rows[rowIndex-1].cells[columnIndex].innerText === ""){
        tbodyElement.rows[rowIndex-1].cells[columnIndex].innerText = tbodyElement.rows[rowIndex].cells[columnIndex].innerText;
        tbodyElement.rows[rowIndex].cells[columnIndex].innerText = "";
    }

    if(columnIndex + 1 < 4 && tbodyElement.rows[rowIndex].cells[columnIndex+1].innerText === ""){
        tbodyElement.rows[rowIndex].cells[columnIndex+1].innerText = tbodyElement.rows[rowIndex].cells[columnIndex].innerText;
        tbodyElement.rows[rowIndex].cells[columnIndex].innerText = "";
    }
    if(columnIndex - 1 > -1 && tbodyElement.rows[rowIndex].cells[columnIndex-1].innerText === ""){
        tbodyElement.rows[rowIndex].cells[columnIndex-1].innerText = tbodyElement.rows[rowIndex].cells[columnIndex].innerText;
        tbodyElement.rows[rowIndex].cells[columnIndex].innerText = "";
    }

}

document.getElementById("newGameButton").addEventListener("click", newGame)
init();
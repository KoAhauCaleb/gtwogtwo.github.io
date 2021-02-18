
var speed = 50;
var slider = document.getElementById("speed");
slider.oninput = function() {
    speed = this.value;
    document.getElementById("speedOut").innerText = "Speed: " + (speed - 1)
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function drawCells(cells){
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 19; j++){
            if (cells[i][j] == 0){
                ctx.fillStyle = "#000000";
                ctx.fillRect(j * 20, i * 20, 20, 20);
            }
            else if (cells[i][j] == 0){
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(j * 20, i * 20, 20, 20);
            }
        }
    }
}

function calcCells(cells){
    ctx.clearRect(0, 0, 400, 400);
    let newCells = JSON.parse(JSON.stringify(cells));
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 20; j++){
            
            var liveSuroundingCellCount = 0;
            
            if(i < 19 && cells[i+1][j] == 1){
                liveSuroundingCellCount++;
            }
            if(i > 0 && cells[i-1][j] == 1){
                liveSuroundingCellCount++;
            }
            if(j < 19 && cells[i][j+1] == 1){
                liveSuroundingCellCount++;
            }
            if(j > 0 && cells[i][j-1] == 1){
                liveSuroundingCellCount++;
            }
            if(i < 19 && j < 19 && cells[i+1][j+1] == 1){
                liveSuroundingCellCount++;
            }
            if(i > 0 && j > 0 && cells[i-1][j-1] == 1){
                liveSuroundingCellCount++;
            }
            if(i < 19 && j > 0 && cells[i+1][j-1] == 1){
                liveSuroundingCellCount++;
            }
            if(i > 0 && j < 19 && cells[i-1][j+1] == 1){
                liveSuroundingCellCount++;
            }
            
            if(cells[i][j] == 0 && (liveSuroundingCellCount == 2 || liveSuroundingCellCount == 3)){
                newCells[i][j] = 1;
            }
            else if (cells[i][j] == 1 && liveSuroundingCellCount != 3){
                newCells[i][j] = 0;
            }
        }
    }
    return JSON.parse(JSON.stringify(newCells));
}

function sleep(ms){ 
    //code written by Dan Dascalescu on stackoverflow.com
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
    var cells = [
        
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]

    while (true){
        if(speed > 1){
            cells = calcCells(cells);
            console.log(cells);
            drawCells(cells);
            await sleep(700-speed);
        }
        await sleep(1);
    }
}

main();

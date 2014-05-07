var canvas;
var context;
var theMaze = null;
var colors = ['#0099CC', '#9933CC', '#669900', '#FF8A00', '#CC0000', '#33B5E5', '#AA66CC', '#99CC00', '#FFBB33', '#FF4444', '#A8DFF4',
    '#DDBCEE', '#D3E992', '#FFE3A0', '#FFCACA', '#00008B', '#008B8B', '#B8860B', '#A9A9A9', '#006400', '#BDB76B', '#8B008B', '#556B2F',
    '#FF8C00', '#8B0000', '#E9967A', '#8FBC8F'];

function newMaze() {
    var players = [];
    if (theMaze) {
        players = theMaze.players;
    }
    document.getElementById('maze').remove();
    document.getElementById('maze-container').innerHTML = "<canvas oncontextmenu='return false;' id='maze' width='750' height='750'></canvas>";
    window.checkDebug();
    canvas = document.getElementById('maze');
    context = canvas.getContext('2d');
    context.font = "bold 20px sans-serif";
    $(document).keydown(handleKeypress);

    makeMaze();

    for (var id in players) {
        addPlayer(id);
    }
}
$(document).ready(function () {
    newMaze();
});

function makeMaze() {
    var rows = 25;
    var columns = 25;
    var gridsize = 25;
    var mazeStyle = "straight";
    /*
     var startColumn = $('#startX').val();
     var startRow = $('#startY').val();
     var endColumn = $('#endX').val();
     var endRow = $('#endY').val();
     */
    var startColumn = 0;
    var startRow = 0;
    var endColumn = columns - 1;
    var endRow = rows - 1;
    var wallR = 0;
    var wallG = 0;
    var wallB = 0;
    var backgroundR = 255;
    var backgroundG = 255;
    var backgroundB = 255;
    var solutionR = 255;
    var solutionG = 200;
    var solutionB = 200;
    var wallColor = "rgb(" + wallR + "," + wallG + "," + wallB + ")";
    var backgroundColor = "rgb(" + backgroundR + "," + backgroundG + "," + backgroundB + ")";
    var solutionColor = "rgb(" + solutionR + "," + solutionG + "," + solutionB + ")";
    theMaze = new maze(rows, columns, gridsize, mazeStyle, startColumn, startRow, endColumn, endRow, wallColor, backgroundColor, solutionColor);
    theMaze.generate();
    theMaze.draw();
}

function handleMessage(action, playerId) {
    var player = theMaze.players[playerId];
    if (player) {
        handleKeypress(action, player);
    }
}

function addPlayer(playerId) {
    var color = colors[theMaze.playersCount % colors.length];
    theMaze.players[playerId] = {
        x: theMaze.startColumn,
        y: theMaze.startRow,
        color: color
    };
    theMaze.playersCount++;
    theMaze.drawPlayers();
    return color;
}

function removePlayer(playerId) {
    theMaze.players[playerId] = undefined;
    // TODO: clear maze
}

function checkWinner(player) {
    if (player.x == theMaze.endColumn && player.y == theMaze.endRow) {
        var winner = document.getElementById('winner');
        winner.style.display = 'block';
        document.getElementById('winner-color').style.backgroundColor = player.color;
        setTimeout(function () {
            winner.style.display = 'none';
            newMaze();
        }, 10000);
    }
}

function handleKeypress(direction, playerId) {
    var player = theMaze.players[playerId];
    if (!player) {
        return;
    }
    var currentPlayerGrid = theMaze.grid[player.x][player.y];
    var isMoving = false;
    var changeX = 0;
    var changeY = 0;

    switch (direction) {
        case 'wall':

            for (var pos in currentPlayerGrid ) {
                pos
            }
            break;
        case 'left':
        {
            //left key
            if (currentPlayerGrid.leftWall == false) {
                changeX = -1;
                isMoving = true;
            }
            break;
        }
        case 'up':
        {
            //up key
            if (currentPlayerGrid.topWall == false) {
                changeY = -1;
                isMoving = true;
            }
            break;
        }
        case 'right':
        {
            //right key
            if (currentPlayerGrid.rightWall == false) {
                changeX = 1;
                isMoving = true;
            }
            break;
        }
        case 'down':
        {
            //down key
            if (currentPlayerGrid.bottomWall == false) {
                changeY = 1;
                isMoving = true
            }
            break;
        }
        default:
        {
            //not a key we care about
            break;
        }
    }
    if (isMoving == true) {
        theMaze.redrawCell(theMaze.grid[player.x][player.y]);
        player.x += changeX;
        player.y += changeY;
        theMaze.drawPlayers();
        checkWinner(player);
    }
};

function maze(rows, columns, gridsize, mazeStyle, startColumn, startRow, endColumn, endRow, wallColor, backgroundColor, solutionColor) {
    this.rows = rows;
    this.columns = columns;
    this.gridsize = gridsize;
    this.mazeStyle = mazeStyle;
    this.sizex = gridsize * rows;
    this.sizey = gridsize * columns;
    this.halfgridsize = this.gridsize / 2;
    this.grid = new Array(this.columns);
    this.history = [];
    this.startColumn = parseInt(startColumn);
    this.startRow = parseInt(startRow);
    this.players = [];
    this.playersCount = 0;
    this.endColumn = parseInt(endColumn);
    this.endRow = parseInt(endRow);
    this.wallColor = wallColor;
    this.backgroundColor = backgroundColor;
    this.solutionColor = solutionColor;
    this.lineWidth = 2;
    this.genStartColumn = Math.floor(Math.random() * (this.columns - 1));
    this.genStartRow = Math.floor(Math.random() * (this.rows - 1));
    this.cellCount = this.columns * this.rows;
    this.generatedCellCount = 0;
    for (var i = 0; i < columns; i++) {
        this.grid[i] = new Array(rows);
    }
    for (var j = 0; j < this.columns; j++) {
        for (k = 0; k < this.rows; k++) {
            var isStart = false;
            var isEnd = false;
            var partOfMaze = false;
            var isGenStart = false;
            if (j == this.startColumn && k == this.startRow) {
                isStart = true;
            }
            if (j == this.genStartColumn && k == this.genStartRow) {
                partOfMaze = true;
                isGenStart = true;
            }
            if (j == this.endColumn && k == this.endRow) {
                isEnd = true;
            }
            this.grid[j][k] = new cell(j, k, partOfMaze, isStart, isEnd, isGenStart);
        }
    }
};

maze.prototype.generate = function () {
    var theMaze = this;
    var currentCell = this.grid[this.genStartColumn][this.genStartRow];
    var nextCell;
    var leftCellPartOfMaze = false;
    var topCellPartOfMaze = false;
    var rightCellPartOfMaze = false;
    var bottomCellPartOfMaze = false;
    var currentX = this.genStartColumn;
    var currentY = this.genStartRow;
    var changeX = 0;
    var changeY = 0;
    var previousChangeX = 0;
    var previousChangeY = 0;
    var leftCell;
    var topCell;
    var rightCell;
    var bottomCell;
    var direction;
    var leftChoices;
    var rightChoices;
    var downChoices;
    var upChoices;
    var biasDirection;
    var choices;
    while (this.generatedCellCount < this.cellCount - 1) {
        doGeneration();
    }
    function chooseCell() {
        changeX = 0;
        changeY = 0;
        choices = [];
        biasDirection = '';
        if (previousChangeX == -1) {
            biasDirection = 'left';
        } else if (previousChangeX == 1) {
            biasDirection = 'right';
        } else if (previousChangeY == -1) {
            biasDirection = 'up';
        } else if (previousChangeY == 1) {
            biasDirection = 'down';
        }
        direction = '';
        leftChoices = [0, 0, 0, 0, 0];
        upChoices = [1, 1, 1, 1, 1];
        rightChoices = [2, 2, 2, 2, 2];
        downChoices = [3, 3, 3, 3, 3];
        switch (theMaze.mazeStyle) {

            case "curvy":
            {
                if (biasDirection == 'left') {
                    leftChoices = [0, 0];
                } else if (biasDirection == 'right') {
                    rightChoices = [2, 2];
                } else if (biasDirection == 'down') {
                    downChoices = [3, 3];
                } else if (biasDirection == 'up') {
                    upChoices = [1, 1]
                }
                break;
            }
            case "straight":
            {
                leftChoices = [0];
                upChoices = [1];
                rightChoices = [2];
                downChoices = [3];
                if (biasDirection == 'left') {
                    leftChoices = [0, 0, 0, 0, 0, 0, 0, 0];
                } else if (biasDirection == 'right') {
                    rightChoices = [2, 2, 2, 2, 2, 2, 2, 2];
                } else if (biasDirection == 'down') {
                    downChoices = [3, 3, 3, 3, 3, 3, 3, 3];
                } else if (biasDirection == 'up') {
                    upChoices = [1, 1, 1, 1, 1, 1, 1, 1]
                }
                break;
            }
            case "normal":
            {
                leftChoices = [0];
                upChoices = [1];
                rightChoices = [2];
                downChoices = [3];
                break;
            }
        }
        choices = leftChoices.concat(rightChoices.concat(downChoices.concat(upChoices)));
        var rand = Math.floor(Math.random() * choices.length);
        var weightedRand = choices[rand];
        switch (weightedRand) {
            case 0:
            {
                nextCell = leftCell;
                changeX = -1;
                direction = 'left';
                break;
            }
            case 1:
            {
                nextCell = topCell;
                changeY = -1;
                direction = 'up';
                break;
            }
            case 2:
            {
                nextCell = rightCell;
                changeX = 1;
                direction = 'right';
                break;
            }
            case 3:
            {
                nextCell = bottomCell;
                changeY = 1;
                direction = 'down';
                break;
            }
            default:
            {
                nextCell = null;
                changeY = 0;
                changeX = 0;
                break;
            }
        }

        if (nextCell == null || nextCell.partOfMaze == true) {
            chooseCell();
        } else {
            currentX += changeX;
            currentY += changeY;
            previousChangeX = changeX;
            previousChangeY = changeY;
            theMaze.history.push(direction);
        }
    }

    function addToMaze() {
        nextCell.partOfMaze = true;
        if (changeX == -1) {
            currentCell.leftWall = false;
            nextCell.rightWall = false;
        }
        if (changeY == -1) {
            currentCell.topWall = false;
            nextCell.bottomWall = false;
        }
        if (changeX == 1) {
            currentCell.rightWall = false;
            nextCell.leftWall = false;
        }
        if (changeY == 1) {
            currentCell.bottomWall = false;
            nextCell.topWall = false;
        }
    }

    function doGeneration() {
        //stop generation if the maze is full
        if (theMaze.generatedCellCount == theMaze.cellCount - 1) {
            return;
        }
        //do actual generation
        changeX = 0;
        changeY = 0;
        if (currentX > 0) {
            leftCell = theMaze.grid[currentX - 1][currentY];
            leftCellPartOfMaze = leftCell.partOfMaze;
        } else {
            leftCell = null;
            leftCellPartOfMaze = true;
        }
        if (currentY > 0) {
            topCell = theMaze.grid[currentX][currentY - 1];
            topCellPartOfMaze = topCell.partOfMaze;

        } else {
            topCell = null;
            topCellPartOfMaze = true;
        }
        if (currentX < (theMaze.columns - 1)) {
            rightCell = theMaze.grid[currentX + 1][currentY];
            rightCellPartOfMaze = rightCell.partOfMaze;
        } else {
            rightCell = null;
            rightCellPartOfMaze = true;
        }
        if (currentY < (theMaze.rows - 1)) {
            bottomCell = theMaze.grid[currentX][currentY + 1];
            bottomCellPartOfMaze = bottomCell.partOfMaze;
        } else {
            bottomCell = null;
            bottomCellPartOfMaze = true;
        }
        if (leftCellPartOfMaze == true && topCellPartOfMaze == true && rightCellPartOfMaze == true && bottomCellPartOfMaze == true) {
            //go back and check previous cell for generation
            var lastDirection = theMaze.history.pop();
            changeX = 0;
            changeY = 0;
            switch (lastDirection) {
                case 'left':
                {
                    changeX = 1;
                    break;
                }
                case 'up':
                {
                    changeY = 1;
                    break;
                }
                case 'right':
                {
                    changeX = -1;
                    break;
                }
                case 'down':
                {
                    changeY = -1;
                    break;
                }
            }
            nextCell = theMaze.grid[currentX + changeX][currentY + changeY];
            currentX += changeX;
            currentY += changeY;
            currentCell = nextCell;
            doGeneration();

        } else {
            chooseCell();
            addToMaze();
            currentCell = nextCell;
            theMaze.generatedCellCount += 1;
        }
    }
};

maze.prototype.draw = function () {
    var totalWidth = this.columns * this.gridsize;
    var totalHeight = this.rows * this.gridsize;
    var mazeDom = document.getElementById('maze');
    mazeDom.width = totalWidth;
    mazeDom.height = totalHeight;
    context.lineWidth = this.lineWidth;
    context.clearRect(0, 0, totalWidth, totalHeight);
    context.strokeStyle = this.wallColor;
    for (var j = 0; j < this.columns; j++) {
        for (var k = 0; k < this.rows; k++) {
            var drawX = (j * this.gridsize);
            var drawY = (k * this.gridsize);
            var pastX = parseInt(drawX) + parseInt(this.gridsize);
            var pastY = parseInt(drawY) + parseInt(this.gridsize);
            var theCell = this.grid[j][k];
            //this.drawColors(theCell);

            if (theCell.partOfSolution == true) {
                context.fillStyle = this.solutionColor;
            } else {
                context.fillStyle = this.backgroundColor;
            }
            if (theCell.isStart == true) {
                context.fillStyle = "#00FF00";
            }
            if (theCell.isEnd == true) {
                context.fillStyle = "#FF0000";
            }
            if (theCell.isGenStart == true) {
                //context.fillStyle = "#0000FF";
            }

            context.fillRect(drawX, drawY, this.gridsize, this.gridsize);
            context.beginPath();
            if (theCell.leftWall == true) {
                //context.strokeRect(drawX, drawY, 1, this.gridsize);
                context.moveTo(drawX, drawY);
                context.lineTo(drawX, pastY);
            }
            if (theCell.topWall == true) {
                //context.strokeRect(drawX, drawY, this.gridsize, 1);
                context.moveTo(drawX, drawY);
                context.lineTo(pastX, drawY);
            }
            if (theCell.rightWall == true) {
                //context.strokeRect((drawX + this.gridsize), drawY, 1, this.gridsize);
                context.moveTo(pastX, drawY);
                context.lineTo(pastX, pastY);
            }
            if (theCell.bottomWall == true) {
                //context.strokeRect(drawX, (drawY + this.gridsize), this.gridsize, 1);
                context.moveTo(drawX, pastY);
                context.lineTo(pastX, pastY);
            }
            context.closePath();
            context.stroke();

        }
    }
    this.drawPlayers();
};

maze.prototype.redrawCell = function (theCell) {
    //console.log(theCell);
    var drawX = (theCell.x * this.gridsize);
    var drawY = (theCell.y * this.gridsize);
    var pastX = parseInt(drawX) + parseInt(this.gridsize);
    var pastY = parseInt(drawY) + parseInt(this.gridsize);
    if (theCell.partOfSolution == true) {
        context.fillStyle = "#FFCCCC";
    } else {
        context.fillStyle = this.backgroundColor;
    }
    if (theCell.isStart == true) {
        context.fillStyle = "#00FF00";
    }
    if (theCell.isEnd == true) {
        context.fillStyle = "#FF0000";
    }
    if (theCell.isGenStart == true) {
        //context.fillStyle = "#0000FF";
    }
    context.fillRect(drawX, drawY, this.gridsize, this.gridsize);
    context.beginPath();
    if (theCell.leftWall == true) {
        //context.strokeRect(drawX, drawY, 1, this.gridsize);
        context.moveTo(drawX, drawY);
        context.lineTo(drawX, pastY);
    }
    if (theCell.topWall == true) {
        //context.strokeRect(drawX, drawY, this.gridsize, 1);
        context.moveTo(drawX, drawY);
        context.lineTo(pastX, drawY);
    }
    if (theCell.rightWall == true) {
        //context.strokeRect((drawX + this.gridsize), drawY, 1, this.gridsize);
        context.moveTo(pastX, drawY);
        context.lineTo(pastX, pastY);
    }
    if (theCell.bottomWall == true) {
        //context.strokeRect(drawX, (drawY + this.gridsize), this.gridsize, 1);
        context.moveTo(drawX, pastY);
        context.lineTo(pastX, pastY);
    }
    context.closePath();
    context.stroke();
};

maze.prototype.drawPlayers = function () {
    for (var id in theMaze.players) {
        var player = theMaze.players[id];
        var drawX = player.x * this.gridsize + (this.gridsize / 2);
        var drawY = player.y * this.gridsize + (this.gridsize / 2);
        context.fillStyle = player.color;
        context.beginPath();
        context.arc(drawX, drawY, (this.gridsize / 4), 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
};

function cell(column, row, partOfMaze, isStart, isEnd, isGenStart) {
    this.x = column;
    this.y = row;
    this.leftWall = true;
    this.topWall = true;
    this.rightWall = true;
    this.bottomWall = true;
    this.partOfMaze = partOfMaze;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.partOfSolution = false;
    this.visited = false;
    this.isGenStart = isGenStart;
    this.isPlayer = false;
};
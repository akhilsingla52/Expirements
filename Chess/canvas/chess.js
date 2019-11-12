var startX = 0;
var left = 0;
const BLOCK = 8;


var createBoard = function() {
	rank = ["A","B","C","D","E","F","G","H"];
    file = [1,2,3,4,5,6,7,8];
    pieces = ['King', 'Queen', 'Rooks', 'Rooks', 'Bishops', 'Bishops', 'Knights', 'Knights', 
                    'Pawns', 'Pawns', 'Pawns', 'Pawns', 'Pawns', 'Pawns', 'Pawns', 'Pawns'];

	var currentTile = {};

  	var count = 0;


  	/*Creates a chessboard.
	- For loop between 1 - 8
	- Nested another for loop 1 - 8 (for a 64 tile grid)
	- Every 9th tile gets clear:left to start on a new line
	- Assigns a name to the data-gridpos using the variable arrays RANK and FILE.
	- Checks if current div is "Even + Even"/"Odd+Odd" or "Odd + Even". Assigns colour based on it's findings.
  	- Increases count, and repeats.
    */     
   $(document).ready(function() {
        var c = $("#chessboard")[0]
        var ctx = c.getContext('2d');
        var blockSize = c.width / 8;
        
        ctx.fillStyle = '#a56d35';
        for(var i=0; i<rank.length; i++) {
            var p = 1;
            if(i%2==0) p=0;
            for(var j=p; j<file.length; j=j+2) {
                ctx.fillRect(j*blockSize,i*blockSize,blockSize,blockSize);
            }
        }

        ctx.font = '10pt Calibri';
        ctx.fillStyle = 'black';
        for(var i=0; i<rank.length; i++) {
            ctx.fillText('&#9812;',(i*blockSize)+10,40);
        }
    });
}

createBoard();
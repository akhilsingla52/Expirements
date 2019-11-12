var currentPosition = ""; 
var blackPlayerDefaultPieces = [ 'black_chess_rock_1', 'black_chess_knight_1', 'black_chess_bishop_1',
                            'black_chess_queen', 'black_chess_king', 
                            'black_chess_bishop_2', 'black_chess_knight_2', 'black_chess_rock_2', 
                            'black_chess_pawn_1', 'black_chess_pawn_2', 'black_chess_pawn_3', 'black_chess_pawn_4', 
                            'black_chess_pawn_5', 'black_chess_pawn_6', 'black_chess_pawn_7', 'black_chess_pawn_8' ];
var whitePlayerDefaultPieces = [ 'white_chess_rock_1', 'white_chess_knight_1', 'white_chess_bishop_1',
                            'white_chess_queen', 'white_chess_king', 
                            'white_chess_bishop_2', 'white_chess_knight_2', 'white_chess_rock_2', 
                            'white_chess_pawn_1', 'white_chess_pawn_2', 'white_chess_pawn_3', 'white_chess_pawn_4', 
                            'white_chess_pawn_5', 'white_chess_pawn_6', 'white_chess_pawn_7', 'white_chess_pawn_8' ];
var blackPlayerPieces = [];
var whitePlayerPieces = [];

var createBoard = function() {
	rank = ["A","B","C","D","E","F","G","H"];
    file = [1,2,3,4,5,6,7,8];
        
    var blackInitialPositions = ['A1','A2','A3','A4','A5','A6','A7','A8','B1','B2','B3','B4','B5','B6','B7','B8'];
    var whiteInitialPositions = ['H1','H2','H3','H4','H5','H6','H7','H8','G1','G2','G3','G4','G5','G6','G7','G8'];
    var blackPieceNames = ['&#9820;','&#9822;','&#9821;','&#9819;','&#9818;','&#9821;','&#9822;','&#9820;',
                                '&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;','&#9823;'];
    var whitePieceNames = ['&#9814;','&#9816;','&#9815;','&#9812;','&#9813;','&#9815;','&#9816;','&#9814;',
                                '&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;','&#9817;'];
    blackPlayerPieces = blackPlayerDefaultPieces;
    whitePlayerPieces = whitePlayerDefaultPieces;

    var chessboard = "";
    for(var i=0; i<rank.length; i++) {
        for(var j=0; j<file.length; j=j+2) {
            if(i%2==0) 
                chessboard += '<div class="chess-block chess-block-wood" id="'+ rank[i]+file[j] +'"></div><div class="chess-block chess-block-cream" id="'+ rank[i]+file[j+1] +'"></div>';
            else
                chessboard += '<div class="chess-block chess-block-cream" id="'+ rank[i]+file[j] +'"></div><div class="chess-block chess-block-wood" id="'+ rank[i]+file[j+1]+'"></div>';
        }
    }
   
    $(function() {
        $('#chessboard').html(chessboard);

        $.each(blackInitialPositions, function( index, value ) {
            $('#'+value).html('<h1 id="'+blackPlayerPieces[index]+'" class="chess-piece">'+blackPieceNames[index]+'</h1>');
        });

        $.each(whiteInitialPositions, function( index, value ) {
            $('#'+value).html('<h1 id="'+whitePlayerPieces[index]+'" class="chess-piece">'+whitePieceNames[index]+'</h1>');
        });

        blackPlayerDraggable();
        
        $.each(rank, function( i1, v1 ) {
            $.each(file, function( i2, v2 ) {
                $('#'+v1+v2).droppable({
                    drop: function( event, ui ) {
                        $(ui.draggable).css({ "left": "0", "top": "0" });
                        $('#'+event.target.id).html(event.toElement.outerHTML);
                        $('#'+event.originalEvent.target.parentElement.id).empty();
                        
                        if(event.toElement.id.indexOf("black") != -1){
                            whitePlayerDraggable();
                        } else if(event.toElement.id.indexOf("white") != -1) {
                            blackPlayerDraggable();
                        } else {

                        }
                    }
                });
            })
        });

    });
}

$(function() {
    $("#startButton").click(function(){
        createBoard();
    });
});

var blackPlayerDraggable = function() {
    $.each(whitePlayerPieces, function( index, value ) {
        $('#'+value).removeClass('chess-piece-hover');
        $('#'+value).draggable({disabled: true});
    });
    $.each(blackPlayerPieces, function( index, value ) {
        $('#'+value).addClass('chess-piece-hover');
        $('#'+value).draggable({
            revert: "invalid",
            refreshPositions: true,
            disabled: false
        });
    });
}

var whitePlayerDraggable = function() {
    $.each(blackPlayerPieces, function( index, value ) {
        $('#'+value).removeClass('chess-piece-hover');
        $('#'+value).draggable({disabled: true});
    });
    $.each(whitePlayerPieces, function( index, value ) {
        $('#'+value).addClass('chess-piece-hover');
        $('#'+value).draggable({
            revert: "invalid",
            refreshPositions: true,
            disabled: false
        });
    });
}
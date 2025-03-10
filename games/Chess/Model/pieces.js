class Pieces {
    constructor(color, square) {
        this.color = color;
        this.square = square;
        this.direction = color === 'white' ? -1 : 1;
        const validMoves = [];
    }

    isValidSquare(square) {
        const [row, col] = square;
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    canMoveToSquare(square, board) {
        const [targetRow, targetCol] = square;
        const [currentRow, currentCol] = this.square;
      
        if (targetRow < 0 || targetRow >= 8 || targetCol < 0 || targetCol >= 8) {
          return false;
        }
      
        if (board[targetRow][targetCol] && board[targetRow][targetCol].color === this.color) {
          return false;
        }

        return true;
      }

      clearValidMoves() {
        this.validMoves = [];
      }
    
      updateValidMoves(board) {
        this.clearValidMoves();
        return this.getValidMoves(board);
      }
}

class Pawn extends Pieces {
    constructor(color, square) {
        super(color, square);
        this.image = `images/${color}Pawn.png`;
    }

    getValidMoves(board) {
        const validMoves = [];
        const [currentRow, currentCol] = this.square;
        const forwardSquare = [currentRow + this.direction, currentCol];
        if (this.isValidSquare(forwardSquare, board) && !board[forwardSquare[0]][forwardSquare[1]]) {
            validMoves.push(forwardSquare);
        }
        const doubleForwardSquare = [currentRow + 2 * this.direction, currentCol];
        if (this.isFirstMove() && this.isValidSquare(doubleForwardSquare, board) && !board[doubleForwardSquare[0]][doubleForwardSquare[1]]) {
            validMoves.push(doubleForwardSquare);
        }
        const attackSquares = [
            [currentRow + this.direction, currentCol - 1],
            [currentRow + this.direction, currentCol + 1]
        ];
        for (const attackSquare of attackSquares) {
            if (this.isValidSquare(attackSquare, board) && this.hasOpponentPiece(attackSquare, board)) {
                validMoves.push(attackSquare);
            }
        }
        return validMoves;
    }

    isFirstMove() {
        return this.color === 'white' && this.square[0] === 6 ||
            this.color === 'black' && this.square[0] === 1;
    }

    hasOpponentPiece(square, board) {
        const [row, col] = square;
        return board[row][col] && board[row][col].color !== this.color;
    }
}

class Rook extends Pieces {
    constructor(color, square) {
        super(color, square);
        this.image = `images/${color}Rook.png`;
    }
}

class Knight extends Pieces {
    constructor(color, square) {
        super(color, square);
        this.image = `images/${color}Knight.png`;
    }

    getValidMoves(board) {
        const validMoves = [];
        const [currentRow, currentCol] = this.square;

        const moveSquares = [
            [currentRow - 2, currentCol - 1],
            [currentRow - 2, currentCol + 1],
            [currentRow - 1, currentCol - 2],
            [currentRow - 1, currentCol + 2],
            [currentRow + 1, currentCol - 2],
            [currentRow + 1, currentCol + 2],
            [currentRow + 2, currentCol - 1],
            [currentRow + 2, currentCol + 1]
        ];
        for (const moveSquare of moveSquares) {
            if (this.isValidSquare(moveSquare, board) && !board[moveSquare[0]][moveSquare[1]]) {
                validMoves.push(moveSquare);
            }
        }
        return validMoves;
    }
}

class Bishop extends Pieces {
    constructor(color, square) {
        super(color, square);
        this.image = `images/${color}Bishop.png`;
    }
}

class Queen extends Pieces {
    constructor(color, square) {
        super(color, square);
        this.image = `images/${color}Queen.png`;
    }
}

class King extends Pieces {
    constructor(color, square) {
        super(color, square);
        this.image = `images/${color}King.png`;
    }
}

class Epiece extends Pieces {
    constructor(color, square) {
        super(color, square);
        this.image = `images/Empty.png`;
    }
}


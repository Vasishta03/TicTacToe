class TicTacToe {
    constructor() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.gameOver = false;
      
      this.cells = document.querySelectorAll('.cell');
      this.status = document.getElementById('status');
      this.resetBtn = document.getElementById('resetBtn');
      this.themeToggle = document.getElementById('themeToggle');
      
      this.initializeGame();
      this.initializeTheme();
    }
    
    initializeGame() {
      this.cells.forEach(cell => {
        cell.addEventListener('click', () => this.handleCellClick(cell));
      });
      
      this.resetBtn.addEventListener('click', () => this.resetGame());
    }
  
    initializeTheme() {
      const darkMode = localStorage.getItem('darkMode') === 'true';
      if (darkMode) {
        document.body.classList.add('dark-mode');
      }
  
      this.themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      });
    }
    
    handleCellClick(cell) {
      const index = cell.dataset.index;
      
      if (this.board[index] || this.gameOver) return;
      
      this.board[index] = this.currentPlayer;
      cell.classList.add(this.currentPlayer.toLowerCase());
      cell.textContent = this.currentPlayer;
      
      if (this.checkWinner()) {
        this.status.textContent = `Player ${this.currentPlayer} wins!`;
        this.gameOver = true;
        return;
      }
      
      if (this.checkDraw()) {
        this.status.textContent = 'Game ended in a draw!';
        this.gameOver = true;
        return;
      }
      
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.status.textContent = `Player ${this.currentPlayer}'s turn`;
    }
    
    checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
      
      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return this.board[a] &&
          this.board[a] === this.board[b] &&
          this.board[a] === this.board[c];
      });
    }
    
    checkDraw() {
      return this.board.every(cell => cell !== null);
    }
    
    resetGame() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.gameOver = false;
      
      this.cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
      });
      
      this.status.textContent = `Player ${this.currentPlayer}'s turn`;
    }
  }
  
  // Initialize the game
  new TicTacToe();
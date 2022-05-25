let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;
let currTile;
let otherTile;

window.onload = function () {
	startGame();

	// Every 100 ms call the function
	window.setInterval(function () {
		crushCandy();
		slideCandy();
		generateCandy();
	}, 250);
};

function randomCandy() {
	return candies[Math.floor(Math.random() * candies.length)]; // 0 - 5.99
}

function startGame() {
	for (let r = 0; r < rows; r++) {
		let row = [];
		for (let c = 0; c < columns; c++) {
			// Create <img id="0=0" src="/images/Red.png">
			let tile = document.createElement("img");
			tile.id = r.toString() + "-" + c.toString();
			tile.src = "./images/" + randomCandy() + ".png";

			// Drag functionality
			tile.addEventListener("dragstart", dragStart); // Click on a candy, initialize drag process
			tile.addEventListener("dragover", dragOver); // Clicking on candy, moving to drag the candy
			tile.addEventListener("dragenter", dragEnter); // Dragging candy onto another candy
			tile.addEventListener("dragleave", dragLeave); // Leave candy over another candy
			tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
			tile.addEventListener("dragend", dragEnd); // After drag process completed, we swap candy

			document.getElementById("board").append(tile);
			row.push(tile);
		}
		board.push(row);
	}
}

function dragStart() {
	// This refers to tile that was clicked on for dragging
	currTile = this;
}

function dragOver(e) {
	e.preventDefault();
}

function dragEnter(e) {
	e.preventDefault();
}

function dragLeave(e) {
	e.preventDefault();
}

function dragDrop(e) {
	// This refers to the target tile that was dropped on
	e.preventDefault();
	otherTile = this;
}

function dragEnd() {
	// Make sure candy can't swap with blank
	if (currTile.src.includes("blank") || otherTile.src.includes("blank")) return;

	let currCoords = currTile.id.split("-"); // id = "0-0" -> ["0", "0"]
	let r = parseInt(currCoords[0]);
	let c = parseInt(currCoords[1]);

	let otherCoords = otherTile.id.split("-"); // id = "0-0" -> ["0", "0"]
	let r2 = parseInt(otherCoords[0]);
	let c2 = parseInt(otherCoords[1]);

	let moveLeft = c2 == c - 1 && r == r2;
	let moveRight = c2 == c + 1 && r == r2;
	let moveUp = r2 == r - 1 && c == c2;
	let moveDown = r2 == r + 1 && c == c2;

	let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

	if (isAdjacent) {
		let currImg = currTile.src;
		let otherImg = otherTile.src;
		currTile.src = otherImg;
		otherTile.src = currImg;

		// If two candies can't make 3 rows or 3 columns, don't swap
		let validMove = checkValid();
		if (!validMove) {
			let currImg = currTile.src;
			let otherImg = otherTile.src;
			currTile.src = otherImg;
			otherTile.src = currImg;
		}
	}
}

function crushCandy() {
	crushFive();
	crushFour();
	crushThree();
	document.getElementById("score").innerText = score;
}

function crushThree() {
	// Check rows
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns - 2; c++) {
			let candy1 = board[r][c];
			let candy2 = board[r][c + 1];
			let candy3 = board[r][c + 2];

			if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
				candy1.src = "./images/blank.png";
				candy2.src = "./images/blank.png";
				candy3.src = "./images/blank.png";
				score += 30;
			}
		}
	}
	// Check columns
	for (let c = 0; c < columns; c++) {
		for (let r = 0; r < rows - 2; r++) {
			let candy1 = board[r][c];
			let candy2 = board[r + 1][c];
			let candy3 = board[r + 2][c];

			if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
				candy1.src = "./images/blank.png";
				candy2.src = "./images/blank.png";
				candy3.src = "./images/blank.png";
				score += 30;
			}
		}
	}
}

function crushFour() {
	// Check rows
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns - 3; c++) {
			let candy1 = board[r][c];
			let candy2 = board[r][c + 1];
			let candy3 = board[r][c + 2];
			let candy4 = board[r][c + 3];

			if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
				candy1.src = "./images/blank.png";
				candy2.src = "./images/blank.png";
				candy3.src = "./images/blank.png";
				candy4.src = "./images/blank.png";
				score += 60;
			}
		}
	}
	// Check columns
	for (let c = 0; c < columns; c++) {
		for (let r = 0; r < rows - 3; r++) {
			let candy1 = board[r][c];
			let candy2 = board[r + 1][c];
			let candy3 = board[r + 2][c];
			let candy4 = board[r + 3][c];

			if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
				candy1.src = "./images/blank.png";
				candy2.src = "./images/blank.png";
				candy3.src = "./images/blank.png";
				candy4.src = "./images/blank.png";
				score += 60;
			}
		}
	}
}

function crushFive() {
	// Check rows
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns - 4; c++) {
			let candy1 = board[r][c];
			let candy2 = board[r][c + 1];
			let candy3 = board[r][c + 2];
			let candy4 = board[r][c + 3];
			let candy5 = board[r][c + 4];

			if (
				candy1.src == candy2.src &&
				candy2.src == candy3.src &&
				candy3.src == candy4.src &&
				candy4.src == candy5.src &&
				!candy1.src.includes("blank")
			) {
				candy1.src = "./images/blank.png";
				candy2.src = "./images/blank.png";
				candy3.src = "./images/blank.png";
				candy4.src = "./images/blank.png";
				candy5.src = "./images/blank.png";
				score += 120;
			}
		}
	}
	// Check columns
	for (let c = 0; c < columns; c++) {
		for (let r = 0; r < rows - 4; r++) {
			let candy1 = board[r][c];
			let candy2 = board[r + 1][c];
			let candy3 = board[r + 2][c];
			let candy4 = board[r + 3][c];
			let candy5 = board[r + 4][c];

			if (
				candy1.src == candy2.src &&
				candy2.src == candy3.src &&
				candy3.src == candy4.src &&
				candy4.src == candy5.src &&
				!candy1.src.includes("blank")
			) {
				candy1.src = "./images/blank.png";
				candy2.src = "./images/blank.png";
				candy3.src = "./images/blank.png";
				candy4.src = "./images/blank.png";
				candy5.src = "./images/blank.png";
				score += 120;
			}
		}
	}
}

function checkValid() {
	// Check rows
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns - 2; c++) {
			let candy1 = board[r][c];
			let candy2 = board[r][c + 1];
			let candy3 = board[r][c + 2];

			if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
				return true;
			}
		}
	}
	// Check columns
	for (let c = 0; c < columns; c++) {
		for (let r = 0; r < rows - 2; r++) {
			let candy1 = board[r][c];
			let candy2 = board[r + 1][c];
			let candy3 = board[r + 2][c];

			if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
				return true;
			}
		}
	}
	return false;
}

function slideCandy() {
	for (let c = 0; c < columns; c++) {
		let ind = rows - 1;
		for (let r = columns - 1; r >= 0; r--) {
			if (!board[r][c].src.includes("blank")) {
				board[ind][c].src = board[r][c].src;
				ind -= 1;
			}
		}
		for (let r = ind; r >= 0; r--) {
			board[r][c].src = "./images/blank.png";
		}
	}
}

function generateCandy() {
	for (let c = 0; c < columns; c++) {
		if (board[0][c].src.includes("blank")) {
			board[0][c].src = "./images/" + randomCandy() + ".png";
		}
	}
}

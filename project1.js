let boxes = document.querySelectorAll(".Box");
let ResetBtn = document.querySelector("#ResetButton");
let playerturn = true, gameturn = true;
let messagebox = document.querySelector(".MessageBox");
let btns = document.querySelectorAll(".btn");
let firstpage = document.querySelector(".FirstPage");
let secondpage = document.querySelector(".SecondPage");
let game = document.querySelector(".Game");
let message = document.querySelector(".message");
let newbtn = document.querySelectorAll(".newbtn");
let Result = document.querySelector(".Result");
const reset = () => {
    moves = 0;
    PrvIndex = null;
    j = null;
    Ready = 0;
    gameturn = !gameturn;
    playerturn = false;
}
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const showWinner = (player) => {
    game.classList.add("hide");
    if(btnindex) {
        if(player === "X") {
            message.innerText = `Player wins!`;
        }
        else message.innerText = `Computer wins!`;
    }
    else {
            message.innerText = (`Player   ${player} wins!`);
    }
    messagebox.classList.remove("hide");
}
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};
const AttakOrDefence = () => {
    let DefenceIndex = null;
    let count1 = 0, count2 = 0, k;
    for(let i = 0; i < 9; i++) {
        if(boxes[i].innerText === 'O') count1++;
        else if(boxes[i].innerText === 'X') count2++;
        else k = i;
        if((i + 1) % 3 === 0) {
            if(count1 === 2 && !count2) {
				ComputerMove(k);
				return 1;
			}
			else if(count2 === 2 && !count1) {
                DefenceIndex = k;
			}
            count1 = 0, count2 = 0;
        }
    }
    count1 = 0, count2 = 0;
    for(let i = 0; i < 7; i += 3) {
        if(boxes[i].innerText === 'O') count1++;
        else if(boxes[i].innerText === 'X') count2++;
        else k = i;
    }
    if(count1 === 2 && !count2) {
        ComputerMove(k);
        return 1;
    }
    else if(count2 === 2 && !count1) {
        DefenceIndex = k;
    }
    count1 = 0, count2 = 0;
    for(let i = 1; i < 9; i += 3) {
        if(boxes[i].innerText === 'O') count1++;
        else if(boxes[i].innerText === 'X') count2++;
        else k = i;
    }
    if(count1 === 2 && !count2) {
        ComputerMove(k);
        return 1;
    }
    else if(count2 === 2 && !count1) {
        DefenceIndex = k;
    }
    count1 = 0, count2 = 0;
    for(let i = 2; i < 9; i += 3) {
        if(boxes[i].innerText === 'O') count1++;
        else if(boxes[i].innerText === 'X') count2++;
        else k = i;
    }
    if(count1 === 2 && !count2) {
        ComputerMove(k);
        return 1;
    }
    else if(count2 === 2 && !count1) {
        DefenceIndex = k;

    }
    count1 = 0, count2 = 0;
    for(let i = 0; i < 9; i += 4) {
        if(boxes[i].innerText === 'O') count1++;
        else if(boxes[i].innerText === 'X') count2++;
        else k = i;
    }
    if(count1 === 2 && !count2) {
        ComputerMove(k);
        return 1;
    }
    else if(count2 === 2 && !count1) {
        DefenceIndex = k;
    }
    count1 = 0, count2 = 0;
    for(let i = 2; i < 7; i += 2) {
        if(boxes[i].innerText === 'O') count1++;
        else if(boxes[i].innerText === 'X') count2++;
        else k = i;
    }
    if(count1 === 2 && !count2) {
        ComputerMove(k);
        return 1;
    }
    else if(count2 === 2 && !count1) {
        DefenceIndex = k;
    }
    if(DefenceIndex != null) {
        ComputerMove(DefenceIndex);
        return 1;
    }
    return 0;
}
let FightForDraw = () => {
    while(moves < 9) {
        let status = AttakOrDefence();
        if(status === 1) return 1;
        for (let i = 0; i < 9; i++) {
            if (boxes[i].innerText === "") {
                ComputerMove(i);
                return 1;
            }
        }
    }
}
const ComputerMove = (index) => {
    boxes[index].innerText = "O";
    boxes[index].diseabled = true;
    moves++;
}
const Starter1 = (index, PrvIndex) => {
    if(index === 4) {
        ComputerMove(0);
    }
    else if(PrvIndex === 4 && index === 8) {
        ComputerMove(2);
    }
    else if (PrvIndex === null && index != 4) {
        ComputerMove(4);
    }
    else if(PrvIndex === 2 && index === 6 && moves === 3 || PrvIndex === 6 && index === 2 && moves === 3) {
        ComputerMove(1);
    }
    else if(PrvIndex === 5 && index === 7 && moves === 3 || PrvIndex === 2 && index === 7 && moves === 3 || PrvIndex === 7 && index === 2 && moves === 3 || PrvIndex === 7 && index === 5 && moves === 3 || PrvIndex === 6 && index === 5 && moves === 3 || PrvIndex === 5 && index === 6 && moves === 3) {
        ComputerMove(8);
    }
    else if(PrvIndex === 0 && index === 7 && moves === 3 || PrvIndex === 7 && index === 0 && moves === 3 || PrvIndex === 7 && index === 3 && moves === 3 || PrvIndex === 3 && index === 8  && moves === 3 || PrvIndex === 3 && index === 7 && moves === 3) {
        ComputerMove(6);
    }
    else if(PrvIndex === 1 && index === 5 && moves === 3 || PrvIndex === 1 && index === 8 && moves === 3 || PrvIndex === 5 && index === 0  && moves === 3 || PrvIndex === 5 && index === 1 && moves === 3 || PrvIndex === 0 && index === 5  && moves === 3) {
        ComputerMove(2);
    }
    else if(PrvIndex === 3 && index === 2 && moves === 3 || PrvIndex === 3 && index === 1 && moves === 3 || PrvIndex === 1 && index === 3 && moves === 3 || PrvIndex === 1 && index === 6 && moves === 3) {
        ComputerMove(0);
    }
    else FightForDraw();
}
const Starter2 = (index, PrvIndex) => {
    if(PrvIndex === null && index === 4) {
        Ready = 2;
    }
    if(Ready === 2) {
        FightForDraw();
    }
    else if(Ready === 1) {
        AttakOrDefence();
    }
    else if(PrvIndex === null) {
        if(index === 1){ 
            ComputerMove(3);
        }
        else if(index === 3) {
            ComputerMove(1);
        }
        else if(index === 2) {
            ComputerMove(6);
        }
        else if(index === 6) {
            ComputerMove(2);
        }
        else ComputerMove(6);
    }
    else if(PrvIndex === 1 && moves === 4 || PrvIndex === 3 && moves === 4) {
        if(!AttakOrDefence()) ComputerMove(4);
        Ready = 1;
    }
    else if(PrvIndex === 2 && moves === 4 || PrvIndex === 6 && moves === 4) {
        if(!AttakOrDefence()) ComputerMove(8);
        Ready = 1;
    }
    else {
        if(!AttakOrDefence()) ComputerMove(2);
        Ready = 1;
    }
}
const Enable = () => {
    for (let i = 0; i < 9; i++) {
        boxes[i].diseabled = false;
        boxes[i].innerText = "";
    }
}
let j = null;
let moves = 0;
let btnindex;
let Ready = 0;
let isWinner;
const InputTaker = () => {
    boxes.forEach((box, i) => {
        box.addEventListener("click", () => {
            if(!box.diseabled) {
                if(!playerturn) {
                    box.innerText = "X";
                    playerturn = !playerturn;
                    moves++;
                }
                else if(btnindex === 0) {
                    box.innerText = "O";
                    playerturn = !playerturn;
                    moves++;
                }
                box.diseabled = true;
                isWinner = checkWinner();
                if(btnindex === 1 && !isWinner) {
                    if(!gameturn) Starter1(i, j);
                    else Starter2(i, j);
                    playerturn = !playerturn;
                }
                isWinner = checkWinner();
                j = i;
                if (moves === 9 && !isWinner) {
                    game.classList.add("hide");
                    message.innerText = `It's a Draw`;
                    messagebox.classList.remove("hide");
                }
            }
        });
    });
    ResetBtn.addEventListener("click",() => {
        Enable();
        moves = 0;
        if(btnindex === 1 && gameturn) {
            ComputerMove(0);
        }
        PrvIndex = null;
        j = null;
        Ready = 0;
        playerturn = false;
    });
}
btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        btnindex = i;
        firstpage.classList.add("hide");
        if(!i) {
            message.innerText = "Player1 Starts";
        }
        else {
            message.innerText = "Player Starts";
        }
        secondpage.classList.remove("hide");
    });
});
newbtn.forEach((nbtn, k) => {
    nbtn.addEventListener("click", () => {
        reset();
        Enable();
        if(k === 1) {
            game.classList.remove("hide");
            messagebox.classList.add("hide");
            nbtn.innerText = "New Game";
            if(btnindex === 1 && gameturn) {
                ComputerMove(0);
            }
            InputTaker();
        }
        else {
            secondpage.classList.add("hide");
            firstpage.classList.remove("hide");
            newbtn[1].innerText = "Start Game";
        }
    });
});



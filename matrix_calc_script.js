// not the best organization, no framework, or libraries 

// save matrix input 

// class Matrix_Calc{
//   constructor(); 
// }

// SET NEW SIZE ON ONLY ONE DONT DELETE THE OTHER ************ **

/* 
 matrix a: m x n 
 matrix b: m x n 
*/ 
let matrix_a = []; 
let matrix_b = []; 
let am_input, an_input, bm_input, bn_input = 0; 
let a_visible, b, visible = false; 

// ------------------------- DEFAULT DISPLAY TWO 2X2 MATRICES-----------------------------
let matrix_grid_a = document.querySelector(".matrix-grid-a");
let matrix_grid_b = document.querySelector(".matrix-grid-b");

for(i=0; i<4; ++i){
  // create square matrix, adjust css var to create correct template rows/ cols
  let input = document.createElement("input"); 
  let input2 = document.createElement("input"); 
  input.type="number"; 
  input2.type="number"; 
  
  matrix_grid_a.appendChild(input);
  matrix_grid_b.appendChild(input2);
} 

document.documentElement.style.setProperty("--a-m", 2);
document.documentElement.style.setProperty("--a-n", 2);
document.documentElement.style.setProperty("--b-m", 2);
document.documentElement.style.setProperty("--b-n", 2);


matrix_grid_a.classList.add("template-grid-a", "template"); 
matrix_grid_b.classList.add("template-grid-b", "template"); 

// let root = document.documentElement; 
// root = document.querySelector("template-grid"); 

// function set_attr(element, attr){
//   for(var key in attr) {
//     element.setAttribute(key, attr[key]);
//   }
// }

a_visible = true, b_visible = true;  // 2x2 is displayed for both matrices 
am_input = 2, an_input = 2, bm_input = 2, bn_input = 2; 


// ------------------------- Get matrix size -----------------------------
const create_btn = document.querySelector("#create-btn"); 

create_btn.addEventListener("click", () => {
  // matrix a: m x n 
  // matrix b: m x n 
  am_input = parseInt(document.querySelector("#input-size-am").value);
  an_input = document.querySelector("#input-size-an").value;
  bm_input = document.querySelector("#input-size-bm").value;
  bn_input = document.querySelector("#input-size-bn").value;

  console.log(`MATRIX A: ${am_input} x ${an_input}\n MATRIX B: ${bm_input} x ${bn_input}`); 

  // each matrix, input none or m AND n for entry 
  if((am_input && !an_input) || (an_input && !am_input)) alert("missing matrix a dimension"); 
  else if((bm_input && !bn_input) || (bn_input && !bm_input)) alert("missing matrix b dimension"); 

  display_matrix(am_input, an_input, bm_input, bn_input); 
}); 

// -------------------------- Display correct matrix ---------------------------
function display_matrix(am_input, an_input, bm_input, bn_input){
  // display matrix a, b, or both 

  if((am_input || an_input)){
    // show matrix a 
    make_matrix(matrix_grid_a, am_input, an_input); 
    document.documentElement.style.setProperty("--a-m", am_input); // adjust css var to create correct template rows/ cols after func compelte / format grid 
    document.documentElement.style.setProperty("--a-n", an_input); 
  } 

  if((bm_input || bn_input)){
    // show matrix b 
    // let matrix_grid_b = document.querySelector(".matrix-grid-b");
    make_matrix(matrix_grid_b, bm_input, bn_input); 

    document.documentElement.style.setProperty("--b-m", bm_input);
    document.documentElement.style.setProperty("--b-n", bn_input);
  }


  // display brackets 
  // a 
  // let left_bracket = document.querySelector(".left-bracket");
  // let right_bracket = document.querySelector(".right-bracket");
  // document.documentElement.style.setProperty("--bracket-y-scale", size*2.4); // scale bracket height 
}

function make_matrix(matrix_grid, m, n){
  // didnt want to repeat code for matrix a m,n matrix b m, n 

  while(matrix_grid.hasChildNodes()){
    // remove old matrix, if present 
    matrix_grid.removeChild(matrix_grid.lastChild);
  }
  
  for(i=0; i<(m*n); ++i){
    // create square matrix, 
    let input = document.createElement("input"); 
    input.type="number"; 
    matrix_grid.appendChild(input);
  } 
}

// -------------------------- Clear Matrix (A or B) ---------------------------
const a_clear_button = document.querySelector("#matrix-a-clear-btn");  
const b_clear_button = document.querySelector("#matrix-b-clear-btn");  

a_clear_button.addEventListener("click", () => {
  // hide the solution box (if present), reset matrix inputs 

  hide_solution_box(); 

  const matrix_a = document.querySelector(".matrix-grid-a");
  matrix_a.reset(); 
});

b_clear_button.addEventListener("click", () => {
    // hide the solution box (if present), reset matrix inputs 

  hide_solution_box(); 

  const matrix_b = document.querySelector(".matrix-grid-b");
  matrix_b.reset(); 
});

function hide_solution_box(){
  // simply hide solution box 
  const solution_box = document.querySelector(".solution-container");
  solution_box.style.visibility = "hidden";
}



// -------------------------- Get User Input of Matrix (A, B, or both, call whenever) ---------------------------
function read_input(matrix_grid, m, n){
  // all different calculations will call this func to get data in 1d array. 

  let matrix_temp = []; 

  for(i=0; i<(m*n); ++i){
   // store input data, return matrix 
    matrix_temp.push(parseInt(matrix_grid.elements[i].value)); 
  }

  if(matrix_temp.includes(NaN)){
    // check missing element 
    // warning_msg("Missing an element"); 
    return; 
  }

  return matrix_temp; 
}

// -------------------------- Compute ---------------------------
const compute_btn = document.querySelector("#compute-btn");
const operator = document.querySelector("#matrix-operator"); 

compute_btn.addEventListener("click", () => {
  // read data, call appropriate func 

  // FIX both visible on default 
  if(a_visible) matrix_a = read_input(matrix_grid_a, am_input, an_input); 
  if(b_visible) matrix_b = read_input(matrix_grid_b, bm_input, bn_input); 

  if(matrix_a == undefined && matrix_b == undefined) {
    warning_msg("BOTH MATRICES ARE EMPTY!"); 
    return; 
  }


  console.log(matrix_a); 
  console.log(matrix_b); 


  switch(operator.value){
    case "*":
      mul_matrix(matrix_a,matrix_b);
      break; 
    case "+":
      // add_matrix(a,b);
      break; 
    case "-":
      // sub_matrix(a,b);
      break; 

    // no defulat required, "*" first selected option 
  }

});


// -------------------------- Matrix A + B ---------------------------
function add_matrix(matrix_a, matrix_b){
// SAME SIZE 
}

// -------------------------- Matrix A - B ---------------------------
function subtract_matrix(matrix_a, matrix_b){
// SAME SIZE 

}

// -------------------------- Matrix A * B ---------------------------
function mul_matrix(matrix_a, matrix_b){
  // # cols first == # row second 

  // am_input, an_input ... 

  if(an_input != bn_input) {}



}

// -------------------------- Calculate Inverse of Matrix (A or B) ---------------------------
// needs to be square 
const inverse_butn = document.querySelector("#matrix-a-inverse-btn");

// -------------------------- Calculate Det of Matrix (A or B) ---------------------------
const det_a_button = document.querySelector("#matrix-a-det-btn");

det_a_button.addEventListener("click", () => {
  // use matrix_a to store arr 

  matrix_a = read_input(); 
});

// -------------------------- Transpose Matrix (A or B) ---------------------------

// -------------------------- Matrix raised power ---------------------------
// MAEK SURE NOT NEG 


// -------------------------- Display result ---------------------------



// -------------------------- Arrow Keys nav size input ---------------------------
// -------------------------- Arrow Keys Nav Matrix A ---------------------------
// -------------------------- Arrow Keys Nav Matrix B ---------------------------


// -------------------------- Print Err ---------------------------

// FORMAT BETTER FIX FIX FIX 

function warning_msg(message){
  // present "pop-up" w/ warning msg 

  const overlay = document.querySelector("#overlay-background"); 
  overlay.classList.toggle("active"); 

  const warning_box = document.querySelector(".warning-box");
  warning_box.classList.toggle("active"); 
  
  const warning_msg = document.querySelector("#warning-msg");
  warning_msg.innerHTML = message; 
}

const close_btn = document.querySelector("#close-btn"); 

close_btn.addEventListener("click", () => {
  // warning message presented, close box

  const warning_box = document.querySelector(".warning-box");
  warning_box.classList.toggle("active"); 

  const overlay = document.querySelector("#overlay-background"); 
  overlay.classList.toggle("active"); 

}); 

// MOVE to function, dont repeat 
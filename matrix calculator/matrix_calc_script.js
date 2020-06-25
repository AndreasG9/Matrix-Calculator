// not the best organization, no framework, or libraries 

// save matrix input 


/* 
 matrix a: m x n 
 matrix b: m x n 
*/ 
let matrix_a = []; 
let matrix_b = []; 
let am_input, an_input, bm_input, bn_input = 0; 
let a_visible, b, visible = false; 

const DEFAULT_M = 2; 
const DEFAULT_N = 2; 

// MODULARIZE / format better TODO 
function init_default(){
  // default display two 2x2 matrices 
}


init_default(); 

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
// let buttons = document.querySelector("btns"); 


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

document.documentElement.style.setProperty("--a-m", DEFAULT_M);
document.documentElement.style.setProperty("--a-n", DEFAULT_N);
document.documentElement.style.setProperty("--b-m", DEFAULT_M);
document.documentElement.style.setProperty("--b-n", DEFAULT_N);

matrix_grid_a.classList.add("template-grid-a", "template"); 
matrix_grid_b.classList.add("template-grid-b", "template"); 

a_visible = true, b_visible = true;  // 2x2 is displayed for both matrices 
am_input = 2, an_input = 2, bm_input = 2, bn_input = 2; 



// ------------------------- Get matrix size -----------------------------
document.querySelector("#create-btn").addEventListener("click", () => {
  // matrix a: m x n 
  // matrix b: m x n 
  am_input = parseInt(document.querySelector("#input-size-am").value);
  an_input = parseInt(document.querySelector("#input-size-an").value);
  bm_input = parseInt(document.querySelector("#input-size-bm").value);
  bn_input = parseInt(document.querySelector("#input-size-bn").value);

  // each matrix, input none or m AND n for entry, if none defualts to 2x2 matrix 
  // if(!(am_input || an_input || bm_input || bn_input)){}
  // if((am_input && !an_input) || (an_input && !am_input)) warning_msg("missing <i><u>matrix A</u></i> dimension");
  // else if((bm_input && !bn_input) || (bn_input && !bm_input)) warning_msg("missing <i><u>matrix B</u></i> dimension");
  // else if(!(am_input && bm_input && an_input && bn_input)) warning_msg("default: matrix A: 2x2 <br> matrix B: 2x2"); 

  let msg = "";

  if((am_input && !an_input) || (an_input && !am_input)) msg += "<i><u>matrix A</u></i>";
  if((bm_input && !bn_input) || (bn_input && !bm_input)) msg += "<i><u>matrix B</u></i>";

  if(msg.length > 1) {
    // each matrix, input none or m AND n for entry, if none defualts to 2x2 matrix 
    warning_msg("Missing dimension in matrix: " + msg); 
    event.preventDefault();
    return; 
  }

  else{
    // display new matrix, or keep default 

    if((isNaN(am_input) && isNaN(an_input) && isNaN(bm_input) && isNaN(bn_input))){
      // all inputs empty, keep default 
      warning_msg("default: matrix A: 2x2 <br> matrix B: 2x2"); 
      event.preventDefault();
      return; 
    }  

    // create only a single new matrix, the other default 
    if((isNaN(am_input) && isNaN(an_input))) am_input = 2, an_input = 2; 
    else if((isNaN(bm_input) && isNaN(bn_input))) bm_input = 2, bn_input = 2; 

    display_matrix(am_input, an_input, bm_input, bn_input); 
    console.log(`MATRIX A: ${am_input} x ${an_input}\n MATRIX B: ${bm_input} x ${bn_input}`); 
  }

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

  else make_matrix(matrix_grid_a, DEFAULT_M, DEFAULT_N); // keep default 2x2 


  if((bm_input || bn_input)){
    // show matrix b 
    make_matrix(matrix_grid_b, bm_input, bn_input); 
    document.documentElement.style.setProperty("--b-m", bm_input);
    document.documentElement.style.setProperty("--b-n", bn_input);
  }

  else make_matrix(matrix_grid_a, DEFAULT_M, DEFAULT_N);


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
// const a_clear_button = document.querySelector("#matrix-a-clear-btn");  
// const b_clear_button = document.querySelector("#matrix-b-clear-btn");  

document.querySelector("#matrix-a-clear-btn").addEventListener("click", () => {
  // hide the solution box (if present), reset matrix inputs 

  hide_solution_box(); 

  const matrix_a = document.querySelector(".matrix-grid-a");
  matrix_a.reset(); 
});

document.querySelector("#matrix-b-clear-btn").addEventListener("click", () => {
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

  return matrix_temp; 
}

// ------------------------- SWAP -----------------------------
document.querySelector("#swap-btn").addEventListener("click", () => {
  // matrix A <=> matrix B  

  if(a_visible) matrix_a = read_input(matrix_grid_a, am_input, an_input); 
  if(b_visible) matrix_b = read_input(matrix_grid_b, bm_input, bn_input); 

  const err = missing_element(matrix_a, matrix_b); 
  if(err) return; 


  // ... 

}); 



// -------------------------- Compute ---------------------------
document.querySelector("#compute-btn").addEventListener("click", () => {
  // read data, call appropriate func 

  if(a_visible) matrix_a = read_input(matrix_grid_a, am_input, an_input); 
  if(b_visible) matrix_b = read_input(matrix_grid_b, bm_input, bn_input); 

  let err = missing_element(matrix_a, matrix_b); 
  if(err) return; 

  const operator = document.querySelector("#matrix-operator");  

  // convert 1d to 2d array 
  let matrix_a_2d = make_2d(matrix_a, am_input, an_input);
  let matrix_b_2d = make_2d(matrix_b, bm_input, bn_input); 

  console.log(matrix_a_2d);
  console.log(matrix_b_2d); 

  switch(operator.value){
    case "*":
      err = mul_matrix(matrix_a_2d,matrix_b_2d, am_input, an_input, bm_input, bn_input);
      break; 
    case "+":
      // add_matrix(a,b);
      break; 
    case "-":
      // sub_matrix(a,b);
      break; 

    // no defulat required, "*" first selected option 
  }

  if(err) return; 

  // display result 

});


// -------------------------- Matrix A + B ---------------------------
function add_matrix(matrix_a, matrix_b){
  // same size 


}

// -------------------------- Matrix A - B ---------------------------
function subtract_matrix(matrix_a, matrix_b){
  // same size  

}

// -------------------------- Matrix A * B ---------------------------
function mul_matrix(matrix_a_2d, matrix_b_2d, am, an, bm, bn){
  // # cols first == # row second  

  if(an != bm) {
    warning_msg("#cols matrix A <em>MUST EQUAL</em> #rows matrix B"); 
    return true; 
  }

  let product = []; 

  // init 2d array, size will be am x bn 
  for(let i=0; i<am; ++i){
    for(let j=0; j<bn; ++j){
      product[i] = []; 
    }
  }

  for(let i=0; i<am; ++i){
    // 1-n row matrix a 
    for(let j=0; j<bn; ++j){
      // 1-n col matrix b 
      
      for(let k=0; k<an; ++k){
        // result, each element in matrix a row * each element in matrix b col 
        // add result, increment k when row/ col is used 
       // product[i][j] += matrix_a_2d[i][k] * matrix_b_2d[k][j]; 
       console.log(product[i][j]); 
      }
    }
  }

  
  


  return false; 
}

// -------------------------- 1D to 2D array ---------------------------
function make_2d(matrix, m, n){
  let temp = [...matrix]; 
  let two_d = []; 

  if(m == n){
    // square matrix 
    while(temp.length) two_d.push(temp.splice(0, m)); 
  }

  else{
    for(let i=0; i<temp.length; i += n){
      // increment by size of column
      // ex. 3x2 [[0,2],[2,4],[4,6]] ... 
      two_d.push(temp.slice(i, n + i)); 
    }
  }

  return two_d; 
}

// -------------------------- Calculate Inverse of Matrix (A or B) ---------------------------
// needs to be square 
const inverse_butn = document.querySelector("#matrix-a-inverse-btn");

// -------------------------- Calculate Det of Matrix (A or B) ---------------------------
document.querySelector("#matrix-a-det-btn").addEventListener("click", () => {
  // needs to be sqaure 



  
});

// -------------------------- Transpose Matrix (A or B) ---------------------------

// -------------------------- Matrix raised power ---------------------------
// MAEK SURE NOT NEG 


// -------------------------- Display result ---------------------------



// -------------------------- Arrow Keys nav size input ---------------------------
// -------------------------- Arrow Keys Nav Matrix A ---------------------------
// -------------------------- Arrow Keys Nav Matrix B ---------------------------

// -------------------------- Small Err Check ---------------------------
function missing_element(matrix_a, matrix_b){
  // non-specific, if at least one element is missing, modal waring will sho wup 

  let msg = ""; 
  // || matrix_a.length == 0)
  if(matrix_a.includes(NaN) || matrix_a.length == 0) msg += " A "; 

  if(matrix_b.includes(NaN) || matrix_b.length == 0) msg += " B "; 

  if(msg.length > 1) {
    // present warning 
    warning_msg(`Missing one or more elements in matrix: ${msg}`); 
    return true; 
  }

  return false; 
}

// -------------------------- Print Err ---------------------------
function warning_msg(message){
  // present "pop-up" (toggle box and overlay) w/ warning msg 

  const overlay = document.querySelector("#overlay-background"); 
  overlay.classList.toggle("active"); 

  const warning_box = document.querySelector(".warning-box");
  warning_box.classList.toggle("active"); 

  const warning_msg = document.querySelector("#warning-msg");
  warning_msg.innerHTML = message; 
}

document.querySelector("#close-btn").addEventListener("click", () => {
  // warning message presented, close box when "ok" button clicked 

  const warning_box = document.querySelector(".warning-box");
  warning_box.classList.toggle("active"); 

  const overlay = document.querySelector("#overlay-background"); 
  overlay.classList.toggle("active"); 
}); 

// MOVE to function, dont repeat 


// let root = document.documentElement; 
// root = document.querySelector("template-grid"); 

// function set_attr(element, attr){
//   for(var key in attr) {
//     element.setAttribute(key, attr[key]);
//   }
// }



// matrix_grid_values.addEventListener('keydown', input => {
//   // input type is number, disable up/down arrow adjusting value 
//   if (input.which == 38 || input.which == 40)
//       input.preventDefault();
// }


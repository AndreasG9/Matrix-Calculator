// Andreas Gagas - Matrix-Calculator 



// quickly change default size (default matrix SQUARED)
const DEFAULT_M = 2; 
const DEFAULT_N = 2; 
const SQUARE_MAX = 36; 
const POWER_MAX = 20; 

let matrix_a = []; 
let matrix_b = []; 
let am_input, an_input, bm_input, bn_input = 0; 
let a_visible, b_visible = false; 


// MODULARIZE / format better TODO 
function init_default(){
  // default display two 2x2 matrices 
  // add templates to class list
}


init_default(); 

// testing
matrix_a = [[2,2], [2,2]];
matrix_b = [[2,2], [2,2]];
mul_matrix(matrix_a, matrix_b, 2, 2, 2, 2); 


// ------------------------- DEFAULT DISPLAY TWO 2X2 MATRICES-----------------------------
let matrix_grid_a = document.querySelector(".matrix-grid-a");
let matrix_grid_b = document.querySelector(".matrix-grid-b");

for(i=0; i<(DEFAULT_M * DEFAULT_N); ++i){
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
  let msg = "";

  if((am_input && !an_input) || (an_input && !am_input)) msg += "<i><u>matrix A</u></i>";
  if((bm_input && !bn_input) || (bn_input && !bm_input)) msg += "<i><u>matrix B</u></i>";

  if(msg.length > 1) {
    // each matrix, input none or m AND n for entry, if none defualts to 2x2 matrix 
    warning_msg("Missing dimension in matrix: " + msg); 
    event.preventDefault();
    return; 
  }

  if((isNaN(am_input) && isNaN(an_input) && isNaN(bm_input) && isNaN(bn_input))){
    // all inputs EMPTY, keep default 
    warning_msg("default: matrix A: 2x2 <br> matrix B: 2x2"); 
    event.preventDefault();
    return; 
  }  

  msg = "";
  
  if((am_input > 50) || (an_input > 100)) msg += "<i><u> A </u></i>";
  if((bm_input > 50) || (bn_input > 100)) msg += "<i><u> B </u></i>";

  if(msg.length > 1) {
    // random limit 
    // a 50x100 will take a few seconds to create ... 
    warning_msg(`Matrix: ${msg} is TOO LARGE ... <br> m < 50 && n < 100`); 
    event.preventDefault();
    return; 
  }

  if((am_input < 1) || (an_input < 1) || ((bm_input < 1) || (bn_input < 1))){
      // no 0 or neg. inputs
      warning_msg(`NO <u>NEGATIVE</u> INPUTS`); 
      event.preventDefault();
      return; 
  }
  

  // SUCCESS 

  // create only a single NEW matrix, the other default 
  if((isNaN(am_input) && isNaN(an_input))) am_input = 2, an_input = 2; 
  if((isNaN(bm_input) && isNaN(bn_input))) bm_input = 2, bn_input = 2; 

  // create two matrices to display 
  display_matrix(am_input, an_input, bm_input, bn_input); 

  // console.log(`MATRIX A: ${am_input} x ${an_input}\n MATRIX B: ${bm_input} x ${bn_input}`); 
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
  // remove old matrix, add (m*n) inputs whose will be formatted later 

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
document.querySelector("#matrix-a-clear-btn").addEventListener("click", () => {
  // hide the solution box (if present), reset matrix inputs 

  document.querySelector(".matrix-grid-a").reset(); 
  document.querySelector(".solution-container").style.transform = "scale(0)"; 
});

document.querySelector("#matrix-b-clear-btn").addEventListener("click", () => {
    // hide the solution box (if present), reset matrix inputs 

  document.querySelector(".matrix-grid-b").reset(); 
  document.querySelector(".solution-container").style.transform = "scale(0)"; 
});

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
  
  // TODO 
}); 



// -------------------------- Compute Binary Operation ---------------------------
document.querySelector("#compute-btn").addEventListener("click", () => {
  // binary operation, read data, call appropriate func 

  if(a_visible) matrix_a = read_input(matrix_grid_a, am_input, an_input); 
  if(b_visible) matrix_b = read_input(matrix_grid_b, bm_input, bn_input); 

  let err = missing_element(matrix_a, matrix_b); // one or more inputs are missing 
  if(err) return; 

  const operator = document.querySelector("#matrix-operator");  
  console.log(`OPERATOR: ${operator.value}`); 

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
      err = add_matrix(matrix_a_2d, matrix_b_2d, am_input, an_input, bm_input, bn_input);
      break; 
    case "-":
      err = subtract_matrix(matrix_a_2d, matrix_b_2d, am_input, an_input, bm_input, bn_input);
      break; 

    default:
      break; 
  }

  if(err) return; 
});

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

// -------------------------- Matrix A + B ---------------------------
function add_matrix(matrix_a_2d, matrix_b_2d, am, an, bm, bn){
  // both matrices must be same size 

  if(same_size(am, an, bm, bn)) return 1; // err 

  // "init" 2d arr 
  let sum = new Array(am).fill(0).map(() => new Array(bn).fill(0)); 

  for(let i=0; i<am; ++i){
    for(let j=0; j<bn; ++j){
      // row w/ bn # elements  
      // match index in matrix_a w/ matrix_b and add result to matching index in result matrix 
      sum[i][j] = matrix_a_2d[i][j] + matrix_b_2d[i][j]; 
    }
  }

  display_result_binary(sum, matrix_a_2d, matrix_b_2d, am, an, bm, bn, "+"); 

  return 0; // success 
}

// -------------------------- Matrix A - B ---------------------------
function subtract_matrix(matrix_a_2d, matrix_b_2d, am, an, bm, bn){
  // both matrices must be same size, similar calculation to adding two matrices (match index/ position and subtract, place same
  // position in result matrix)

  if(same_size(am, an, bm, bn)) return 1; // err 

  // init 2d arr 
  let diff = new Array(am).fill(0).map(() => new Array(bn).fill(0)); 

  for(let i=0; i<am; ++i){
    for(let j=0; j<bn; ++j){
      diff[i][j] = matrix_a_2d[i][j] - matrix_b_2d[i][j]; 
    }
  }

  display_result_binary(diff, matrix_a_2d, matrix_b_2d, am, an, bm, bn, "-"); 

  return 0; // success 
}

// -------------------------- Matrix A * B ---------------------------
function mul_matrix(matrix_a_2d, matrix_b_2d, am, an, bm, bn){
  // # cols first == # row second  

  if(an != bm) {
    warning_msg("#cols matrix A <em>MUST EQUAL</em> #rows matrix B"); 
    return 1; 
  }

  // "init" 2d array to store product, size will be am x bn 
  let product = new Array(am).fill(0).map(() => new Array(bn).fill(0)); 

  for(let i=0; i<am; ++i){
    // 1-n row matrix a 
    for(let j=0; j<bn; ++j){
      // 1-n col matrix b 
      for(let k=0; k<an; ++k){
        // result, each element in matrix a row * each element in matrix b col 
        // add result, increment k when row/ col is used 
        product[i][j] += matrix_a_2d[i][k] * matrix_b_2d[k][j]; 
      }
      // console.log(product[i][j]); // NEW ELEMENT ADDED IN RESULT MATRIX 
    }
  }

  display_result_binary(product, matrix_a_2d, matrix_b_2d, am, an, bm, bn, "*"); 

  return 0; // success 
}


// -------------------------- Compute Unary Operation ---------------------------

// -------------------------- Matrix raised power ---------------------------
document.querySelector("#matrix-a-raised-btn").addEventListener("click", () => {

  const power = document.querySelector("#matrix-a-raised-power").value; 

  if(power.length == 0){
    warning_msg("Missing power for Matrix A"); 
    event.preventDefault();
    return; 
  }

  calc_matrix_power("A", matrix_grid_a, am_input, an_input, power); 
}); 

document.querySelector("#matrix-b-raised-btn").addEventListener("click", () => {

  const power = document.querySelector("#matrix-b-raised-power").value; 

  if(power.length == 0){
    warning_msg("Missing power for Matrix B"); 
    event.preventDefault();
    return; 
  }

  calc_matrix_power("B", matrix_grid_b, bm_input, bn_input, power); 
}); 

function calc_matrix_power(char, matrix_grid, m, n, power){
  // matrix raised positive value:  must be square 
  // matrix raised neg value: square, det != 0 (matrix must NOT be singular)
  // matrix raised to 0 is equal to identity matrix of that square matrix 

  let matrix = read_input(matrix_grid, m, n); 
  if(missing_element_single_matrix(matrix)) return; // err, missing element

  if(power > POWER_MAX){
    warning_msg(`Exceed POWER_MAX: ${POWER_MAX}`); 
    return; 
  }

  let matrix_2d = make_2d(matrix, m, n); 

  if(m != n) return; // err, not square 

  let result = new Array(m).fill(0).map(() => new Array(n).fill(0)); 

  if(power > 0){
    // positive power 
    result = [...matrix_2d]; // init, match original matrix 

    for(let i=1; i<power; ++i){
      // mul original matrix * result matrix power amount of times 
      result = multiply_square_matrix(matrix_2d, result, m, n); 
    }
  }

  else if(power == 0){
    // A^0 || B^0 = identity matrix of same square size 

    for(let i=0; i<m; ++i){
      for(let j=0; j<n; ++j){
        // when row == col, place 1 (ex index 00, or 22 ...)
        // if not, place 0 (ex index 01, or 40 ... )
        if(i == j) result[i][j] = 1;
        else result[i][j] = 0;  
      }
    }
  }

  else{
    // inverse or neg. pow

    // TODO: det != 0 

    
  }


  
  display_result_unary(char, result, matrix_2d, m, n, power); 
}

function multiply_square_matrix(matrix_a_2d, matrix_b_2d, m, n){
  // similar to mul matrix, less params, will be called power amount of times 

  let product = new Array(m).fill(0).map(() => new Array(n).fill(0)); 

  for(let i=0; i<m; ++i){
    // 1-n row matrix a 
    for(let j=0; j<n; ++j){
      // 1-n col matrix b 
      for(let k=0; k<n; ++k){
        // result, each element in matrix a row * each element in matrix b col 
        // add result, increment k when row/ col is used 
        product[i][j] += matrix_a_2d[i][k] * matrix_b_2d[k][j]; 
      }
      // console.log(product[i][j]); // NEW ELEMENT ADDED IN RESULT MATRIX 
    }
  }

  return product;
}


// -------------------------- Calculate Inverse of Matrix (A or B) ---------------------------
document.querySelector("#matrix-a-inverse-btn").addEventListener("click", () => {
  // make sure matrix is square and det != 0 (must be singular), call helper func. 

  // if(is_square(am_input, an_input)) return; // err, not square 
  // if(max_square(am_input, an_input)) return; // exceed limit 
  // // TODO: det != 0 
  // compute_unary(matrix_grid_a, am_input, an_input, "inverse"); 

  calc_matrix_power("A", matrix_grid_a, am_input, an_input, -1);

}); 

document.querySelector("#matrix-b-inverse-btn").addEventListener("click", () => {
  
});


// -------------------------- Calculate Det of Matrix (A or B) ---------------------------
document.querySelector("#matrix-a-det-btn").addEventListener("click", () => { 
  calc_det(matrix_grid_a, am_input, an_input); 
});

function calc_det(matrix, m, n){
  // needs to be square 
  if(m != n){
    warning_msg("Not a SQUARE matrix");
    return; 
  }

  if((m*n) > SQUARE_MAX){
    warning_msg(`No larger than a ${SQUARE_MAX} x ${SQUARE_MAX}`);
    return; 
  }

  // cofactor method ... 
}


// -------------------------- Transpose Matrix (A or B) ---------------------------
document.querySelector("#matrix-a-transpose-btn").addEventListener("click", () => {
  transpose("A", matrix_grid_a, am_input, an_input); 
});

document.querySelector("#matrix-b-transpose-btn").addEventListener("click", () => {
  transpose("B", matrix_grid_b, bm_input, bn_input);
}); 

function transpose(char, matrix_grid, m, n){
  // swap rows with cols, not limited to a square matrix 

  let matrix = read_input(matrix_grid, m, n); 
  if(missing_element_single_matrix(matrix)) return; // err, missing element

  let matrix_2d = make_2d(matrix, m, n); 

  let transpose = new Array(n).fill(0).map(() => new Array(m).fill(0)); // 2x3 transpose will be 3x2 ... 

  for(let i=0; i<n; ++i){
    for(let j=0; j<m; ++j){
      transpose[i][j] = matrix_2d[j][i];  
    }
  }

  console.log(transpose); 
  display_result_unary(char, transpose, matrix_2d, m, n, "T"); 
}

// -------------------------- Display result from binary op ---------------------------
function display_result_binary(result, matrix_a, matrix_b, am, an, bm, bn, operator){
  // display both matrices with result (insert matrix as table)

  console.log(result); 

  const solution_box = document.querySelector(".solution-container"); 
  solution_box.style.transform ="scale(1)"; 

  // 4 divs, 1: matrix a, 2: operator, 3: matrix b, 4: = 5: result
  const wrapper = document.querySelector(".result-wrapper"); 
  const divs = document.querySelectorAll(".result-wrapper > div"); // return object containing those 4 divs 
  
  reset_result(divs); // clear old result, if present 
  
  // display matrix a
  make_table(divs[0], matrix_a, am, an); 
  // brackets(divs[0]); 

  // display operator
  divs[1].innerHTML = operator; 

  // display matrix b 
  make_table(divs[2], matrix_b, bm, bn); 

  // display =
  divs[3].innerHTML = "="; 

  // display result 
  make_table(divs[4], result, am, bn); 


  // show solution

}

// -------------------------- Display result from unary op ---------------------------
function display_result_unary(char, result, matrix, m, n, option){
  // option is either the power or T for tranpose operation 
  // A^option // B^option (matrix)^option = (result)

  console.log(result); 

  const solution_box = document.querySelector(".solution-container"); 
  solution_box.style.transform ="scale(1)"; 

  // 4 divs, 1: matrix a/b^power, 2: matrix-table, 3: =, 4: result
  const wrapper = document.querySelector(".result-wrapper"); 
  const divs = document.querySelectorAll(".result-wrapper > div"); // return object containing those 4 divs 
  
  reset_result(divs); // clear old result, if present 

  let super_script = document.createElement("sup"); 
  super_script.innerHTML = option; 

  // display operation
  divs[0].innerHTML = `&nbsp;${char}<sup>${option}</sup>&nbsp;&nbsp;&#x2192;`; 

  // display matrix/table w/ sup
  make_table(divs[1], matrix, m, n);
  divs[1].appendChild(super_script);
  divs[1].style.display = "flex";

  // display = 
  divs[2].innerHTML = "="; 

  // display result 
  if(option === "T"){
    // rows and col swapped, swap m and n as result is 
    // already in that form 
    temp = m; 
    m = n; 
    n = temp; 
  }
  make_table(divs[3], result, m, n); 
}


function brackets(target){
  // for result box 

  // left bracket
  // let left_bracket = document.createElement("span");
  // left_bracket.innerHTML = "["; 


  // target.parentNode.insertBefore(left_bracket, target); 


}

function make_table(target, matrix, m, n){
  // target is location to put the matrix
  // table will match the result matrix, add each element in appropriate index 


  let table = document.createElement("table"); 
  table.classList.add("matrix-table"); 
  target.appendChild(table); 

  // let left_bracket = document.createElement("span");
  // left_bracket.innerHTML = "["; 
  // table.parentNode.insertBefore(left_bracket, table); 

  // table.classList.add("testing"); 

  for(let i=0; i<m; ++i){
    let table_row = document.createElement("tr"); 
    table.appendChild(table_row); 

    for(let j=0; j<n; ++j){
      let table_data = document.createElement("td");

      table_data.innerHTML = matrix[i][j]; 
      table_row.appendChild(table_data); 
    }
  }

   
}

function brackets(target){

}

function reset_result(divs){
  // clear previous unary or binary operation with single/ both matrices 

  for(let i=0; i<divs.length; ++i){
    divs[i].innerHTML = "";  
  }
}

// -------------------------- Small Err Check ---------------------------
function same_size(am, an, bm, bn){
  // check, if both matrices must be equal 

  if((am != bm) || (an != bn)){
    warning_msg("Both matrices must be equal"); 
    return 1;
  } 

  return 0; // same size 
}

function is_square(m,n){
  if(m != n) return 1; // err 

  return 0; 
} 

function max_square(m,n){
  if((m*n) > SQUARE_MAX){
    warning_msg(`No larger than a ${SQUARE_MAX} x ${SQUARE_MAX}`);
     return 1; 
  }

  return 0; 
}

// -------------------------- Small Err Check ---------------------------
function missing_element(matrix_a, matrix_b){
  // non-specific, if at least one element is missing, modal waring will sho wup 

  let msg = ""; 
  if(matrix_a.includes(NaN) || matrix_a.length == 0) msg += " A "; 

  if(matrix_b.includes(NaN) || matrix_b.length == 0) msg += " B "; 

  if(msg.length > 1) {
    // present warning 
    warning_msg(`Missing one or more elements in matrix: ${msg}`); 
    return 1; 
  }

  return 0; // success
}

function missing_element_single_matrix(matrix){
  
  if(matrix.includes(NaN) || matrix.length == 0){
    warning_msg("Missing one or more elements"); 
    return 1; 
  }

  return 0; // success
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


// -------------------------- Arrow Keys nav size input ---------------------------
// -------------------------- Arrow Keys Nav Matrix A ---------------------------
// -------------------------- Arrow Keys Nav Matrix B ---------------------------
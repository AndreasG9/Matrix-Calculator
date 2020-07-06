// Andreas Gagas - Matrix-Calculator 

// quickly change default size (default matrix SQUARED)
const DEFAULT_M = 2; 
const DEFAULT_N = 2; 
const SQUARE_MAX = 36; 
const POWER_MAX = 20; 

// let matrix_grid_a = null, matrix_grid_b = null; 
// let matrix_a = []; 
// let matrix_b = []; 
let matrix_grid_a = null, matrix_grid_b = null; 
let am_input, an_input, bm_input, bn_input = 0; 

// used for "put in A/B"
let matrix_result = []; 
let result_m = 0, result_n = 0; 

// every other variable is kept inside its function (aside from two on bottom for movement w/ arrow keys)


init_default(); 

// ------------------------- DEFAULT DISPLAY TWO 2X2 MATRICES-----------------------------
function init_default(){
  matrix_grid_a = document.querySelector(".matrix-grid-a");
  matrix_grid_b = document.querySelector(".matrix-grid-b");

  for(i=0; i<(DEFAULT_M * DEFAULT_N); ++i){
    // create square matrix, adjust css var to create correct template rows/ cols
    let input = document.createElement("input"); 
    let input2 = document.createElement("input"); 
    input.classList.add("move");
    input2.classList.add("move");
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
  am_input = 2, an_input = 2, bm_input = 2, bn_input = 2; 

  init_move(); // traverse default matrix with arrow keys 
}

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
  
  if((am_input > 25) || (an_input > 25)) msg += "<i><u> A </u></i>";
  if((bm_input > 25) || (bn_input > 25)) msg += "<i><u> B </u></i>";

  if(msg.length > 1) {
    // random limit 
    // a 50x100 will take a few seconds to create ... 
    warning_msg(`Matrix: ${msg} is TOO LARGE ... <br> m <= 25 && n <= 25`); 
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

}

function make_matrix(matrix_grid, m, n){
  // remove old matrix, add (m*n) inputs whose will be formatted later 

  while(matrix_grid.hasChildNodes()){
    // remove old matrix, if present 
    matrix_grid.removeChild(matrix_grid.lastChild);
  }
  
  for(i=0; i<(m*n); ++i){
    // create inputs for matrix, will set properties for css after 
    let input = document.createElement("input"); 
    input.type="number"; 
    input.classList.add("move", "swap"); 
    matrix_grid.appendChild(input);
  } 

  init_move(); // L and R arrow keys to move 
}

// -------------------------- Clear Matrix (A or B) ---------------------------
document.querySelector("#matrix-a-clear-btn").addEventListener("click", () => {
  // reset matrix inputs and n power input if present 

  document.querySelector(".matrix-grid-a").reset(); 
  document.querySelector("#matrix-a-raised-power").value = "";
});

document.querySelector("#matrix-b-clear-btn").addEventListener("click", () => {

  document.querySelector(".matrix-grid-b").reset(); 
  document.querySelector("#matrix-b-raised-power").value = "";
});

// -------------------------- Get User Input of Matrix (A, B, or both, call whenever) ---------------------------
function read_input(matrix_grid, m, n){
  // all different calculations will call this func to get data in 1d array. 
  
  let matrix_temp = []; 

  for(i=0; i<(m*n); ++i){
   // store input data, return matrix 
    matrix_temp.push(parseFloat(matrix_grid.elements[i].value)); 
  }

  return matrix_temp; 
}



// -------------------------- Compute Binary Operation ---------------------------
document.querySelector("#compute-btn").addEventListener("click", () => {
  // binary operation, read data, call appropriate func 

  matrix_a = read_input(matrix_grid_a, am_input, an_input); 
  matrix_b = read_input(matrix_grid_b, bm_input, bn_input); 

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

// -------------------------- Calculate Inverse of Matrix (A or B) ---------------------------
document.querySelector("#matrix-a-inverse-btn").addEventListener("click", () => {  
  calc_matrix_power("A", matrix_grid_a, am_input, an_input, -1);
}); 

document.querySelector("#matrix-b-inverse-btn").addEventListener("click", () => {
  calc_matrix_power("B", matrix_grid_b, bm_input, bn_input, -1);
});

function calc_matrix_power(char, matrix_grid, m, n, power){
  // matrix raised positive value:  must be square 
  // matrix raised neg value: square, det != 0 (matrix must NOT be singular)
  // matrix raised to 0 is equal to identity matrix of that square matrix 

  let matrix = read_input(matrix_grid, m, n); 
  if(missing_element_single_matrix(matrix)) return; // err, missing element

  if((power > POWER_MAX) || power < -POWER_MAX){
    warning_msg(`Exceed POWER_MAX: ${POWER_MAX}`); 
    return; 
  }

  if(m != n){
    warning_msg("Not a SQUARE matrix");
    return; 
  }

  let matrix_2d = make_2d(matrix, m, n); 
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
    // inverse or neg. pow (find inverse first)

    const det = calc_determinant(matrix_2d, n); 

    if(det == 0){
      warning_msg("Matrix is singular / non-invertible / det is equal to 0");
      return; 
    }

    if(power == -1) change_input_value(char); // input power is changed from null to -1 as inverse button was selected 
    
    let adjoint = new Array(m).fill(0).map(() => new Array(n).fill(0));
    calc_adjoint(matrix_2d, adjoint, n); 
    let inverse = new Array(m).fill(0).map(() => new Array(n).fill(0)); // KEEP ELEMENTS AS DECIMALS 

    // divide each element by det 
    for(let i=0; i<m; ++i){
      for(let j=0; j<n; ++j){
        result[i][j] = (adjoint[i][j] / det); // divide each element in adjoint matrix by det 
      }
    }

    if(power < -1){
      // use inverse to calc matrix negative power 
      // ex A^-4 = (A^-1)^4 

      let pos_power = -power; 
      inverse = [...result]; // init, result is the inverse 

      for(let i=1; i<pos_power; ++i){
        // mul inverse matrix * result matrix positive power amount of times 
          result = multiply_square_matrix(result, inverse, m, n);
      }
    }

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
      //  console.log(product[i][j]); // NEW ELEMENT ADDED IN RESULT MATRIX 
    }
  }

  return product;
}

function calc_adjoint(matrix_2d, adjoint, n){
  // similar method to finding det, use of cofactor func and calc_det func.
  // fill entire cofactor matrix (det func only used first row), transpose  

  if(n == 1){
    // a is 1x1 adjoint will be 1
    // resulting in an inverse of 1 / det(a)
    adjoint[0][0] = 1; 
    return; 
  }

  let cofactors = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let sign = 1; // +1 or -1 

  // cofactors for every element 
  for(let i=0; i<n; ++i){
    for(let j=0; j<n; ++j){
      store_cofactors(matrix_2d, cofactors, n, i, j); 

      if((i+j) % 2 == 0) sign = 1;
      else sign = -1; 

      // transpose, swap row w/ col, no need to call transpose func 
      adjoint[j][i] = sign * (calc_determinant(cofactors, n-1)); // explain calc_determinant func inside that func 
    }
  }

  return adjoint; 
}

function change_input_value(char){
  // click inverse button, make input value equal to -1 

  let input = `#matrix-${char.toLowerCase()}-raised-power`; 
  document.querySelector(input).value = -1; 
}


// -------------------------- Calculate Det of Matrix (A or B) ---------------------------
document.querySelector("#matrix-a-det-btn").addEventListener("click", () => { 
  determinant("A", matrix_grid_a, am_input, an_input); 
});

document.querySelector("#matrix-b-det-btn").addEventListener("click", () => { 
  determinant("B", matrix_grid_b, bm_input, bn_input); 
});

function determinant(char, matrix_grid, m, n){
  /*
  needs to be square 
  use cofactor expansions det(A) = (row whatever first cofactor w/ sign * det(minor))(second cofactor w/ sign * det(mint)) ... 
  (minor (i,j): matrix remove current row(i) and column(j)
  cofactor: det of that remaining matrix * (-1)^ij) 
  cofactor signs 
  signs of cofactors | +-+ ... )
                    | -+- ... ) 
                      ... 
  just use the first row for cofactors 
  */ 

  if(m != n){
    warning_msg("Not a SQUARE matrix");
    return; 
  }

  if((m*n) > SQUARE_MAX){
    warning_msg(`No larger than a ${SQUARE_MAX} x ${SQUARE_MAX}`);
    return; 
  }

  let matrix = read_input(matrix_grid, m, n); 
  if(missing_element_single_matrix(matrix)) return; // err, missing element

  let matrix_2d = make_2d(matrix, m, n); 

  if(matrix_2d.length == 1){
    // det(1x1) is value of that element 
    display_result_unary(`det(${char})`, matrix_2d, matrix_2d, m, n, ""); 
    return; 
  }

  let det = calc_determinant(matrix_2d, m, n); 

  display_result_unary(`det(${char})`, det, matrix_2d, m, n, ""); 
}

function calc_determinant(matrix_2d, n){
  // seperate functions, inverse and neg power calcultions will need access to both 
  // func. called recursively until single element / the det for that sub matrix 

  let det = 0; 

  if(n == 1){
    // signal end recursion 
    // only single element, which is the det 
    return matrix_2d[0][0]; 
  }

  let cofactors = new Array(n).fill(0).map(() => new Array(n).fill(0)); // new col, reset cofactors 
  let sign = 1; // +1 or -1 
  
  for(let i=0; i<n; ++i){
    // first row for cofactors 
    // cofactors(...) func will fill cofactors[r][c] appropriately (r=0 or first row)
    store_cofactors(matrix_2d, cofactors, n, 0, i);
    det += sign * matrix_2d[0][i] * calc_determinant(cofactors, n-1); // det += c(i,j) <-- = (-1)^(i,j) * det(A(i,j) or minor)

    // flip sign 
    sign = -sign; 

    // move next cofactor (next col of the first row) ... 
  }
  
  return det; 
}

function store_cofactors(matrix_2d, cofactors, n, r, c){
  // if 2x2 just single element 
  // row is always 0 
  // return/ store resulting matrix (elements not in a cofactor row and col) in cofactors arr 

  let a = 0 , b = 0; 

  for(let i=0; i<n; ++i){
    for(let j=0; j<n; ++j){

      if((i != r) && (j != c)){
        // element not in current row and column, store 
        cofactors[a][b] = matrix_2d[i][j];
        // console.log(`cofactors[${i}][${j}]: ${cofactors[i][j]}`); 

        if(b < (n-2)){
          // move next col 
          ++b; 
        }
        else{
          // no more col left, reset col move next row 
          b = 0; 
          ++a; 
        }
      }
    }
  }

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

  display_result_unary(char, transpose, matrix_2d, m, n, "T"); // display 
}


// -------------------------- Display result from binary op ---------------------------
function display_result_binary(result, matrix_a, matrix_b, am, an, bm, bn, operator){
  // display both matrices with result (insert matrix as table)

  console.log(result); 

  // save data for "put in a/b"
  matrix_result = [...result];
  result_m = am, result_n = bn;

  //convert_to_frac(result, an, bm);

  show_result_box();   // make solution box visible 

  // 4 divs, 1: matrix a, 2: operator, 3: matrix b, 4: = 5: result
  const wrapper = document.querySelector(".result-wrapper"); 
  const divs = document.querySelectorAll(".result-wrapper > div"); // return object containing those 4 divs 
  
  reset_result(divs); // clear old result, if present 
  
  // display matrix a
  make_table(divs[0], matrix_a, am, an, false);
  if(am == bm) brackets(divs[0], am, bn);
  else brackets_alt(divs[0], am, bn);

  // display operator
  divs[1].innerHTML = operator; 

  // display matrix b 
  make_table(divs[2], matrix_b, bm, bn, false); 
  if(am == bm) brackets(divs[2], am, bn);
  else brackets_alt(divs[2], am, bn);

  // display =
  divs[3].innerHTML = "="; 

  // display result 
  make_table(divs[4], result, am, bn, true);
  brackets(divs[4], am, bn);
}

// -------------------------- Display result from unary op ---------------------------
function display_result_unary(char, result, matrix, m, n, option){
  // option is either the power or T for tranpose operation 
  // char is A, B or det(A or B) 
  // A^option // B^option (matrix)^option = (result)

  console.log(result); 

  if(typeof result === "object"){
    // for "put in a/b"'
    matrix_result = [...result]; 
    result_m = m, result_n =n; 
  }

  else matrix_result = result; 

  // convert elements to "fractions" if rational 
  convert_to_frac(matrix, m, n);
  if(typeof result === "object") convert_to_frac(result, m, n); // if result 2d matrix contains any decimals, will convert to fractions (explained inside func)

  show_result_box();   // make solution box visible 

  // 4 divs, 1: matrix a/b^power, 2: matrix-table, 3: =, 4: result
  const wrapper = document.querySelector(".result-wrapper"); 
  const divs = document.querySelectorAll(".result-wrapper > div"); // return object containing those 4 divs 
  
  reset_result(divs); // clear old result, if present 

  let super_script = document.createElement("sup"); 
  super_script.innerHTML = option; 

  // display operation
  if(option < 0){
    // neg power, display as matrix inverse raised n power 
    divs[0].innerHTML = `&nbsp;(${char}<sup>${-1}</sup>)<sup>${-option}</sup>&nbsp;&nbsp;&#x2192;`; 
  }

  else divs[0].innerHTML = `&nbsp;${char}<sup>${option}</sup>&nbsp;&nbsp;&#x2192;`; 

  // display matrix/table w/ sup
  make_table(divs[1], matrix, m, n, false);
  divs[1].appendChild(super_script);
  divs[1].style.display = "flex"; 
  brackets(divs[1], m , n);

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
  
  if(char.includes("det")){
    // no table, just display result 

    divs[3].innerHTML = result;
    divs[3].style.fontWeight = "bold";  
  }

  else{
    // display table 
    make_table(divs[3], result, m, n, true); 
    brackets(divs[1], m , n);
  }

}

function convert_to_frac(matrix_2d, m, n){
  // convert decimal values to fractions, if rational 
  // format: matrix_2d[i][j] = `${numerator} / ${denominator}` 
   
  for(let i=0; i<m; ++i){
    for(let j=0; j<n; ++j){

      if(((matrix_2d[i][j] % 1) != 0)){
        // rational number, store as fraction 
        matrix_2d[i][j] = dec_to_frac(matrix_2d[i][j]);  
      }
    }
  }

}

function dec_to_frac(fraction){
  // num: denom * fraction 
  // denom: 10 ^ places after decimal 
  // gcd of numerator, denominator
  // divide num/gcd + "/" +  den/gcd

  let index = fraction.toString().indexOf(".");
  let places_after_decimal = fraction.toString().length - index-1;

  let denom = Math.pow(10, places_after_decimal); // 10^places_after_decimal
  let num = denom * fraction; 
  let gcd_ = gcd(num, denom); 

  // simplify 
  num /= gcd_;  
  denom /= gcd_;

  return `${num} / ${denom} &nbsp;`; 
}

function gcd(a, b){
  // euclidean algo 

  if(b == 0) return Math.abs(a); 

  return gcd(b, Math.floor((a % b))); 
}

function show_result_box(){
  // make solution box visible 
  // remove old bracket class, as display result from binary op shows 3 matrices, while display result from unary op shows 2 

  const solution_box = document.querySelector(".solution-container"); 
  solution_box.style.transform ="scale(1)"; 
  const ab = document.querySelector(".put-in-ab");
  ab.style.transform = "scale(1)";

  const show = document.querySelectorAll(".show");
  for(let i=0; i<show.length; ++i){

    if(show[i].classList.contains("brackets")) show[i].classList.remove("brackets");
    if(show[i].classList.contains("brackets-alt")) show[i].classList.remove("brackets-alt");
  }
}

function make_table(target, matrix, m, n, bold){
  // target is location to put the matrix
  // table will match the result matrix, add each element in appropriate index 

  let table = document.createElement("table"); 
  target.appendChild(table); 

  for(let i=0; i<m; ++i){
    let table_row = document.createElement("tr"); 
    table.appendChild(table_row); 

    for(let j=0; j<n; ++j){
      let table_data = document.createElement("td");

      if(bold){
        table_data.style.fontWeight = "bold";
        table_data.style.fontSize = "1.4em"; 
      }

      table_data.innerHTML = matrix[i][j]; 
      table_row.appendChild(table_data); 
    }
  }

//  target.classList.add("brackets");
}

function reset_result(divs){
  // clear previous unary or binary operation with single/ both matrices 

  for(let i=0; i<divs.length; ++i){
    divs[i].innerHTML = "";  
  }
}

// -------------------------- Misc ---------------------------
// ------------------------- SWAP -----------------------------
document.querySelector("#swap-btn").addEventListener("click", () => {
  // matrix A <=> matrix B  

  matrix_a = read_input(matrix_grid_a, am_input, an_input); 
  matrix_b = read_input(matrix_grid_b, bm_input, bn_input); 

  display_matrix(bm_input, bn_input, am_input, an_input); // swap sizes if diff

  // sizes are now swapped, fill inputs 
  let ab = document.getElementsByClassName("swap");
  let index  = 0; // ab contains inputs from both matrices, keep index as sizes can differ 

  for(let i=0; i<matrix_b.length; ++i){
    ab[index].value = matrix_b[i]; 
    ++index; 
  }

  for(let i=0; i<matrix_a.length; ++i){
    ab[index].value = matrix_a[i]; 
    ++index; 
  }

}); 

// ------------------------- Put in A / B -----------------------------
// when result is displayed, the data is stored in the global var matrix_result, along with its m and n 

document.querySelector("#put-in-a-btn").addEventListener("click", () => {
  make_matrix_with_values(matrix_result, matrix_grid_a, result_m, result_n);
});

document.querySelector("#put-in-b-btn").addEventListener("click", () => {
  // put_in_ab("A", matrix_grid_b); 
  make_matrix_with_values(matrix_result, matrix_grid_b, result_m, result_n);
});

function make_matrix_with_values(result_2d, matrix_grid, m, n){
  // similar to make_matrix func, but assign values to the inputs 

  if(typeof result_2d != "object"){
    warning_msg("Determinant is a single value, not a matrix");
    return;
  }

  while(matrix_grid.hasChildNodes()){
    // remove old matrix, if present 
    matrix_grid.removeChild(matrix_grid.lastChild);
  }

  let result_1d = [].concat(...result_2d); // convert to 1d, easier to assign value to inputs 

  for(i=0; i<(m*n); ++i){
    // create inputs for matrix, will set properties for css after 
    let input = document.createElement("input"); 
    input.type="number"; 
    input.value = result_1d[i]; 
    input.classList.add("move", "swap"); 
    matrix_grid.appendChild(input);
  } 

  document.documentElement.style.setProperty("--a-m", m); // adjust css var to create correct template rows/ cols after func compelte / format grid 
  document.documentElement.style.setProperty("--a-n", n); 
  document.documentElement.style.setProperty("--b-m", m); // adjust css var to create correct template rows/ cols after func compelte / format grid 
  document.documentElement.style.setProperty("--b-n", n); 

  init_move(); // L and R arrow keys to move 


}

// -------------------------- Small Err Checks ---------------------------
function same_size(am, an, bm, bn){
  // check, if both matrices must be equal 

  if((am != bm) || (an != bn)){
    warning_msg("Both matrices must be the same size"); 
    return 1;
  } 

  return 0; // same size 
}

function is_square(m,n){
  if(m != n) return 1; // err 

  return 0; 
} 

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


// -------------------------- Disable Input Num Scroll---------------------------
const scroll = document.querySelectorAll(".disable-scroll");  

for(let i=0; i<scroll.length; ++i){
  scroll[i].addEventListener("keydown", (input) => {
  disable_scroll(input);
});
}

function disable_scroll(input){
  // input type is number, disable up/down arrow adjusting value 
  if(input.which == 38 || input.which == 40) input.preventDefault();
}

// -------------------------- Arrow Keys Nav Matriz size Inputs ---------------------------
// "box" movement 
const move_a = document.querySelectorAll(".move-a");
const move_b = document.querySelectorAll(".move-b");

move_a[0].addEventListener("keydown", (e) => {
  if(e.keyCode == 39) move_a[1].focus();
  if(e.keyCode == 40) move_b[0].focus();
});

move_a[1].addEventListener("keydown", (e) => {
  if(e.keyCode == 37) move_a[0].focus();
  if(e.keyCode == 40) move_b[1].focus();
  if(e.keyCode == 39) move_b[0].focus();
});

move_b[0].addEventListener("keydown", (e) => {
  if(e.keyCode == 39) move_b[1].focus();
  if(e.keyCode == 38) move_a[0].focus();
  if(e.keyCode == 37) move_a[1].focus();
});

move_b[1].addEventListener("keydown", (e) => {
  if(e.keyCode == 37) move_b[0].focus();
  if(e.keyCode == 38) move_a[1].focus();
});


// -------------------------- Arrow Keys Nav Matrix A B ---------------------------
function init_move(){
  // new size matrix will not account for arr of input elements, this func will fix that issue when called 

  let inputs = document.querySelectorAll(".move");

  for(let i=0; i<inputs.length; ++i)
    // left and right arrow to "move" through matrix 
    inputs[i].addEventListener("keydown", function (e) {
  
      if(e.keyCode == 37) if(this.previousElementSibling) this.previousElementSibling.focus(); // left arrow 

      if(e.keyCode == 39) if(this.nextElementSibling) this.nextElementSibling.focus(); // left arrow 
    }); 
}


// testing
matrix_a = [[2,2], [2,2]];
matrix_b = [[2,2], [2,2]];

mul_matrix(matrix_a, matrix_b, 2, 2, 2, 2); 

// let a = 25, b = 2; 

// let product = new Array(a).fill(0).map(() => new Array(b).fill(0)); 

// display_result_unary("det", 9, product, a, b, "");



function brackets(target, m, n){
  target.classList.add("brackets"); 
  let scale_y = 2 * m; 
  let margin_b = 8 * m; 
  document.documentElement.style.setProperty("--bracket-y-scale", scale_y);
  document.documentElement.style.setProperty("--margin-bottom", margin_b+"px");
}

function brackets_alt(target, m, n){
  // a matrix has different row height, use different css var

  target.classList.add("brackets-alt"); 
  let scale_y = 2 * m; 
  let margin_b = 8 * m; 
  document.documentElement.style.setProperty("--bracket-y-scale-1", scale_y);
  document.documentElement.style.setProperty("--margin-bottom-1", margin_b+"px");
}
# Matrix-Calculator <sub>Andreas G. </sub>
All code and calculations are explained inside each function.

## Overview

Neat little matrix calculator I developed with support for a number of operations on matrices.  

**Input for Matrix A, B** 
The default displays two 2x2 matrices. The user is able input the size of Matrix A, Matrix B, or both. If only m or n is inputted without the other for a matrix, an error is presented with a modal box. In addition, the max size for each matrix is 25 x 25 (arbitrary).

The input read can be a whole number, decimal, or a fraction(parsed/stored as a decimal). 

Any missing inputted elements will prompt an error, if unary operation all elements in Matrix A or B must be filled, if binary, both matrices needs to be filled. However, swap does not have an exception of that sort, can even swap empty matrices of different sizes. 

**Each specific operation will have error checks depending on what is required for the calculation**. For example, binary operation, matrix multiplication requires matrix A's col to
be the same size as matrix B's row. Another example, unary operation, inverse of a matrix, the matrix must be invertible (det != 0) and square (m == n). 

**Unary Operations**
- Determinant of square matrix
- Inverse  
- Negative power (A^-1^)n
- 0 power of square matrix (A^0^)
- Positive power   (A^n^)
- Transposition of any-size matrix

**Binary Operations**
- Multiplication
- Addition 
- Subtraction

**Other** 
- Swap: Regardless of size, or the element data, the entire matrix is swapped for each. That was done with saving the matrices data (kept 1d form, in a single array), and creating
two new matrices of the correct size and assigning the input values with the correct data from the 1d array. Elements can be missing and the updated matrix will reflect that fact.

- Clear: Simply clear either Matrix A or B, dependent on the button selected. The solution/ result box will not scale to 0, allowing the user to use the "put in a/b" buttons.

- Put in A/B: Saved the result matrix, converted back to 1d array, created a new matrix of inputs, equal to the size of the result matrix, and assigned its input values according to the 1d array.

**Flaw**
- If the result matrix has an element that is a repeating decimal, will display as a decimal with 6 decimal places. Be aware, "put in a/b" will not put the full
repeating decimal in (16 places after decimal), **use fractions to ensure accuracy**.  

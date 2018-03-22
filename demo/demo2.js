function multiply(a, b) {
    return a * b;
}

function square(n) {
    return multiply(n, n);
}

function PrintSquare(n) {
    var squared = square(n);
    console.log(squared);
}

PrintSquare(5);


const calc = require('./calc');

test("A to B to C distance is 9", () => {
    const d = calc.getDistance('A-B-C');
    expect(d).toBe(9);
});

test("A to D distance is 5", () => {
    const d = calc.getDistance('A-D');
    expect(d).toBe(5);
});

test("A-D-C distance is 13", () => {
    const d = calc.getDistance('A-D-C');
    expect(d).toBe(13);
});

test("A-E-B-C-D distance is 22", () => {
    const d = calc.getDistance('A-E-B-C-D');
    expect(d).toBe(22);
});


test("A to E to D has no route", () => {
    const d = calc.getDistance('A-E-D');
    expect(d).toBe(0);
});

test("C to C trips with max 3 stops is 2", () => {
    const d = calc.tripsWithMax3Stops('C','C');
    expect(d).toBe(2);
});


test("A to C trips with 4 stops is 3", () => {
    const d = calc.tripsWithExactStops('A','C', 4);
    expect(d).toBe(3);
});


test("A to C shortest distance is 9", () => {
    const d = calc.shortestDistance('A','C');
    expect(d).toBe(9);
});

test("B to B shortest distance is 9", () => {
    const d = calc.shortestDistance('B','B');
    expect(d).toBe(9);
});


test("C to C trips different routes distance less than 30 is 7", () => {
    const d = calc.routes('C','C', 30);
    expect(d).toBe(7);
});
const calculation = require('./calc');

let d = calculation.getDistance('A-B-C');
console.log('#1 The distance of the route:', d === 0 ? 'NO SUCH ROUTE' : d);

d = calculation.getDistance('A-D');
console.log('#2 The distance of the route:', d === 0 ? 'NO SUCH ROUTE' : d);

d = calculation.getDistance('A-D-C');
console.log('#3 The distance of the route:', d === 0 ? 'NO SUCH ROUTE' : d);3

d = calculation.getDistance('A-E-B-C-D');
console.log('#4 The distance of the route:', d === 0 ? 'NO SUCH ROUTE' : d);

d = calculation.getDistance('A-E-D');
console.log('#5 The distance of the route:', d === 0 ? 'NO SUCH ROUTE' : d);

const trips = calculation.tripsWithMax3Stops('C','C');
console.log('#6 The number of trips:', trips);

const tripsExact4Stops = calculation.tripsWithExactStops('A','C', 4); 
console.log('#7 The number of trips:', tripsExact4Stops);

d = calculation.shortestDistance('A', 'C');
console.log('#8 The shortest distance from A and to C:', d);

d = calculation.shortestDistance('B', 'B');
console.log('#9 The shortest distance from B to B:', d);

d = calculation.routes('C','C', 30);
console.log('#10 The different routes:', d);
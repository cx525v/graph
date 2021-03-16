const data = require('./graph');

const nextNode = (weights, processed) => {
    const knownNodes = Object.keys(weights)
    const lowestWeightNode = knownNodes.reduce((lowest, node) => {
         if (lowest === null && !processed.includes(node)) {
            lowest = node;
        }
        if (weights[node] < weights[lowest] && !processed.includes(node)) {    
            lowest = node;
        }
        return lowest;
     }, null);
   return lowestWeightNode
 };

const shortestRoute = (graph, start, finish) => {
   
    const weights = Object.assign({finish: Infinity}, graph[start]); 
    const parents = {finish: null};  
    for (let child in graph[start]) {   
      parents[child] = start;  
     }

    const processed = [];
   
    let node = nextNode(weights, processed);
    while (node) {
        let weight = weights[node];
        let children = graph[node]; 
            for (let n in children) { 
             let newWeight = weight + children[n];     
            if (!weights[n] || weights[n] > newWeight) { 
                weights[n] = newWeight; 
                parents[n] = node;
             }
        }
    
        processed.push(node); 
        node = nextNode(weights, processed);
      }

    let optimalPath = [finish];
    let parent = parents[finish]

    while (parent) {
      
        optimalPath.unshift(parent);
        if(parent === finish) {
            break;
        }
        parent = parents[parent]; 
    }

    const results = {
        distance: weights[finish],
        path: optimalPath
    };

    return results;
}; 

module.exports.shortestDistance = (start, finish) => {
    const graph = data.graph;
    const route = shortestRoute(graph, start, finish);
    return route.distance;
}

const directDistance = (startTown, endTown) => {
    const graph = data.graph;
    const path = graph[startTown][endTown];
    return path ? path : 0;
  }

module.exports.getDistance = (route) => {
    const cities = route.split('-');
  
    let distance = 0;
    for(i = 0; i < cities.length - 1; i++) {
      const d = directDistance(cities[i], cities[i+1]);
      if ( d === 0) {
          distance  = 0;
          break;
      }

      distance += d;
    }
 
    return distance;
}

 module.exports.tripsWithMax3Stops = (start, end) => {   
     let count = 0; 
     const graph = data.graph;
     const firstStops = Object.getOwnPropertyNames(graph[start]);
    
     const secondStops = [];
     firstStops.forEach(stop => {
         const stops =  Object.getOwnPropertyNames(graph[stop]);
         stops.forEach(s => {
           if(s===end) {
             count++;
           } else {
            if(!secondStops.includes(s)) {
              secondStops.push(s);
            }
           }
         });
     })

     secondStops.forEach(stop => {
         const stops =  Object.getOwnPropertyNames(graph[stop]);
         stops.forEach(s => {
           if(s===end) {
             count++;
           } 
         });
     })

     return count;
 }

 module.exports.tripsWithExactStops = (start, end, exactStops) => {   
    let count = 0;
    const graph = data.graph;
    const firstStops = Object.getOwnPropertyNames(graph[start]);
    let nextStops = [...firstStops];
    let stops = [];
    for(let i = 0; i < exactStops - 2; i++) {
        stops = [];
        nextStops.forEach(stop => {
          stops.push(...Object.getOwnPropertyNames(graph[stop]));          
          })
        nextStops = [...stops];
   }

   nextStops.forEach(stop => {
      const lastStop = graph[stop][end];
      if(lastStop) {
          count++;
      }
   })
    return count;
}

module.exports.routes = (start, end, maxDistance) => {   
    let count = 0;
    const graph = data.graph;
    const routes = [];
    let paths = [];
    
    const firstStops = Object.getOwnPropertyNames(graph[start]);
    firstStops.forEach(s => {
        paths.push(start + '-' + s);
    });
    let newPaths = [];
    while(paths.length > 0) {
      newPaths = [];
      paths.forEach(path => {
        const stops = path.split('-');
        const lastStop = stops[stops.length -1 ];
        if( this.getDistance(path) < maxDistance) {
            if(lastStop === end) {
                count++;
            }
            
          const nextStops =  Object.getOwnPropertyNames(graph[lastStop]);
        
          nextStops.forEach(s => {
            newPaths.push(path + '-' + s);
           });
        }      
      });

      paths = newPaths;
    }  

  return count;
}
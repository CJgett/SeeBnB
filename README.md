# The Branch and Bound Algorithm

SeeBnB is an Open Educational Resource designed to help users visualize (see!) the branch and bound (BnB) algorithm. 

Branch and bound is an exhaustive algorithm, which means that it always provides an optimal
solution. Although the branch and bound algorithm has been referred to as an algorithm in the 
singular, it is actually composed of three parts which can be replaced with different options
to customize and optimize it for the problem at hand.

To explain the branch and bound algorithm, one can start with the name itself. One
subprocess of the algorithm is one in which the given problem and its solution space is
mapped into a tree by iteratively branching the original problem into increasingly smaller
subproblems. These subproblems are defined by their smaller set of possible solutions,
all of which are also valid for the parent problem. Via branching, the solution space
is partitioned. Nodes in this tree created by branching represent the subproblems, and
are then inspected when traversing the problem tree in the order denoted by a search
strategy, all the while comparing the solutions of the subproblems to determine if they
fall under (over) an upper (lower) bound. Through this process of visiting nodes and
comparing them to upper and lower bounds, entire branch sections can be discarded,
allowing for efficiency gains. The branch and bound algorithm therefore consists of three
customizable parts: **branching, bounding and searching**

# Traveling Salesman Problem

In the context of this program, the branch and bound algorithm is being used to solve the Traveling Salesman Problem (TSP).

The traveling salesman problem (TSP) asks the question, "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once before returning to the origin city?".

# This project

This web app was built to show how the branch and bound algorithm works, as well as how it can be customized. The areas of customization are as follows:

## Initial Solution 

The branch and bound algorithm can draw its initial incumbent solution from a more efficient heuristic
algorithm. This incumbent solution is then used as a global upper bound. 

The heuristic algorithms to choose from for the initial solution are: 
- Shortest Path
- Arbitrary Insertion
- Furthest Insertion
- Nearest Insertion
- Convex Hull Insertion
- Simulated Annealing

## Search Strategies 

As the branch and bound algorithm runs, new nodes are added to be
stored in a data structure and at each step, one node is chosen to be explored. Specifically,
the search strategy dictates how the next node is chosen to be explored at each step from
the nodes to be explored. SeeBnB provides three different search strategies to choose from:

- Depth-first search (DFS), also known as Last In, First Out (LIFO)
- Breadth-first search (BFS), also known as First In, First Out (FIFO)
- Minimum Lower Bound (MLB)

## Bounding Strategies 

The lower bound is a value associated with each node denoting the distance traveled to
reach the node using the current solution. As each node is added to the group of nodes to
visit, the lower bound is calculated and stored for that node. Once the node is visited, the
node’s lower bound is compared to the current upper bound. If the distance to reach the
node is higher than the distance for the highest possible optimum solution, then paths
starting with the path used to reach this node will not result in the optimal solution, and
therefore this node will be pruned. The three methods used to calculate the lower bound in this
program are: 

- Current Cost
- Cheapest Edges
- 1-Tree (Kruskal)

## Dependencies

These are the main tools used to build this site:

- [gatsbyjs](https://www.gatsbyjs.org)
- [reactjs](https://reactjs.org)
- [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [material-ui](https://material-ui.com/)
- [deck.gl](https://deck.gl/#/)
- [d3](https://d3js.org/)
- [mapbox](https://www.mapbox.com/)

# Use

As this is meant to be an open educational resource, feel free to use this program to show others the inner workings of the branch and bound algorithm. You can also build off of this program to help others see other sides of BnB!

## How to Run SeeBnB

You can view SeeBnB immediately at [SeeBnB_io](https://cjgett.github.io/SeeBnB_io/). If you'd like to run the files yourself, keep reading.

SeeBnB makes use of Gatsby, a React-based open source framework for creating websites. 

Once you have cloned the repository, you can use Gatsby to get started. This [quick start guide](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-0/#installation-guide) from Gatsby could be helpful. 

You have two options to run the website: in develop or build mode.

### Develop

`npm run develop`: this command runs a server in the background and enables the use of hot reloading, as well as other features supported by Gatsby. 

### Build 

`npm run build`: this command translates the React files into static HTML pages and stores these in the public folder. To view these files immediately, simply use the command `npm run serve`.

If you'd like to run these static files yourself, just update the pathPrefix located in the gatsby-config.js file. You'll need to add the path that comes after the domain name. For example, if you'd like to serve the files at https://cjgett.github.io/SeeBnB_io/, the pathPrefix should be set to `/SeeBnB_io`, as it is currently in this repository.

Gatsby provides an [explainer](https://www.gatsbyjs.com/docs/conceptual/overview-of-the-gatsby-build-process/) for more information on the differences between Gatsby build and develop.

## Acknowledgements
This repository is a modified version of [tspvis](https://github.com/jhackshaw/tspvis) by [Jeff Hackshaw](https://github.com/jhackshaw)  

The aforementioned modifications were made by Carly Gettinger in the scope of a bachelors thesis written with Professor Dr. Felix Weidinger at TU Darmstadt. Many thanks to Professor Weidinger for supporting this project!

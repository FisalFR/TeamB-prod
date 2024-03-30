"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue_1 = require("./Queue");
var Pathfinder = /** @class */ (function () {
    function Pathfinder() {
        this.nodeList = [];
        this.edgeList = [];
        this.finalPath = [];
        this.nodeMap = new Map();
    }
    // Function to return the path from startNode to endNode using BFS
    Pathfinder.prototype.BFS = function (startNode, endNode) {
        var frontier = new Queue_1.default();
        frontier.enqueue(startNode);
        var cameFrom = new Map();
        cameFrom.set(startNode, null);
        while (!frontier.isEmpty()) {
            var current = frontier.dequeue();
            if (current.nodeID == endNode.nodeID) {
                break;
            }
            for (var _i = 0, _a = current.neighbors; _i < _a.length; _i++) {
                var next = _a[_i];
                if (!cameFrom.has(next)) {
                    frontier.enqueue(next);
                    cameFrom.set(next, current);
                }
            }
        }
        return this.reconstructPath(cameFrom, startNode, endNode);
    };
    // Function to generate Node Maps
    Pathfinder.prototype.generateNodeMap = function () {
        for (var _i = 0, _a = this.nodeList; _i < _a.length; _i++) {
            var node = _a[_i];
            node.neighbors = []; // Initialize neighbors array
            this.nodeMap.set(node.nodeID, node);
        }
        // Assign neighbors to nodes using edge information
        for (var _b = 0, _c = this.edgeList; _b < _c.length; _b++) {
            var edge = _c[_b];
            var startNode = this.nodeMap.get(edge.startNodeID);
            var endNode = this.nodeMap.get(edge.endNodeID);
            if (startNode && endNode) {
                startNode.neighbors.push(endNode);
                endNode.neighbors.push(startNode); // If bidirectional edges are considered
            }
        }
        return this.nodeMap;
    };
    Pathfinder.prototype.reconstructPath = function (cameFrom, startNode, endNode) {
        var path = [];
        while (endNode != startNode) {
            path.push(endNode);
            endNode = cameFrom.get(endNode);
        }
        path.push(startNode);
        return path.reverse();
    };
    return Pathfinder;
}());
exports.default = Pathfinder;

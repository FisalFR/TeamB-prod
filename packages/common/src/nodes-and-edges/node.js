"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(nodeID, xcoord, ycoord, floor, building, nodeType, longName, shortName, neighbors) {
        this.nodeID = nodeID;
        this.xcoord = xcoord;
        this.ycoord = ycoord;
        this.floor = floor;
        this.building = building;
        this.nodeType = nodeType;
        this.longName = longName;
        this.shortName = shortName;
        this.neighbors = neighbors;
    }
    return Node;
}());
exports.default = Node;

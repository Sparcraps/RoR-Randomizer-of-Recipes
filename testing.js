"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var en_inflectors_1 = require("en-inflectors");
var i = new en_inflectors_1.Inflectors("rib of celery").toPlural();
var str = JSON.stringify(i);
console.log(i);

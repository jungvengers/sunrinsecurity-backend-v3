"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartmentByClass = exports.departments = void 0;
exports.departments = [
    'security',
    'software',
    'business',
    'design',
];
function getDepartmentByClass(userClass) {
    if (userClass < 4)
        return exports.departments[0];
    else if (userClass < 7)
        return exports.departments[1];
    else if (userClass < 10)
        return exports.departments[2];
    return exports.departments[3];
}
exports.getDepartmentByClass = getDepartmentByClass;

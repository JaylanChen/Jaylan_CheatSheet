module.exports = function (c1, compare, c2, obj) {
    if (compare === "==") {
        if (c1 == c2) {
            return obj.fn(this);
        } else {
            return obj.inverse(this);
        }
    } else if (compare === "<") {
        if (c1 < c2) {
            return obj.fn(this);
        } else {
            return obj.inverse(this);
        }
    } else if (compare === ">") {
        if (c1 > c2) {
            return obj.fn(this);
        } else {
            return obj.inverse(this);
        }
    } else if (compare === "!=") {
        if (c1 != c2) {
            return obj.fn(this);
        } else {
            return obj.inverse(this);
        }
    }
}
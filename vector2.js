class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    normalize() {
        const vm = this.magnitude();
        if (vm > 0) {
            this.x /= vm;
            this.y /= vm;
        }
    }

    static normalized(v) {
        const vm = v.magnitude();
        return vm > 0 ? new Vector2(v.x / vm, v.y / vm) : new Vector2();
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    sqrMagnitude() {
        return this.x * this.x + this.y * this.y;
    }

    static dot(u, v) {
        return u.x * v.x + u.y * v.y;
    }

    static distance(u, v) {
        return Math.sqrt((u.x - v.x) ** 2 + (u.y - v.y) ** 2);
    }

    static sqrDistance(u, v) {
        return (u.x - v.x) ** 2 + (u.y - v.y) ** 2;
    }

    static add(u, v) {
        return new Vector2(u.x + v.x, u.y + v.y);
    }

    static subtract(u, v) {
        return new Vector2(u.x - v.x, u.y - v.y);
    }

    static equals(u, v) {
        return u.x === v.x && u.y === v.y;
    }

    static notEquals(u, v) {
        return !(Vector2.equals(u, v));
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    static project(u, v) {
        const vn = v.normalized();
        return this.dot(u, vn) * vn;
    }

    static projectMagnitude(u, v){
        return this.dot(u, v.normalized());
    }

    static projectOnPlane(u, v) {
        return u - project(u, v);
    }
    static reject = this.projectOnPlane;

    static reflect(u, v) {
        return u - this.reject(u, v) * 2;
    }
}
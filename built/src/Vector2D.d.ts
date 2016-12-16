export declare class Vector2D {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    /**
     * 两点间线性插值
     * @param t t 为 0 ~ 1 之间的小数，为 0 则结果为 v1，为 1 则结果为 v2
     * @param out 省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     */
    static Lerp(v1: Vector2D, v2: Vector2D, t?: number, out?: Vector2D): Vector2D;
    /**
     * 返回一个指定长度的随机方向向量
     */
    static Random(scale?: number, out?: Vector2D): Vector2D;
    /**
     * 取得两向量之间夹角的弧度值，逆时针为正
     */
    static AngleBetween(v1: Vector2D, v2: Vector2D): number;
    static fromPolar(len: number, radians: number): Vector2D;
    /**
     * 取向量长度
     */
    length: number;
    /**
     * 取向量长度的平方，由于不用开方运算，效率更高
     */
    readonly squaredLength: number;
    /**
     * 是否为0向量
     */
    readonly isZero: boolean;
    /**
     * out = this + v
     */
    add(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * out = this - v
     */
    subtract(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * out = this multiply v
     */
    multiply(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * out  = this / v
     */
    divide(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * out = this * s
     */
    scale(s: number, out?: Vector2D): Vector2D;
    /**
     * 基于某个点缩放
     *
     * @param {Vector2D} point 基于该点缩放
     * @param {number} sx (description)
     * @param {number} sy (description)
     * @param {Vector2D} [out=undefined] (description)
     * @returns {Vector2D} (description)
     */
    scaleAbout(point: Vector2D, sx: number, sy: number, out?: Vector2D): Vector2D;
    /**
     * Adds two vec2's after scaling the second operand by a scalar value
     */
    scaleAndAdd(v: Vector2D, scale: number, out?: Vector2D): Vector2D;
    /**
     * 返回从此点到p2点之间的距离
     */
    distanceTo(p2: Vector2D): number;
    /**
     * 此点到p2距离的平方
     */
    squaredDistanceTo(p2: Vector2D): number;
    negate(out?: Vector2D): Vector2D;
    /**
     * 转为单位向量,数学上经常在向量上加个小帽子表示 :)
     */
    normalize(): Vector2D;
    /**
     * 点乘 结果等于|a||b|cos夹角
     * @param v
     * @returns {number}
     */
    dot(v: Vector2D): number;
    /**
     * 2叉乘
     * 2d叉乘并不常见，与3d不同，结果是一个数值，相当于3d叉乘的z轴
     * @param v
     */
    cross(v: Vector2D): number;
    /**
     * 左垂直向量
     */
    leftHandNormal(out?: Vector2D): Vector2D;
    /**
     * 右垂直向量
     */
    rightHandNormal(out?: Vector2D): Vector2D;
    /**
     *  取得此向量在v向量上的投影向量
     *         /|
     *   this / |
     *       /  |
     *      --------  v
     *      ProjV
     */
    getProjV(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 取得此向量在v法线上的投影向量
     *
     *         /|
     *   this / | PerpV
     *       /  |
     *      --------
     *          v
     */
    getPerpV(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 将极坐标转为笛卡尔坐标，此方法修改自身
     *
     * @param len 半径长度
     * @param radians 弧度值 ,逆时针正角度
     * @param return 返回自身
     */
    fromPolar(len: number, radians: number): Vector2D;
    /**
     * 此向量转为极坐标输出
     * 返回单位为弧度，如需要角度 自行乘以MathConsts.RADIANS_TO_DEGREES
     *
     * @param out 如果为空会返回一个新Object
     * @returns {{r: number, radians: number}}
     */
    toPolar(out?: {
        len: number;
        radians: number;
    }): {
        len: number;
        radians: number;
    };
    /**
     * 按最大长度夹断，修改向量本身
     * @param max
     * @returns Vector2D
     */
    clampMax(max: number): Vector2D;
    /**
     * 绕原点旋转一个角度 ，逆时针为正，浮点数计算会有误差
     * @param angle  弧度值
     */
    rotate(angle: number, out?: Vector2D): Vector2D;
    /**
     * 绕某个点旋转
     * @param angle 弧度值
     * @param point
     */
    rotateAbout(angle: number, point: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 旋转一个向量表示的角度，与rotate方法类似，要注意如果v非单位向量则旋转后向量长度会改变
     * @param v
     */
    rotateByVector(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 根据入射角 = 反射角理论，计算此向量经过以法向量n表示的直线反射后得到的向量
     * ---------------------------
     * tail\  |  / head
     *      \ |n/
     *  head \|/ tail
     *   ------------
     * ---------------------------
     * @param n 单位法向量
     * @param result
     * @returns {Vector2D}
     */
    reflect(n: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 从另一个向量拷贝xy值，此方法修改自身
     */
    copyFrom(v: Vector2D): Vector2D;
    /**
     * 复制到目标向量
     */
    copyTo(out: Vector2D): void;
    /**
     * 重设x y值，此方法修改自身
     */
    reset(x?: number, y?: number): Vector2D;
    /**
     * (description)
     *
     * @returns {Vector2D} (description)
     */
    clone(): Vector2D;
    toString(): string;
}

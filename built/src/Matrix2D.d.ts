import { Vector2D } from './Vector2D';
export declare class Matrix2D {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    /**
     * 创建一个2D矩阵
     *
     * @param {number} [a=1] (description)
     * @param {number} [b=0] (description)
     * @param {number} [c=0] (description)
     * @param {number} [d=1] (description)
     * @param {number} [tx=0] (description)
     * @param {number} [ty=0] (description)
     */
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    /**
      * 创建一个新的矩阵，顺序执行 scale rotate 然后 translate
      *
      * @static
      * @param {number} [scaleX=1]
      * @param {number} [scaleY=1]
      * @param {number} [rotation=0]
      * @param {number} [tx=0]
      * @param {number} [ty=0]
      * @param {Matrix2D} [out]
      * @returns {Matrix2D}
      *
      * @memberOf Matrix2D
      */
    static SRT(scaleX?: number, scaleY?: number, rotation?: number, tx?: number, ty?: number, out?: Matrix2D): Matrix2D;
    /**
     * 创建缩放矩阵
     *
     * @static
     * @param {number} scaleX (description)
     * @param {number} scaleY (description)
     * @returns {Matrix2D} (description)
     */
    static FromScaling(scaleX: number, scaleY: number): Matrix2D;
    /**
     * 创建位置矩阵
     *
     * @static
     * @param {number} posX (description)
     * @param {number} posY (description)
     * @returns {Matrix2D} (description)
     */
    static FromTranslation(posX: number, posY: number): Matrix2D;
    /**
     * 创建旋转矩阵
     *
     * @static
     * @param {number} rad 弧度值
     * @returns {Matrix2D} (description)
     */
    static FromRotation(rad: number): Matrix2D;
    /**
     * 2D投影矩阵，直接投影为Canvas的宽高大小
     *
     * @static
     * @param {number} width canvas width
     * @param {number} height canvas height
     * @param {boolean} [flipY=true] 翻转Y轴，如果为true则(0,0)在canvas的左上角，并且rotation顺时针为正。
     * @returns (description)
     */
    static ProjectionMatrix(width: number, height: number, flipY?: boolean): Matrix2D;
    /**
     * 2*2矩阵行列式，非零则矩阵可逆
     * @returns {number}
     */
    readonly determinant: number;
    /**
     * identity
     *
     * @returns {Matrix2D}
     *
     * @memberOf Matrix2D
     */
    identity(): Matrix2D;
    /**
     * 添加一个移动变换
     *
     * @param {number} tx (description)
     * @param {number} ty (description)
     * @returns {Matrix2D} (description)
     */
    translate(tx: number, ty: number): Matrix2D;
    /**
     * 添加一个缩放变换
     *
     * @param {number} sx (description)
     * @param {number} sy (description)
     * @returns {Matrix2D} (description)
     */
    scale(sx: number, sy: number): Matrix2D;
    /**
     * 增加一个旋转变换
     *
     * @param {number} angle (弧度值)
     * @returns {Matrix2D} (description)
     */
    rotate(angle: number): Matrix2D;
    /**
     * 在此变换矩阵之前增加一个变换
     *
     * this = this * m
     *
     * @param {Matrix2D} m (description)
     * @returns {Matrix2D} (description)
     */
    prepend(m: Matrix2D): Matrix2D;
    /**
     * 后乘矩阵，在此变换矩阵之前增加一个变换
     *
     * this = this * m
     *
     * @memberOf Matrix2D
     */
    multiply: (m: Matrix2D) => Matrix2D;
    /**
     * 前乘一个矩阵，在此变换矩阵之后增加一个变换
     *
     *  this = m * this
     *
     * @param {Matrix2D} m (description)
     * @returns {Matrix2D} this
     */
    append(m: Matrix2D): Matrix2D;
    /**
     * 用此矩阵转换一个Vector2D表示的点
     *
     * @param {Vector2D} p (description)
     * @param {Vector2D} [out] (description)
     * @returns {Vector2D} (description)
     */
    transformPoint(p: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 用此矩阵转换一个向量(仅方向，不包含平移)
     *
     * @param {Vector2D} v (description)
     * @param {Vector2D} [out=undefined] (description)
     * @returns {Vector2D} (description)
     */
    transformVector(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 矩阵求逆
     *
     * @returns {Matrix2D} (description)
     */
    invert(): Matrix2D;
    /**
     * copyFrom
     *
     * @param {Matrix2D} m (description)
     * @returns {Matrix2D} 返回this
     */
    copyFrom(m: Matrix2D): Matrix2D;
    /**
     * copyTo
     *
     * @param {Matrix2D} out (description)
     */
    copyTo(out: Matrix2D): Matrix2D;
    /**
     * clone
     *
     * @returns {Matrix2D} (description)
     */
    clone(): Matrix2D;
    /**
     * 转为Float32Array
     * @param {boolean} [transpose=true] WebGL默认需要转置后的矩阵
     * @param {Float32Array} [out=undefined] (description)
     * @returns {Float32Array} (description)
     */
    toArray(transpose?: boolean, out?: Float32Array): Float32Array;
    /**
     * toString
     *
     * @returns {string} (description)
     */
    toString(): string;
}

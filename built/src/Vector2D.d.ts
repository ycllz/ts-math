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
     * @static
     * @param scale 向量长度，默认为1
     * @param out 省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     */
    static Random(scale?: number, out?: Vector2D): Vector2D;
    /**
     * 取得两向量之间夹角的弧度值，逆时针为正
     * @static
     * @param {Vector2D} v1
     * @param {Vector2D} v2
     * @returns {number} 两向量之间夹角，单位为弧度得
     *
     * @memberOf Vector2D
     */
    static AngleBetween(v1: Vector2D, v2: Vector2D): number;
    /**
     * 极坐标转换为笛卡尔坐标
     *
     * @static
     * @param {number} len 半径长度
     * @param {number} radians 弧度值
     * @returns
     *
     * @memberOf Vector2D
     */
    static fromPolar(len: number, radians: number): Vector2D;
    /**
     * 取向量长度
     * @type {number}
     * @memberOf Vector2D
     */
    /**
     * 设置向量长度
     * @memberOf Vector2D
     */
    length: number;
    /**
     * 取向量长度的平方，由于不用开方运算，效率更高
     * @readonly
     * @type {number}
     * @memberOf Vector2D
     */
    readonly squaredLength: number;
    /**
     * 是否为0向量
     * @readonly
     * @type {boolean}
     * @memberOf Vector2D
     */
    readonly isZero: boolean;
    /**
     * 向量相加
     *
     * @param {Vector2D} v
     * @param {Vector2D}   省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     * @returns {Vector2D} out = this + v
     *
     * @memberOf Vector2D
     */
    add(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 向量相减
     * @param {Vector2D} v
     * @param {Vector2D}   省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     * @return {Vector2D} out = this - v
     */
    subtract(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 向量相乘
     * @param {Vector2D} v
     * @param {Vector2D}  省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     * @returns {Vector2D} out = this multiply v
     *
     * @memberOf Vector2D
     */
    multiply(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 向量相除
     *
     * @param {Vector2D} v
     * @param {Vector2D}  省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     * @returns {Vector2D} out  = this / v
     *
     * @memberOf Vector2D
     */
    divide(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 缩放向量
     *
     * @param {number} s
     * @param {Vector2D}
     * @returns {Vector2D} out = this * s
     *
     * @memberOf Vector2D
     */
    scale(s: number, out?: Vector2D): Vector2D;
    /**
     * 基于某个点缩放
     * todo: 图形实例
     * @param {Vector2D} point 基于该点缩放
     * @param {number} sx (description)
     * @param {number} sy (description)
     * @param {Vector2D}  (description)
     * @returns {Vector2D} (description)
     */
    scaleAbout(point: Vector2D, sx: number, sy: number, out?: Vector2D): Vector2D;
    /**
     * 与缩放过的v相加
     * @param {Vector2D} v
     * @param {number} scale
     * @param {Vector2D}
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
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
    /**
     * x,y取负
     * @warning 该方法修改自身
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    negate(): Vector2D;
    /**
     * 转为单位向量,数学上经常在向量上加个小帽子表示 :)
     * @warning 修改自身
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    normalize(): Vector2D;
    /**
     * 点乘 结果等于|a||b|cos夹角
     * @param v
     * @returns {number}
     */
    dot(v: Vector2D): number;
    /**
     * 2d叉乘
     * 2d叉乘并不常见，与3d不同，结果是一个数值，相当于3d叉乘的z轴
     *
     * @param {Vector2D} v
     * @returns {number}
     *
     * @memberOf Vector2D
     */
    cross(v: Vector2D): number;
    /**
     * 返回左垂直向量
     *
     * @param {Vector2D}
     * @returns {Vector2D} 非单位向量
     *
     * @memberOf Vector2D
     */
    leftHandNormal(out?: Vector2D): Vector2D;
    /**
     * 返回右垂直向量
     *
     * @param {Vector2D}
     * @returns {Vector2D} 非单位向量
     *
     * @memberOf Vector2D
     */
    rightHandNormal(out?: Vector2D): Vector2D;
    /**
     * 将极坐标转为笛卡尔坐标，此方法修改自身
     *
     * @warning 修改自身
     * @param len 半径长度
     * @param radians 弧度值 ,逆时针正角度
     * @param return 返回自身
     */
    fromPolar(len: number, radians: number): Vector2D;
    /**
      * 将此向量转为极坐标输出
      *
      * @param {{ len: number; radians: number }} [out] 如果为空会返回一个新Object
      * @returns {{ len: number; radians: number }} 角度为弧度值表示
      *
      * @memberOf Vector2D
      */
    toPolar(out?: {
        len: number;
        radians: number;
    }): {
        len: number;
        radians: number;
    };
    /**
     * 按最大长度夹断
     *
     * @warning 修改本身
     * @param {number} max 最大长度
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    clampMax(max: number): Vector2D;
    /**
      * 绕原点旋转一个角度 ，逆时针为正，浮点数计算会有误差
      *
      * @param {number} radians 弧度值
      * @param {Vector2D} [out]
      * @returns {Vector2D} 旋转后的向量
      *
      * @memberOf Vector2D
      */
    rotate(radians: number, out?: Vector2D): Vector2D;
    /**
     * 绕某个点旋转
     * todo: example
     *
     * @param {number} radians 弧度值表示的角度
     * @param {Vector2D} point
     * @param {Vector2D} [out]
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    rotateAbout(radians: number, point: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 旋转一个向量表示的角度，与rotate方法类似，但节省了计算sin/cos所以效率更高
     * 要注意如果v非单位向量则旋转后向量长度会改变
     *
     * @param {Vector2D} v
     * @param {Vector2D} [out]
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    rotateByVector(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     *  取得此向量在v向量上的投影向量
     *
     * @param {Vector2D} v
     * @param {Vector2D} [out]
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    getProjV(v: Vector2D, out?: Vector2D): Vector2D;
    /**
      *
      * 取得此向量在v法线上的投影向量
      *
      * @param {Vector2D} v
      * @param {Vector2D} [out] 法向量
      * @returns {Vector2D}
      *
      * @memberOf Vector2D
      */
    getPerpV(v: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 根据入射角 = 反射角理论，计算此向量经过法向量反射后的向量
     * @param n 单位法向量
     * @param out 如果省略则返回全新向量
     * @returns {Vector2D} 反射后得到的向量
     */
    reflect(n: Vector2D, out?: Vector2D): Vector2D;
    /**
     * 从另一个向量拷贝xy值
     *
     * @warning 此方法修改自身
     * @param {Vector2D} v
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    copyFrom(v: Vector2D): Vector2D;
    /**
     * 复制到目标向量
     *
     * @param {Vector2D} out 目标向量
     *
     * @memberOf Vector2D
     */
    copyTo(out: Vector2D): void;
    /**
     * 重设x y值
     *
     * @warning 此方法修改自身
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    reset(x?: number, y?: number): Vector2D;
    /**
     * 复制一个向量
     *
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    clone(): Vector2D;
    /**
     * 输出字符串
     *
     * @returns {string}
     *
     * @memberOf Vector2D
     */
    toString(): string;
}

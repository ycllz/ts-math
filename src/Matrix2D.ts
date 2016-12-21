
import { Vector2D } from './Vector2D';

export class Matrix2D {

    public a: number;
    public b: number;
    public c: number;
    public d: number;

    public tx: number;
    public ty: number;

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
    public constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0) {

        // 使用矩阵后法列向量
        // |  a   b   tx |
        // |  c   d   ty |
        // |  0   0   1  |

        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }


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
    public static SRT(scaleX: number = 1, scaleY: number = 1, rotation: number = 0, tx: number = 0, ty: number = 0, out?: Matrix2D): Matrix2D {

        // let m: Matrix2D = new Matrix2D();
        // m.scale(scaleX, scaleY);
        // m.rotate(rotation);
        // m.translate(tx, ty);
        // return m;

        let cos: number = Math.cos(rotation);
        let sin: number = Math.sin(rotation);
        if (out) {
            out.a = cos * scaleX;
            out.b = -sin * scaleY;
            out.c = sin * scaleX;
            out.d = cos * scaleY;
            out.tx = tx;
            out.ty = ty;
            return out;
        }
        return new Matrix2D(cos * scaleX, -sin * scaleY, sin * scaleX, cos * scaleY, tx, ty);
    }


    /**
     * 创建缩放矩阵
     * 
     * @static
     * @param {number} scaleX (description)
     * @param {number} scaleY (description)
     * @returns {Matrix2D} (description)
     */
    public static FromScaling(scaleX: number, scaleY: number): Matrix2D {
        return new Matrix2D(scaleX, 0, 0, scaleY, 0, 0);
    }

    /**
     * 创建位置矩阵
     * 
     * @static
     * @param {number} posX (description)
     * @param {number} posY (description)
     * @returns {Matrix2D} (description)
     */
    public static FromTranslation(posX: number, posY: number): Matrix2D {
        return new Matrix2D(1, 0, 0, 1, posX, posY);
    };

    /**
     * 创建旋转矩阵
     * 
     * @static
     * @param {number} rad 弧度值
     * @returns {Matrix2D} (description)
     */
    public static FromRotation(rad: number): Matrix2D {
        let s: number = Math.sin(rad);
        let c: number = Math.cos(rad);
        return new Matrix2D(c, -s, s, c, 0, 0);
    };


    /**
     * 2D投影矩阵，直接投影为Canvas的宽高大小
     * 
     * @static
     * @param {number} width canvas width
     * @param {number} height canvas height
     * @param {boolean} [flipY=true] 翻转Y轴，如果为true则(0,0)在canvas的左上角，并且rotation顺时针为正。
     * @returns (description)
     */
    public static ProjectionMatrix(width: number, height: number, flipY: boolean = true) {
        if (flipY) {
            return new Matrix2D(2 / width, 0, 0, -2 / height, -1, 1);
        } else {
            return new Matrix2D(2 / width, 0, 0, 2 / height, -1, -1);
        }
    }

    /**
     * 2*2矩阵行列式，非零则矩阵可逆
     * @returns {number}
     */
    public get determinant(): number {
        return this.a * this.d - this.b * this.c;
    }

    /**
     * identity
     * 
     * @returns {Matrix2D}
     * 
     * @memberOf Matrix2D
     */
    public identity(): Matrix2D {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
        return this;
    }

    /**
     * 添加一个移动变换
     * 
     * @param {number} tx (description)
     * @param {number} ty (description)
     * @returns {Matrix2D} (description)
     */
    public translate(tx: number, ty: number): Matrix2D {
        //  1   0   tx     
        //  0   1   ty  *  原矩阵
        //  0   0   1     
        this.tx += tx;
        this.ty += ty;
        return this;
    }


    /**
     * 添加一个缩放变换
     * 
     * @param {number} sx (description)
     * @param {number} sy (description)
     * @returns {Matrix2D} (description)
     */
    public scale(sx: number, sy: number): Matrix2D {

        //  sx  0   0    
        //  0   sy  0  *  原矩阵
        //  0   0   1     

        this.a *= sx;
        this.b *= sx;
        this.c *= sy;
        this.d *= sy;
        this.tx *= sx;
        this.ty *= sy;

        return this;
    }

    /**
     * 增加一个旋转变换
     * 
     * @param {number} angle (弧度值)
     * @returns {Matrix2D} (description)
     */
    public rotate(angle: number): Matrix2D {

        // |  cos -sin  0|     
        // |  sin  cos  0|  *  原矩阵
        // |   0    0   1|     

        let cos: number = Math.cos(angle);
        let sin: number = Math.sin(angle);
        let _a: number = this.a;
        let _b: number = this.b;
        let _c: number = this.c;
        let _d: number = this.d;
        let _tx: number = this.tx;
        let _ty: number = this.ty;

        this.a = _a * cos - _c * sin;
        this.b = _b * cos - _d * sin;
        this.c = _a * sin + _c * cos;
        this.d = _b * sin + _d * cos;
        this.tx = _tx * cos - _ty * sin;
        this.ty = _tx * sin + _ty * cos;

        return this;
    }


    /**
     * 在此变换矩阵之前增加一个变换
     * 
     * this = this * m
     * 
     * @param {Matrix2D} m (description)
     * @returns {Matrix2D} (description)
     */
    public prepend(m: Matrix2D): Matrix2D {
        let _a: number = this.a;
        let _b: number = this.b;
        let _c: number = this.c;
        let _d: number = this.d;
        let _tx: number = this.tx;
        let _ty: number = this.ty;

        this.a = _a * m.a + _b * m.c;
        this.b = _a * m.b + _b * m.d;
        this.c = _c * m.a + _d * m.c;
        this.d = _c * m.b + _d * m.d;
        this.tx = _a * m.tx + _b * m.ty + _tx;
        this.ty = _c * m.tx + _d * m.ty + _ty;
        return this;
    }

    /**
     * 后乘矩阵，在此变换矩阵之前增加一个变换
     * 
     * this = this * m
     * 
     * @memberOf Matrix2D
     */
    public multiply = this.prepend;

    /**
     * 前乘一个矩阵，在此变换矩阵之后增加一个变换
     * 
     *  this = m * this
     * 
     * @param {Matrix2D} m (description)
     * @returns {Matrix2D} this
     */
    public append(m: Matrix2D): Matrix2D {
        let _a: number = this.a;
        let _b: number = this.b;
        let _c: number = this.c;
        let _d: number = this.d;
        let _tx: number = this.tx;
        let _ty: number = this.ty;

        this.a = m.a * _a + m.b * _c;
        this.b = m.a * _b + m.b * _d;
        this.c = m.c * _a + m.d * _c;
        this.d = m.c * _b + m.d * _d;
        this.tx = m.a * _tx + m.b * _ty + m.tx;
        this.ty = m.c * _tx + m.d * _ty + m.ty;

        return this;
    }

    /**
     * 用此矩阵转换一个Vector2D表示的点
     * 
     * @param {Vector2D} p (description)
     * @param {Vector2D} [out=undefined] (description)
     * @returns {Vector2D} (description)
     */
    public transformPoint(p: Vector2D, out: Vector2D = undefined): Vector2D {
        // |  a   b   tx |     x
        // |  c   d   ty |  *  y
        // |  0   0   1  |     1
        let nx: number = this.a * p.x + this.b * p.y + this.tx;
        let ny: number = this.c * p.x + this.d * p.y + this.ty;
        if (out === undefined) {
            return new Vector2D(nx, ny);
        }
        out.x = nx;
        out.y = ny;
        return out;
    }

    /**
     * 用此矩阵转换一个向量(仅方向，不包含平移)
     * 
     * @param {Vector2D} v (description)
     * @param {Vector2D} [out=undefined] (description)
     * @returns {Vector2D} (description)
     */
    public transformVector(v: Vector2D, out: Vector2D = undefined): Vector2D {
        // |  a   b   tx |     x
        // |  c   d   ty |  *  y
        // |  0   0   1  |     0
        let nx: number = this.a * v.x + this.b * v.y;
        let ny: number = this.c * v.x + this.d * v.y;
        if (out === undefined) {
            return new Vector2D(nx, ny);
        }
        out.x = nx;
        out.y = ny;
        return out;
    }

    /**
     * (description)
     * 
     * @returns {Matrix2D} (description)
     */
    // todo: 错的貌似
    public invert(): Matrix2D {
        let det: number = this.a * this.d - this.b * this.c;
        if (det !== 0) {
            det = 1 / det;
            let _a: number = this.a;
            let _b: number = this.b;
            let _c: number = this.c;
            let _d: number = this.d;
            let _tx: number = this.tx;
            let _ty: number = this.ty;

            this.a = _d * det;
            this.b = -_b * det;
            this.c = -_c * det;
            this.d = _a * det;
            this.tx = (_c * _ty - _d * _tx) * det;
            this.ty = (_b * _tx - _a * _ty) * det;

            return this;
        }
        return undefined;
    }


    /**
     * copyFrom
     * 
     * @param {Matrix2D} m (description)
     * @returns {Matrix2D} 返回this
     */
    public copyFrom(m: Matrix2D): Matrix2D {
        this.a = m.a;
        this.b = m.b;
        this.c = m.c;
        this.d = m.d;
        this.tx = m.tx;
        this.ty = m.ty;
        return this;
    }

    /**
     * copyTo
     * 
     * @param {Matrix2D} out (description)
     */
    public copyTo(out: Matrix2D): Matrix2D {
        out.a = this.a;
        out.b = this.b;
        out.c = this.c;
        out.d = this.d;
        out.tx = this.tx;
        out.ty = this.ty;
        return out;
    }

    /**
     * clone
     * 
     * @returns {Matrix2D} (description)
     */
    public clone(): Matrix2D {
        return new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
    }

    /**
     * 转为Float32Array
     * @param {boolean} [transpose=true] WebGL默认需要转置后的矩阵
     * @param {Float32Array} [out=undefined] (description)
     * @returns {Float32Array} (description)
     */
    public toArray(transpose: boolean = true, out: Float32Array = undefined): Float32Array {
        if (out === undefined) {
            out = new Float32Array(9);
        }

        // 很奇怪的是 webGL 默认需要这种格式的矩阵
        //
        // | a  c  0 |
        // | b  d  0 |
        // | tx ty 1 |
        //
        // 而我们的矩阵是
        //
        // | a  b  tx|
        // | c  d  ty|
        // | 0  0  1 |
        //
        // 所以默认需要转置

        if (transpose) {
            out[0] = this.a;
            out[1] = this.c;
            out[2] = 0;
            out[3] = this.b;
            out[4] = this.d;
            out[5] = 0;
            out[6] = this.tx;
            out[7] = this.ty;
            out[8] = 1;
        } else {
            out[0] = this.a;
            out[1] = this.b;
            out[2] = this.tx;
            out[3] = this.c;
            out[4] = this.d;
            out[5] = this.ty;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
        }

        return out;
    }
    /**
     * toString
     * 
     * @returns {string} (description)
     */
    public toString(): string {
        return "[Matrix2D] (a:" + this.a +
            " ,b:" + this.b +
            " ,c:" + this.c +
            " ,d:" + this.d +
            " ,tx:" + this.tx +
            " ,ty:" + this.ty +
            ")";
    }
}

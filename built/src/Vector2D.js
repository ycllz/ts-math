"use strict";
var Vector2D = (function () {
    function Vector2D(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    /**
     * 两点间线性插值
     * @param t t 为 0 ~ 1 之间的小数，为 0 则结果为 v1，为 1 则结果为 v2
     * @param out 省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     */
    Vector2D.Lerp = function (v1, v2, t, out) {
        if (t === void 0) { t = 0; }
        var nx = v1.x + (v2.x - v1.x) * t;
        var ny = v1.y + (v2.y - v1.y) * t;
        // same as
        // nx = v1.x * (1 - t) + v2.x * t;
        // ny = v1.y * (1 - t) + v2.y * t;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 返回一个指定长度的随机方向向量
     * @static
     * @param scale 向量长度，默认为1
     * @param out 省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     */
    Vector2D.Random = function (scale, out) {
        if (scale === void 0) { scale = 1; }
        var r = Math.random() * 2 * Math.PI;
        var nx = Math.cos(r) * scale;
        var ny = Math.sin(r) * scale;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 取得两向量之间夹角的弧度值，逆时针为正
     * @static
     * @param {Vector2D} v1
     * @param {Vector2D} v2
     * @returns {number} 两向量之间夹角，单位为弧度得
     *
     * @memberOf Vector2D
     */
    Vector2D.AngleBetween = function (v1, v2) {
        return Math.atan2(v1.cross(v2), v1.dot(v2)); //  tan = sin / cos
    };
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
    Vector2D.fromPolar = function (len, radians) {
        return new Vector2D(len * Math.cos(radians), len * Math.sin(radians));
    };
    Object.defineProperty(Vector2D.prototype, "length", {
        // getter
        // ------------------------------------------
        /**
         * 取向量长度
         * @type {number}
         * @memberOf Vector2D
         */
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        /**
         * 设置向量长度
         * @memberOf Vector2D
         */
        set: function (value) {
            var angle = Math.atan2(this.y, this.x);
            this.x = Math.cos(angle) * value;
            this.y = Math.sin(angle) * value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "squaredLength", {
        /**
         * 取向量长度的平方，由于不用开方运算，效率更高
         * @readonly
         * @type {number}
         * @memberOf Vector2D
         */
        get: function () {
            return this.x * this.x + this.y * this.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "isZero", {
        /**
         * 是否为0向量
         * @readonly
         * @type {boolean}
         * @memberOf Vector2D
         */
        get: function () {
            return ((this.x === 0) && (this.y === 0));
        },
        enumerable: true,
        configurable: true
    });
    // public methods
    // ----------------------------------------
    /**
     * 向量相加
     *
     * @param {Vector2D} v
     * @param {Vector2D}   省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     * @returns {Vector2D} out = this + v
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.add = function (v, out) {
        var nx = this.x + v.x;
        var ny = this.y + v.y;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 向量相减
     * @param {Vector2D} v
     * @param {Vector2D}   省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     * @return {Vector2D} out = this - v
     */
    Vector2D.prototype.subtract = function (v, out) {
        var nx = this.x - v.x;
        var ny = this.y - v.y;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 向量相乘
     * @param {Vector2D} v
     * @param {Vector2D}  省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     * @returns {Vector2D} out = this multiply v
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.multiply = function (v, out) {
        var nx = this.x * v.x;
        var ny = this.y * v.y;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 向量相除
     *
     * @param {Vector2D} v
     * @param {Vector2D}  省略则返回一个新创建的 Vector2D 否则复制到 out 向量
     * @returns {Vector2D} out  = this / v
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.divide = function (v, out) {
        var nx = this.x / v.x;
        var ny = this.y / v.y;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 缩放向量
     *
     * @param {number} s
     * @param {Vector2D}
     * @returns {Vector2D} out = this * s
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.scale = function (s, out) {
        var nx = this.x * s;
        var ny = this.y * s;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 基于某个点缩放
     * todo: 图形实例
     * @param {Vector2D} point 基于该点缩放
     * @param {number} sx (description)
     * @param {number} sy (description)
     * @param {Vector2D}  (description)
     * @returns {Vector2D} (description)
     */
    Vector2D.prototype.scaleAbout = function (point, sx, sy, out) {
        ///////////////////////////
        // |sx  0  px(1-sx)|     x
        // |0  sy  py(1-sy)|  *  y
        // |0   0      1   |     1
        ////////////////////////////
        var nx = sx * this.x + point.x * (1 - sx);
        var ny = sy * this.y + point.y * (1 - sy);
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 与缩放过的v相加
     * @param {Vector2D} v
     * @param {number} scale
     * @param {Vector2D}
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.scaleAndAdd = function (v, scale, out) {
        var nx = this.x + v.x * scale;
        var ny = this.y + v.y * scale;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 返回从此点到p2点之间的距离
     */
    Vector2D.prototype.distanceTo = function (p2) {
        var x = p2.x - this.x;
        var y = p2.y - this.y;
        return Math.sqrt(x * x + y * y);
    };
    /**
     * 此点到p2距离的平方
     */
    Vector2D.prototype.squaredDistanceTo = function (p2) {
        var x = p2.x - this.x;
        var y = p2.y - this.y;
        return x * x + y * y;
    };
    /**
     * x,y取负
     * @warning 该方法修改自身
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    /**
     * 转为单位向量,数学上经常在向量上加个小帽子表示 :)
     * @warning 修改自身
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.normalize = function () {
        var len = this.x * this.x + this.y * this.y;
        if (len === 0) {
            this.x = 1;
            this.y = 0;
        }
        else {
            len = 1 / Math.sqrt(len);
            this.x *= len;
            this.y *= len;
        }
        return this;
    };
    // ----------------------点乘的性质--------------------------//
    // a点乘b == 0 ，两向量垂直
    // a点乘b > 0 ，同向（夹角小于90度）
    // a点乘b < 0 ,反向（夹角大于90度）
    // a点乘b ==  length(a) * length(b)，共线且同向 (如果a与b都为单位向量则等于 +1)
    // a点乘b == -length(a) * length(b) ,共线且逆向（如果a与b都为单位向量则等于 -1）
    // a点乘a == a长度的平方
    // --------------------------------------------------------//
    /**
     * 点乘 结果等于|a||b|cos夹角
     * @param v
     * @returns {number}
     */
    Vector2D.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    // ----------------------2d cross--------------------------//
    //
    //    http://allenchou.net/2013/07/cross-product-of-2d-vectors/
    //
    //    the sign of the cross product of 2D vectors tells you whether the second vector is on the left or right side of the first vector .
    //
    // not the most efficient implementation
    //   float cross(const Vec2 &a, const Vec2 &b)
    //    {
    ////       Vec3 v1(a.x, a.y, 0.0f);
    ////       Vec3 v2(b.x, b.y, 0.0f);
    //
    //        return cross(v1, v2).z;
    //    }
    //
    // --------------------------------------------------------//
    /**
     * 2d叉乘
     * 2d叉乘并不常见，与3d不同，结果是一个数值，相当于3d叉乘的z轴
     *
     * @param {Vector2D} v
     * @returns {number}
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.cross = function (v) {
        return this.x * v.y - this.y * v.x;
    };
    /**
     * 返回左垂直向量
     *
     * @param {Vector2D}
     * @returns {Vector2D} 非单位向量
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.leftHandNormal = function (out) {
        var nx = -this.y;
        var ny = this.x;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 返回右垂直向量
     *
     * @param {Vector2D}
     * @returns {Vector2D} 非单位向量
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.rightHandNormal = function (out) {
        var nx = this.y;
        var ny = -this.x;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    /**
     * 将极坐标转为笛卡尔坐标，此方法修改自身
     *
     * @warning 修改自身
     * @param len 半径长度
     * @param radians 弧度值 ,逆时针正角度
     * @param return 返回自身
     */
    Vector2D.prototype.fromPolar = function (len, radians) {
        this.x = len * Math.cos(radians);
        this.y = len * Math.sin(radians);
        return this;
    };
    /**
      * 将此向量转为极坐标输出
      *
      * @param {{ len: number; radians: number }} [out] 如果为空会返回一个新Object
      * @returns {{ len: number; radians: number }} 角度为弧度值表示
      *
      * @memberOf Vector2D
      */
    Vector2D.prototype.toPolar = function (out) {
        var len = Math.sqrt(this.x * this.x + this.y * this.y);
        var radians = Math.atan2(this.y, this.x);
        if (out) {
            out.len = len;
            out.radians = radians;
            return out;
        }
        return { len: len, radians: radians };
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
    Vector2D.prototype.clampMax = function (max) {
        var l = Math.sqrt(this.x * this.x + this.y * this.y);
        if (l > max) {
            l = max / l;
            this.x *= l;
            this.y *= l;
        }
        return this;
    };
    /**
      * 绕原点旋转一个角度 ，逆时针为正，浮点数计算会有误差
      *
      * @param {number} radians 弧度值
      * @param {Vector2D} [out]
      * @returns {Vector2D} 旋转后的向量
      *
      * @memberOf Vector2D
      */
    Vector2D.prototype.rotate = function (radians, out) {
        // （矩阵乘法） 
        ////////////////////////////////
        //  |cos  -sin  0|      x
        //  |sin   cos  0|  *   y
        //  | 0     0   1|      1
        ////////////////////////////////
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var _x = this.x;
        var _y = this.y;
        var nx = _x * cos - _y * sin;
        var ny = _x * sin + _y * cos;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
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
    Vector2D.prototype.rotateAbout = function (radians, point, out) {
        if (!out) {
            out = new Vector2D();
        }
        // todo:inline
        this.subtract(point, out).rotate(radians, out);
        out.x += point.x;
        out.y += point.y;
        return out;
    };
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
    Vector2D.prototype.rotateByVector = function (v, out) {
        var _x = this.x;
        var _y = this.y;
        var nx = _x * v.x - _y * v.y;
        var ny = _x * v.y + _y * v.x;
        if (out) {
            out.x = nx;
            out.y = ny;
            return out;
        }
        return new Vector2D(nx, ny);
    };
    // todo: 下边3个方法需要实例
    /**
     *  取得此向量在v向量上的投影向量
     *
     * @param {Vector2D} v
     * @param {Vector2D} [out]
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.getProjV = function (v, out) {
        //
        //         /|
        //   this / | 
        //       /  |
        //      --------  v
        //      ProjV
        //
        // -------------------------
        //
        //     |a||b|cos
        //    ----------- b
        //       |b|^2
        var dp = this.x * v.x + this.y * v.y; // this.dot(v)
        var f = dp / (v.x * v.x + v.y * v.y); // divide by |b|^2
        if (out) {
            out.x = f * v.x;
            out.y = f * v.y;
            return out;
        }
        return new Vector2D(f * v.x, f * v.y); // multiply by b
    };
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
    Vector2D.prototype.getPerpV = function (v, out) {
        //---------------------------------
        //           /|
        //     this / | PerpV
        //         /  |
        //        --------
        //            v
        // --------------------------------
        // var v:Vector2D = this.getProjV(v);
        // return this.subtract(v,result);
        var dp = this.x * v.x + this.y * v.y; // this.dot(v)
        var f = dp / (v.x * v.x + v.y * v.y); // divide by |b|^2
        var vx = f * v.x;
        var vy = f * v.y;
        if (out) {
            out.x = this.x - vx;
            out.y = this.y - vy;
            return out;
        }
        return new Vector2D(this.x - vx, this.y - vy);
    };
    /**
     * 根据入射角 = 反射角理论，计算此向量经过法向量反射后的向量
     * @param n 单位法向量
     * @param out 如果省略则返回全新向量
     * @returns {Vector2D} 反射后得到的向量
     */
    Vector2D.prototype.reflect = function (n, out) {
        //  ---------------------------
        //  tail\  |  / head
        //       \ |n/
        //   head \|/ tail
        //    ------------
        //  --------------------------  
        if (!out) {
            out = new Vector2D();
        }
        // v = u - 2(u.n)n
        return this.subtract(n.scale((2 * this.dot(n))), out);
        // todo: inline
    };
    /**
     * 从另一个向量拷贝xy值
     *
     * @warning 此方法修改自身
     * @param {Vector2D} v
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.copyFrom = function (v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    };
    /**
     * 复制到目标向量
     *
     * @param {Vector2D} out 目标向量
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.copyTo = function (out) {
        out.x = this.x;
        out.y = this.y;
    };
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
    Vector2D.prototype.reset = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        return this;
    };
    /**
     * 复制一个向量
     *
     * @returns {Vector2D}
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.clone = function () {
        return new Vector2D(this.x, this.y);
    };
    /**
     * 输出字符串
     *
     * @returns {string}
     *
     * @memberOf Vector2D
     */
    Vector2D.prototype.toString = function () {
        return "[Vector2D] (x:" + this.x + " ,y:" + this.y + ")";
    };
    return Vector2D;
}());
exports.Vector2D = Vector2D;
//# sourceMappingURL=Vector2D.js.map
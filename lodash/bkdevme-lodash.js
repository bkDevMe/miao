var bkdevme = {
    /**
     * 创建一个新数组，包含原数组中所有的非假值元素。
     * 例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。
     *
     * @return  {[type]}  过滤后的数组
     */
    compact: function (ary) {
        return ary.filter(it => it)
    },
    /**
     * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。
     *  如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
     *
     * @return  {[array]}  分割后的数组
     */
    chunk: function (ary, size = 1) {
        if (ary.length == 0) return []
        let start = 0
        let resIndex = 0
        const result = new Array(Math.ceil(ary.length / size))

        while (start < ary.length) {
            result[resIndex++] = ary.slice(start, start += size)
        }
        return result
    },
    /**
     * 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。
     * （即创建一个新数组，这个数组中的值，为第一个数字（array 参数）排除了给定数组中的值。）该方法使用 SameValueZero做相等比较。
     * 结果值的顺序是由第一个数组中的顺序确定。 
     *
     * @return  {[array]}  过滤后的新数组
     */
    difference: function (array, ...values) {
        let restVal = []
        for (let i = 0; i < values.length; i++) {
            restVal.push(...values[i])
        }
        return array.filter(it => !restVal.includes(it))
    },
    /**
     * 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
     *
     * @return  {[array]}  返回array剩余切片。
     */
    drop: function (array, n = 1) {
        // return array.slice(n)
        const length = array == null ? 0 : array.length
        return length ? array.slice(n < 0 ? 0 : n, length) : []
    },
    /**
     * 创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）
     *
     * @return  {[array]}  返回array剩余切片。
     */
    dropRight: function (array, n = 1) {
        if (n >= array.length) return []
        else if (n == 0) return array
        else {
            return array.slice(0, array.length - n)
        }
    },
    differenceBy: function () {

    },
    dropRightWhile: function (array, f) {
        return array.filter(f);
    },
    /**
     * 减少一级array嵌套深度。
     *
     * @return  {[type]}  返回减少嵌套层级后的新数组。
     */
    flatten: function (array) {
        const result = []
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                result.push(...array[i])
            } else {
                result.push(array[i])
            }
        }
        return result
    },
    /**
     * 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
     *
     * @return  {[type]}  [return description]
     */
    fill: function (array, value, start = 0, end = array.length) {
        for (let i = start; i < end; i++)
            array[i] = value
        return array
    },
    /**
     * 将array递归为一维数组。
     *
     * @return  {[type]}  返回一个的新一维数组。
     */
    flattenDeep: function (array) {
        let result = []
        for (let item of array) {
            if (Array.isArray(item)) {
                let flattenItem = this.flattenDeep(item)
                result.push(...flattenItem)
            } else {
                result.push(item)
            }
        }
        return result
    },
    /**
     * 根据 depth 递归减少 array 的嵌套层级
     *
     * @return  {array}  返回减少层级嵌套后的新数组
     */
    flattenDepth: function (array, depth = 1) {
        if (depth == 0) return array.slice()
        let result = []
        for (let ary of array) {
            if (Array.isArray(ary)) {
                let flattenItem = this.flattenDepth(ary, depth - 1)
                result.push(...flattenItem)
            } else {
                result.push(ary)
            }
        }
        return result
    },
    /**
     * 执行一个深度比较，来确定 object 是否含有和 source 完全相等的属性值。 
     *
     * @return  {boolean}  如果object匹配，那么返回 true，否则返回 false。
     */
    isMatch: function (obj, src) {
        if (obj === src) return true
        for (let key in src) {
            if (typeof src[key] == 'object' && src[key] !== null) {
                if (!this.isMatch(obj[key], src[key])) {
                    return false
                }
            } else {
                if (obj[key] != src[key]) {
                    return false
                }
            }
        }
        return true
    },
    /**
     * 创建一个深比较的方法来比较给定的对象和 source 对象。 
     * 如果给定的对象拥有相同的属性值返回 true，否则返回 false。 
     *
     * @return  {function }  返回新函数
     */
    matches: function (src) {
        return function (obj) {
            return this.isMatch(obj, src)
        }
    },
    /**
     * 转化 value 为属性路径的数组 。
     *
     * @return  {array}  返回包含属性路径的数组。
     */
    toPath: function (str) {
        return str.split(/\.|\[|\]\./g)
    },

    /**
     * 根据 object对象的path路径获取值。 
     * 如果解析 value 是 undefined 会以 defaultValue 取代。
     * 
     * @param {obj} 要检索的对象
     * @param {path (Array | string)} 要获取属性的路径
     * @param {[defaultValue] (*)} 如果解析值是undefined,这值会被返回 
     * @return {*} 返回解析的值
     */
    /** */
    get: function (obj, path, defaultValue) {
        path = this.toPath(path)
        for (let i = 0; i < path.length; i++) {
            if (obj === undefined) return defaultValue
            obj = obj[path[i]]
        }
        return obj
    },
    /**
     * 创建一个调用func的函数，thisArg绑定func函数中的 this (this的上下文为thisArg) ，并且func函数会接收partials附加参数。 
     *  _.bind.placeholder值，默认是以 _ 作为附加部分参数的占位符。 
     * 
     * @param {Function} func 绑定的函数 
     * @param {*} thisArg func绑定的this对象
     * @param  {...any} fixedArgs  附加的部分参数
     * 
     * @return {Function} 返回新的绑定函数
     */
    bind: function (func, thisArg, ...fixedArgs) {
        return function (...args) {
            let acturalArgs = [...fixedArgs]
            for (let i = 0; i < acturalArgs.length; i++) {
                if (acturalArgs[i] === window) {
                    acturalArgs[i] = args.shift()
                }
            }
            acturalArgs.push(...args)
            return func.apply(thisArg, acturalArgs)
        }
    },
    /**
     * 创建一个返回给定对象的 path 的值的函数。
     *
     * @param {Array | string} path:要得到值的属性路径
     * @return  {Function}  返回新的函数
     */
    property: function (path) {
        return function (obj) {
            return this.get(obj, path)
        }
    },
    matchesProperty: function (path, value) {
        return function (obj) {
            return isEqual(get(obj, path), value)
        }
    },
    /**
     * 这个方法返回首个提供的参数。
     * @param {*} value : 任意值
     * @return  {*}  返回value
     */
    identity: function (value) {
        return value
    },
    /**
     * 获取数组 array 的第一个元素。
     *
     * @param  {Array} array: 要查询的数组。
     * @return  {[type]}  [return description]
     */
    head: function (array) {
        if (!array.length) return undefined
        else return array[0]
    },
    /**
     * 使用 SameValueZero 等值比较，返回首次 value 在数组array中被找到的 索引值， 
     * 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。
     * 
     * @param {Array} array : 需要查找的数组 
     * @param {*} value 需要查找的值 
     * @param {number} fromIndex 开始查询的位置 
     * 
     * @return {number}  返回 值value在数组中的索引位置, 没有找到为返回-1。
     */
    indexOf: function (array, value, fromIndex = 0) {
        if (Array.isArray(array)) {
            fromIndex = fromIndex >= 0 ? fromIndex : fromIndex + array.length
            for (let i = fromIndex; i < array.length; i++) {
                if (this.sameValueZero(array[i], value)) return i
            }
            return -1
        } else {
            return -1
        }
    },
    /**
     * 获取数组array中除了最后一个元素之外的所有元素（去除数组array中的最后一个元素）。
     * 
     * @param {Array} array 要查询的数组。
     * 
     * @return {Array} 返回截取后的数组array。
     */
    initial: function (array) {
        if (Array.isArray(array)) {
            return array.slice(0, -1)
        } else {
            return []
        }
    },
    /**
     * 将 array 中的所有元素转换为由 separator 分隔的字符串。
     * @param {Array} array 要转换的数组
     * @param {string} separator 分隔元素
     * 
     * @return {string}  返回连接字符串
     */
    join: function (array, separator = ',') {
        return array == null ? '' : Array.prototype.join.call(array, separator);
    },
    /**
     * 获取array中的最后一个元素。
     * @param {Array} array : 要检索的数组。 
     * 
     * @return {*} 返回array中最后一个元素
     */
    last: function (array) {
        let length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined;
    },
    /** 四种相等比较算法 
     *  1. ==
     *  2. === | 0 === -0 ; NaN != NaN;
     *  3. SameValue() 0 !== -0 ; NaN === NaN Object.is()实现此功能
     *  4. SameValueZero() 0 === -0 ; NaN === NaN 暂时没有api单独实现此功能 , Map,Set,Array.prototype.includes()实现这一接口
     * @param {*} x 待比较的值 
     * @param {*} y 待比较的值
     * 
     * @return {boolean} 
     */
    sameValueZero: function (x, y) {
        if (Object.is(x, y)) {
            return true
        } else if (x == 0 || x == -0) {
            return x === y
        }
        return false
    },
    /**
     * 调用 iteratee 遍历 collection(集合) 中的每个元素， iteratee 调用3个参数： (value, index|key, collection)。 
     * 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。 
     *
     * @param   {Array | Object}  collection： 一个用来迭代的集合 
     * @param   {Function}  iteratee：每次迭代调用的函数    
     *
     * @return  {*} 返回集合collection    
     */
    forEach: function (collection, iteratee) {
        let type = Object.prototype.toString(collection)
        if (type === '[object Array]') {
            for (let i = 0; i < collection.length; i++) {
                if (iteratee(collection[i], i, collection) === false) break;
            }
            return collection
        } else if (type === '[object Object]') {
            for (const key in collection) {
                if (collection.hasOwnProperty(key)) {
                    const value = collection[key];
                    if (iteratee(value, key, collection) === false) break;
                }
            }
            return collection
        }
        return collection
    },
    /**
     * 这个方法类似 _.indexOf ，区别是它是从右到左遍历array的元素。
     *
     * @param   {Array}  array      要搜索的数组。
     * @param   {[type]}  value      : 要搜索的值。
     * @param   {number}  fromIndex  开始搜索的索引值。
     *
     * @return  {number}             返回匹配值的索引值，否则返回 -1。
     */
    lastIndexOf: function (array, value, fromIndex) {
        let type = Array.prototype.toString.call(array)
        if (type === '[object Array]') {
            if (fromIndex == undefined) fromIndex = array.length - 1
            for (let i = fromIndex; fromIndex >= 0; i--) {
                if (this.sameValueZero(array[i], value)) return i
            }
            return -1
        }
        return -1
    },
    /**
     * 获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。
     *
     * @param   {Array}  array  查找的数组
     * @param   {number}  n      返回元素的soyb
     *
     * @return  {*}         获取aray数组的第n个元素
     */
    nth: function (array, n = 0) {
        return array[n]
    },
    

}
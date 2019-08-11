var bkdevme = {
    compact: function (ary) {
        return ary.filter(it => it)
    },
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
    difference: function (array, ...values) {
        let restVal = []
        for (let i = 0; i < values.length; i++) {
            restVal.push(...values[i])
        }
        return array.filter(it => !restVal.includes(it))
    },
    drop: function (array, n = 1) {
        // return array.slice(n)
        const length = array == null ? 0 : array.length
        return length ? array.slice(n < 0 ? 0 : n, length) : []
    },
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
    fill: function (array, value, start = 0, end = array.length) {
        for (let i = start; i < end; i++)
            array[i] = value
        return array
    },
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
    matches: function (src) {
        return function (obj) {
            return this.isMatch(obj, src)
        }
    },
    toPath: function (str) {
        return str.split(/\.|\[|\]\./g)
    },
    get: function (obj, path, defaultValue) {
        path = this.toPath(path)
        for (let i = 0; i < path.length; i++) {
            if (obj === undefined) return defaultValue
            obj = obj[path[i]]
        }
        return obj
    },
    bind: function (f, thisArg, ...fixedArgs) {
        return function (...args) {
            let acturalArgs = [...fixedArgs]
            for (let i = 0; i < acturalArgs.length; i++) {
                if (acturalArgs[i] === window) {
                    acturalArgs[i] = args.shift()
                }
            }
            acturalArgs.push(...args)
            return f.apply(thisArg, acturalArgs)
        }
    },
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
    identity: function (value) {
        return value
    },
    head: function (array) {
        if (!array.length) return undefined
        else return array[0]
    },
    indexOf: function (array, value, fromIndex = 0) {
        if (Array.isArray(array)) {
            fromIndex = fromIndex >= 0 ? fromIndex : fromIndex + array.length
            for (let i = fromIndex; i < array.length; i++) {
                if (array[i] == value) return i
            }
            retrun - 1
        } else {
            return -1
        }
    },
    initial: function (array) {
        if (Array.isArray(array)) {
            return array.slice(0, -1)
        } else {
            return []
        }
    }

}
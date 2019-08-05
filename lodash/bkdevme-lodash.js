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
        return array.filter(it => !values.includes(it))
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
                result.push(array[i])
            } else {
                result.push(array[i])
            }
        }
        return result
    }
}
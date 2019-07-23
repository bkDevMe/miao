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
        return array.slice(n)
    },
    dropRight: function (array, n = 1) {
        return array.slice(-n)
    }
}
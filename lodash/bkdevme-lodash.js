var bkdevme = {
    compact: function(ary) {
        return ary.filter(it => it)
    },
    chunk: function(ary,[size = 1]) {
        if(ary.length == 0) return []
        let result = []
        let start = 0
        while(start < ary.length) {
            let temp = []
            if(start + size > ary.length) break
            for(let i = start; i < start + size;i++ ) 
                temp.push(ary[i])
            result.push(temp)
            start = start + size
        }
        let temp = []
        for(let i = start; i < ary.length; i++) {
            temp.push(ary[i])
        }
        result.push(temp)
        return result
    }
}

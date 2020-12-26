export default {
    arrayEqual(x, y) {
        if (!Array.isArray(x)) return false;
        if (!Array.isArray(y)) return false;
        if (x.length != y.length) return false;
        for (const item of x) {
            if (!y.includes(item)) return false;
        }
        return true;
    },
    recruitmentsEqual(x, y) {
        // TODO: numberも考慮する
        // kindの相当のみを考慮する
        const a = x.map(item => item.kind);
        const b = y.map(item => item.kind);
        return this.arrayEqual(a, b);
    },
    // 数値配列の平均値を計算
    calcArrayMean(arr) {
        const sum = arr.reduce((s, e) => s + e);
        const mean = sum / arr.length;
        return mean;
    },
}
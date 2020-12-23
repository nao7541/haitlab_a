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
    // 数値配列の平均値を計算
    calcArrayMean(arr) {
        const sum = arr.reduce((s, e) => s + e);
        const mean = sum / arr.length;
        return mean;
    },
}
export default {
    setUserData(state, payload) {
        state.myUserData.userId = payload.userId;
        state.myUserData.username = payload.username;
    },
    setTags(state, payload) {
        state.myTags = payload;
    },
    addEventStock(state, payload) {
        // もし未ストックであるなら追加する
        if (!state.myEventStocks) {
            state.myEventStocks.push(payload);
        }
    },
    removeEventStock(state, payload) {
        // もしストックしていたら消す
        if (state.myEventStocks.includes(payload)) {
            state.myEventStocks.splice(state.myEventStocks.indexOf(payload), 1);
        }
    }
};
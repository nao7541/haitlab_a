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
        // 追加するのはevent_idである点に注意
        if (!state.myEventIDs.includes(payload)) {
            state.myEventIDs.push(payload);
        }
    },
    removeEventStock(state, payload) {
        // もしストックしていたら消す
        if (state.myEventIDs.includes(payload)) {
            state.myEventIDs.splice(state.myEventIDs.indexOf(payload), 1);
        }
    }
};
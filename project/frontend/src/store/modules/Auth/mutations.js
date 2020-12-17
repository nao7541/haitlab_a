import apiHelper from "../../../services/apiHelper";

export default {
    setUser(state, payload) {
        state.userId = payload.userId;
        state.token = payload.token;
        state.isLoggedIn = true;
    },
    clear(state) {
        state.userId = null;
        state.token = null;
        state.isLoggedIn = false;
    },
    loginSetup(state, payload) {
        apiHelper.loadStockEvents(payload.myUserId)
        .then( res => {
            payload.myData = res;
        }).catch ( err => {
            console.log("fail to login setup for stock events: ", err);
        })
    }
};
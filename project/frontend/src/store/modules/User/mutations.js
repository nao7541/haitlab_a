export default {
    setUserDetail(state, payload) {
        state.userDetail = {
            user_id: payload.user_id,
            username: payload.username,
            email: payload.email,
            prof_img: payload.prof_img,
            intro: payload.intro,
            univ_name: payload.univ_name,
            major: payload.major,
        };
    }
};
export default {
    setEvents(state, payload) {
        if (payload.events === null) return;

        state.events = [];
        for (const event of payload) {
            state.events.push(event);
        }
    }
};
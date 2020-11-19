export default {
    registerIdea(context, data) {
        const newIdea = {
            idea_title: data.title,
            idea_str: data.overview,
            
        };
        context.commit('registerIdea', newIdea);
    },
    registerRequiredSkill(context, data) {
        const newSkill = {
            idea_id: data.id,
            skill_name: data.skill
        };
        
        context.commit('registerRequiredSkill', newSkill);
    }
};
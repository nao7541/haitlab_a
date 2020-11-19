import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
    namespaced: true,
    state() {
        return {
            ideas: [
                {
                    idea_id: 0,
                    user_id: 0,
                    idea_title: 'ロボットによる介護サービス',
                    idea_str: 'ロボットによる介護サービス',
                    idea_date: '2020-11-14',
                },
                {
                    idea_id: 1,
                    user_id: 0,
                    idea_title: '薬の宅配サービス',
                    idea_str: '薬の宅配サービス',
                    idea_date: '2020-11-14',
                },
                {
                    idea_id: 2,
                    user_id: 1,
                    idea_title: 'AI企業評価サービス',
                    idea_str: 'AI企業評価サービス',
                    idea_date: '2020-11-14',
                },
                {
                    idea_id: 3,
                    user_id: 1,
                    idea_title: 'AIによる古文翻訳サービス',
                    idea_str: 'AIによる古文翻訳サービス',
                    idea_date: '2020-11-14',
                },
                {
                    idea_id: 4,
                    user_id: 2,
                    idea_title: '店の混雑状況提示アプリの開発',
                    idea_str: '店の混雑状況提示アプリの開発',
                    idea_date: '2020-11-14',
                },
                {
                    idea_id: 5,
                    user_id: 2,
                    idea_title: '方言翻訳サービス',
                    idea_str: '方言翻訳サービス',
                    idea_date: '2020-11-14',
                },
            ],
            requiredSkills: [
                {
                    skill_id: 0,
                    idea_id: 0,
                    skill_name: 'business'
                },
                {
                    skill_id: 1,
                    idea_id: 0, 
                    skill_name: 'design',
                },
                {
                    skill_id: 2,
                    idea_id: 1,
                    skill_name: 'ios app'
                },
                {
                    skill_id: 3,
                    idea_id: 2, 
                    skill_name: 'design',
                },   
                {
                    skill_id: 4,
                    idea_id: 3,
                    skill_name: 'ios app'
                },
                {
                    skill_id: 5,
                    idea_id: 3, 
                    skill_name: 'android app',
                },
                {
                    skill_id: 6,
                    idea_id: 4,
                    skill_name: 'business'
                },
                {
                    skill_id: 7,
                    idea_id: 5, 
                    skill_name: 'business',
                },
            ],
            comments: [
                {
                    comment_id: 0,
                    idea_id: 0,
                    user_id: 1,
                    comment_date: '2020-11-14',
                    comment: '凄い！面白いですね！'
                },
                {
                    comment_id: 1,
                    idea_id: 0,
                    user_id: 2,
                    comment_date: '2020-11-14',
                    comment: 'この考えは思いつきませんでした！'
                },
            ],
        }
    },
    getters,
    mutations,
    actions,
};
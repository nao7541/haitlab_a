import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
    namespaced: true,
    state() {
        return {
            users: [
                {
                    user_id: 0,
                    username: 'Tanaka',
                    intro: '田中です。よろしくお願いします。',
                    univ_name: 'Hait大学',
                    major: '情報学部',
                    prof_img: '../assets/images/avatar1.png',
                    contact: 'tanaka@example.com',
                },
                {
                    user_id: 1,
                    username: 'Yamada',
                    intro: '山田です。よろしくお願いします。',
                    univ_name: 'Hait大学',
                    major: 'デザイン学科',
                    prof_img: '../assets/images/avatar2.png',
                    contact: 'yamada@example.com',
                },
                {
                    user_id: 2,
                    username: 'Satoh',
                    intro: '佐藤です。よろしくお願いします。',
                    univ_name: 'Hait大学',
                    major: '理学部',
                    prof_img: '../assets/images/avatar3.png',
                    contact: 'sato@example.com',
                },
            ],
            tags: [
                {
                    tag_id: 0,
                    user_id: 0, 
                    tag_name: 'business',
                },
                {
                    tag_id: 1,
                    user_id: 1,
                    tag_name: 'web design',
                },
                {
                    tag_id: 2,
                    user_id: 1,
                    tag_name: 'graphic design'
                },
                {
                    tag_id: 3,
                    user_id: 2,
                    tag_name: 'ios app',
                },
                {
                    tag_id: 4,
                    user_id: 2,
                    tag_name: 'android app',
                }
            ],
            interests: [
                {
                    interest_id: 0,
                    user_id: 0, 
                    interest_name: 'business',
                },
                {
                    interest_id: 1,
                    user_id: 1,
                    interest_name: 'design',
                },
                {
                    interest_id: 2,
                    user_id: 2,
                    interest_name: 'engineer'
                },
            ],
        }
    },
    getters,
    mutations,
    actions,
};
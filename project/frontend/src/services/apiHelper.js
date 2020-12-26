import api from '@/services/api.js';

export default {
    // ------------------------------ User ------------------------------ //
    async loadUserDetailByName(username) {
        const url = '/users/?username=' + username;
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData[0];
    },
    async loadUserDetail(userId) {
        // userIdをキーとしてuserの詳細情報を取得
        const url = '/users/' + userId + '/';
        const response = await api.get(url);
        const userDetail = await response.data;

        return userDetail;
    },
    async updateUserDetail(userData) {
        const url = '/users/' + userData.userId + '/';
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('intro', userData.intro);
        formData.append('univ_name', userData.univ_name);
        formData.append('major', userData.major);
        formData.append('portfolio', userData.portfolio);

        // 画像はnullでない場合のみ更新する
        if (userData.prof_img !== null) {
            formData.append('prof_img', userData.prof_img);
        }
        
        const response = await api.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }});
        return response;
    },
    async loadAllUsers() {
        const url = '/users/';
        const response = await api.get(url);
        const responseData = await response.data;
        
        return responseData;
    },
    async authUser(url, data) {
        // 新規登録、ログインどちらもここで行う
        let response = await api.post(url, data);
        let responseData = await response.data;

        return responseData;
    },
    async follow(userId, followUserId) {
        const url = '/user_following/';
        const response = await api.post(url, {
            user_id: userId,
            following_user_id: followUserId
        });
        const responseData = await response.data;

        return responseData;
    },
    // パラメータに渡されたユーザーがフォローしている人を一括で読み込み
    async loadFollowingUsers(userId) {
        const url = '/users/' + userId + '/';
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData.following;
    },
    // パラメータに渡されたユーザーのフォロワーの数を一括で読み込み
    async loadFollowers(userId) {
        const url = '/users/' + userId + '/';
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData.followers;
    },
    async checkFollowing(userId, followUserId) {
        const url = '/user_following/?user_id=' + userId + '&following_user_id=' + followUserId;
        const response = await api.get(url);
        const responseData = await response.data;

        // フォローしていたらtrue, していなかったらfalse
        return responseData.length > 0 ? true : false;
    },
    async stopFollowing(userId, followUserId) {
        let url = '/user_following/?user_id=' + userId + '&following_user_id=' + followUserId;
        let response = await api.get(url);
        let responseData = await response.data;
        
        url = '/user_following/' + responseData[0].relation_id + '/';
        response = await api.delete(url);
        responseData = await response.data;

        return responseData;
    },

    // ------------------------------ Idea ------------------------------ //
    async loadIdeaDetail(ideaId) {
        // ideaIdをキーとしてideaの詳細情報を取得
        const url = '/ideas/' + ideaId + '/';
        const response = await api.get(url);
        const ideaDetail = await response.data;
        
        return ideaDetail;
    },
    async loadPostIdeas() {
        const url = '/ideas/?state=post';
        const response = await api.get(url);
        const ideas = await response.data;
        
        return ideas;
    },
    async loadFilteredPostIdeas(userId) {
        const url = '/ideas/?user_id=' + userId + '&state=post';
        const response = await api.get(url);
        const filteredIdeas = await response.data;

        return filteredIdeas;
    },
    async loadFilteredDraftIdeas(userId) {
        const url = '/ideas/?user_id=' + userId + '&state=draft';
        const response = await api.get(url);
        const filteredIdeas = await response.data;

        return filteredIdeas;
    },
    async postIdea(ideaData) {
        const url = '/ideas/';
        const formData = new FormData();
        formData.append('user_id', ideaData.user_id);
        formData.append('title', ideaData.title);
        formData.append('overview', ideaData.overview);
        formData.append('target', ideaData.target);
        formData.append('background', ideaData.background);
        formData.append('value', ideaData.value);
        formData.append('passion', ideaData.passion);
        formData.append('state', ideaData.state);

        const response = await api.post(url, formData);
        const data = await response.data;

        return data;
    },
    async putIdea(ideaData, ideaId) {
        const url = '/ideas/' + ideaId + '/';
        const formData = new FormData();
        formData.append('user_id', ideaData.user_id);
        formData.append('title', ideaData.title);
        formData.append('overview', ideaData.overview);
        formData.append('background', ideaData.background);
        formData.append('passion', ideaData.passion);
        formData.append('state', ideaData.state);
        formData.append('offer', ideaData.offer );

        const response = await api.put(url, formData);
        const data = await response.data;

        return data;
    },
    async putImage(data, ideaId) {
        const url = '/ideas/' + ideaId + '/';
        const formData = new FormData();
        formData.append('user_id', data.user_id);
        formData.append('title', data.title);
        formData.append('state', data.state);
        
        if(data.idea_image !== null) {
            formData.append('idea_image', data.idea_image);
        }

        const response = await api.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const responseData = await response.data;

        return responseData;
    },
    async putDate(data, ideaId) {
        const url = '/ideas/' + ideaId + '/';
        const response = await api.put(url, {
            user_id: data.user_id,
            title: data.title,
            state: data.state,
            deadline: data.deadline,
        });
        const responseData = await response.data;

        return responseData;            
    },
    async publishIdea(ideaData, ideaId) {
        const url = '/ideas/' + ideaId + '/';
        const formData = new FormData();
        formData.append('user_id', ideaData.user_id);
        formData.append('title', ideaData.title);
        formData.append('overview', ideaData.overview);
        formData.append('background', ideaData.background);
        formData.append('passion', ideaData.passion);
        formData.append('state', 'post');
        formData.append('offer', ideaData.offer );
        
        if(ideaData.idea_image !== null) {
            formData.append('idea_image', ideaData.idea_image);
        }

        const response = await api.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const data = await response.data;

        return data;
    },
    async deleteIdea(ideaId) {
        const url = '/ideas/' + ideaId + '/';
        const response = await api.delete(url);
        const responseData = await response.data;

        return responseData;
    },

    // ------------------------------ Tags ------------------------------ //
    // DBにて使用されている順にタグが既にソートされているため、先頭10個のアイデアを取得すればよい
    async loadHitTags() {
        const url = '/tag/';
        const response = await api.get(url);
        const responseData = await response.data;
        const top10tags = responseData.slice(0, 10);

        return top10tags;
    },
    // tagの名前でタグを検索する
    async loadTagsByName(tagName) {
        const url = '/tag/?tag_name=' + tagName;
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData[0];
    },
    async loadIdeaTags(ideaId) {
        const tag_url = '/tag/';
        const ideatag_url = '/idea_tag/?idea=' + ideaId;
        const tags = [];

        // パラメータとして渡されたideaIdをもとに、マッチするアイテムを取得
        // tagそのものでなく、tagのidを取得する点に注意
        let response = await api.get(ideatag_url);
        let loadTags = await response.data;
        const tagIds = loadTags.map((tag) => tag.tag);

        // ここで実際のタグの名前を取得
        for (const tagId of tagIds) {
            response = await api.get(tag_url + tagId + '/');
            const loadTag = await response.data;
            tags.push(loadTag);
        }

        return tags;
    },
    // パラメータとしてタグのIDを渡して,そのタグと一緒に格納されているアイデアを一括で取得
    async loadIdeaTagsByTag(tagId) {
        const url = '/idea_tag/?tag=' + tagId;
        const response = await api.get(url);
        const tags = await response.data;

        return tags;
    },
    async loadUserTags(userId) {
        const tag_url = '/tag/';
        const usertag_url = '/user_tag/?user=' + userId;
        const tags = [];

        // パラメータとして渡されたideaIdをもとに、マッチするアイテムを取得
        // tagそのものでなく、tagのidを取得する点に注意
        let response = await api.get(usertag_url);
        let loadTags = await response.data;
        if (loadTags.length === 0) {
            return;
        }
        const tagIds = loadTags.map((tag) => tag.tag);

        // ここで実際のタグの名前を取得
        for (const tagId of tagIds) {
            response = await api.get(tag_url + tagId + '/');
            const loadTag = await response.data;
            tags.push(loadTag);
        }

        return tags;
    },
    async postIdeaTag(ideaId, tagName) {
        // step1 tag tableに存在するか確認
        const url = '/tag/?tag_name=' + tagName;
        let response = await api.get(url);
        let target = await response.data; 
        
        // step2 tag tableに追加もしくは、idを取得
        let tagId;
        if (target.length > 0) {
            // もし見つかったらそのtag_idを取得
            tagId = target[0].tag_id;
        } else {
            // もし見つからなかったら追加する
            response = await api.post('/tag/', {
                tag_name: tagName
            });
            tagId = await response.data.tag_id;
        }

        // step2 idea tag mapに追加
        response = await api.post('/idea_tag/', {
            idea: ideaId,
            tag: tagId
        });
        let result = await response.data;
        return result;
    },
    async postUserTag(userId, tagName) {
        // step1 tag tableに存在するか確認
        const url = '/tag/?tag_name=' + tagName;
        let response = await api.get(url);
        let target = await response.data; 
        
        // step2 tag tableに追加もしくは、idを取得
        let tagId;
        if (target.length > 0) {
            // もし見つかったらそのtag_idを取得
            tagId = target[0].tag_id;
        } else {
            // もし見つからなかったら追加する
            response = await api.post('/tag/', {
                tag_name: tagName
            });
            tagId = await response.data.tag_id;
        }

        // step2 idea tag mapに追加
        response = await api.post('/user_tag/', {
            user: userId,
            tag: tagId
        });
        let result = await response.data;
        return result;
    },
    async deleteAllUserTag(userId) {
        // 既存のタグを取得
        let url = '/user_tag/?user=' + userId;
        let response = await api.get(url);
        let tags = await response.data;

        // 全削除
        const promises = [];
        for (const tag of tags) {
            url = '/user_tag/' + tag.usertag_id + '/';
            promises.push(api.delete(url));
        }

        return Promise.all(promises);
    },
    async deleteAllIdeaTag(ideaId) {
        // 既存のタグを取得
        let url = '/idea_tag/?idea=' + ideaId;
        let response = await api.get(url);
        let tags = await response.data; 

        // 全削除
        const promises = [];
        for (const tag of tags) {
            url = '/idea_tag/' + tag.ideatag_id + '/';
            promises.push(api.delete(url));
        }

        return Promise.all(promises);
    },

    // ------------------------------ Event ------------------------------ //
    async loadNewEvents() {
        const url = '/events/';
        const response = await api.get(url);
        const events = await response.data;

        return events;
    },
    async loadEventDetail(eventId) {
        const url = '/events/' + eventId + '/';
        const response = await api.get(url);
        const event = await response.data;

        return event;
    },

    // ------------------------------ Event Stock ------------------------------ //
    async loadStockEvents(userId) {
        // フィルタリングしてuerのストックしているイベントをすべて取得
        const url = '/event_stock/?user=' + userId;
        const response = await api.get(url);
        const data = await response.data;

        return data;
    },
    async addEventStock(eventId, userId) {
        const url = '/event_stock/';
        const response = await api.post(url, {
            user: userId,
            event: eventId,
        });
        const responseData = await response.data;
        return responseData;
    },
    async removeEventStock(eventId, userId) {
        // eventId, userIdからstock_idの取得
        let url = '/event_stock/?user=' + userId + '&event=' + eventId;
        let response = await api.get(url);
        let data = await response.data;

        // 削除
        const stockId = data[0].stock_id;
        url = '/event_stock/' + stockId + '/';
        response = await api.delete(url);
        data = await response.data;

        return data;
    },

    // ------------------------------ Reputation Map ------------------------------ //
    // 評価を追加する
    async addReputation(ideaId, userId, reputation) {
        const url = '/reputations/';
        const response = await api.post(url, {
            idea: ideaId,
            user: userId,
            interesting: reputation.interesting,
            novelty: reputation.novelty,
            possibility: reputation.possibility
        });
        const responseData = await response.data;

        return responseData;
    },
    async updateReputation(reputationId, ideaId, userId, reputation) {
        const url = '/reputations/' + reputationId + '/';
        const response = await api.put(url, {
            idea: ideaId,
            user: userId,
            interesting: reputation.interesting,
            novelty: reputation.novelty,
            possibility: reputation.possibility
        });
        const responseData = await response.data;

        return responseData;
    },
    async deleteReputation(repId) {
        const url = '/reputations/' + repId + '/';
        const response = await api.delete(url);
        const responseData = await response.data;

        return responseData;
    },
    async loadReputation(ideaId, userId) {
        const url = '/reputations/?idea=' + ideaId + '&user=' + userId;
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData[0];
    },
    // 指定されたアイデアの評価を全て読み込む
    async loadIdeaReputations(ideaId) {
        const url = '/reputations/?idea=' + ideaId;
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData;
    },
    async countIdeaReputation(ideaId) {
        const url = '/reputations/?idea=' + ideaId;
        const response = await api.get(url);
        const reputations = await response.data;

        return reputations.length;
    },
    // 評価済みか否かを確認
    async getReputationState(ideaId, userId) {
        const url = '/reputations/?idea=' + ideaId + '&user=' + userId;
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData.length > 0;
    },

    // ------------------------------ Reputation Map ------------------------------ //
    // パラメーターとして渡したユーザーに届いたメッセージ一覧を取得
    async loadReceivedMessages(userId) {
        const url = '/messages/?user_to=' + userId;
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData;
    },
    async loadMessage(messageId) {
        const url = '/messages/' + messageId + '/';
        const response = await api.get(url);
        const responseData = await response.data;
        
        return responseData;
    },
    async sendMessage(messageData) {
        const url = '/messages/';
        const response = await api.post(url, {
            user_from: messageData.user_from,
            user_to: messageData.user_to,
            title: messageData.title,
            message: messageData.message,
        });
        const responseData = await response.data;

        return responseData;
    },

    // ------------------------------ Feedback ------------------------------ //
    //  パラメータとして渡されたアイデアに関連する投稿者から質問を読み込む
    async loadFeedbackQuestions(ideaId) {
        const url = '/feedback_questions/?idea_id=' + ideaId;
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData;
    },
    // パラメータとして渡されたquestionIdに対してのフィードバックを一括で読み込む
    async loadFeedbacks(questionId) {
        const url = '/feedbacks/?feedback_question_id=' + questionId;
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData;
    },
    async addFeedback(data) {
        const url = '/feedbacks/';
        const response = await api.post(url, {
            user_id: data.user_id,
            feedback_question_id: data.feedback_question_id,
            feedback: data.feedback
        });
        const responseData = await response.data;

        return responseData;
    },
    async deleteFeedback(feedbackId) {
        const url = '/feedbacks/' + feedbackId + '/';
        const response = await api.delete(url);
        const responseData = await response.data;

        return responseData;
    },
    async addQuestion(ideaId, question) {
        const url = '/feedback_questions/';
        const response = await api.post(url, {
            idea: ideaId,
            question: question,
        });
        const responseData = await response.data;
        
        return responseData;
    },

    // ------------------------------ recruitment ------------------------------ //
    async postRecruitment(ideaId, kind, number) {
        const url = '/recruitments/';
        const response = await api.post(url, {
            idea: ideaId,
            kind: kind,
            number: number,
        });
        const responseData = await response.data;

        return responseData;
    },
    async loadRecruitments(ideaId) {
        const url = '/recruitments/?idea=' + ideaId;
        const response = await api.get(url);
        const responseData = await response.data;

        return responseData;
    },
    async deleteAllRecruitments(ideaId) {
        let url = '/recruitments/?idea=' + ideaId;
        const response = await api.get(url);
        const responseData = await response.data;
        
        if (responseData.length > 0) {
            const recIds = responseData.map( rec => rec.recruitment_id);
            const promises = [];
            for (const recId of recIds) {
                url = '/recruitments/' + recId + '/';
                promises.push(api.delete(url));
            }
            Promise.all(promises)
            .catch(err => {
                console.log("error to delete recruitments: ", err);
            })
        }
    }
}
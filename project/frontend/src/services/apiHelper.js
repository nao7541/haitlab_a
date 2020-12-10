import api from '@/services/api.js';

export default {
    // ------------------------------ User ------------------------------ //
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


    // ------------------------------ Idea ------------------------------ //
    async loadIdeaDetail(ideaId) {
        // ideaIdをキーとしてideaの詳細情報を取得
        const url = '/ideas/' + ideaId + '/';
        const response = await api.get(url);
        const ideaDetail = await response.data;
        
        return ideaDetail;
    },
    async loadIdeas() {
        const url = '/ideas/';
        const response = await api.get(url);
        const ideas = await response.data;
        
        return ideas;
    },
    async loadFilteredIdeas(userId) {
        // TODO 上のloadIdeas使ってもう少しコード綺麗にする
        const url = '/ideas/';
        const response = await api.get(url);
        const ideas = await response.data;
        const filteredIdeas = [];

        for (const idea of ideas) {
            if (idea.user_id == userId) {
                filteredIdeas.push(idea);
            }
        }
        return filteredIdeas;
    },
    async postIdea(ideaData) {
        const url = '/ideas/';
        const formData = new FormData();
        formData.append('user_id', ideaData.user_id);
        formData.append('title', ideaData.title);
        formData.append('overview', ideaData.overview);
        formData.append('background', ideaData.background);
        formData.append('passion', ideaData.passion);
        formData.append('state', ideaData.state);
        
        if(ideaData.idea_image !== null) {
            formData.append('idea_image', ideaData.idea_image);
        }

        const response = await api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const data = await response.data;

        return data;
    },

    // ------------------------------ Comments ------------------------------ //
    async loadComments(ideaId) {
        // TODO: django-filterによるフィルタリング
        // ideaIdをキーとしてアイデアに関係のあるコメントのみ取得
        const url = '/comment/';
        const response = await api.get(url);
        const allCom = await response.data;
        const filteredCom = [];

        // コメントのフィルタリング
        for (const com of allCom) {
            if (com.idea_id == ideaId) {
                filteredCom.push(com);
            }
        }
        
        return filteredCom;
    }, 
    async postComment(commentData) {
        const url = '/comment/';
        const response = await api.post(url, commentData);
        
        return response;
    },

    // ------------------------------ Tags ------------------------------ //
    // TODO: django-filterによるフィルタリング実装
    async loadIdeaTags(ideaId) {
        const tag_url = '/tag/';
        const ideatag_url = '/idea_tag/';
        const tagIds = [];
        const tags = [];

        // パラメータとして渡されたideaIdをもとに、マッチするアイテムを取得
        // tagそのものでなく、tagのidを取得する点に注意
        let response = await api.get(ideatag_url);
        let loadTags = await response.data;
        for (const tag of loadTags) {
            if (tag.idea == ideaId) {
                tagIds.push(tag.tag);
            }
        }

        // ここで実際のタグの名前を取得
        for (const tagId of tagIds) {
            response = await api.get(tag_url + tagId + '/');
            const loadTag = await response.data;
            tags.push(loadTag);
        }

        return tags;
    },
    // TODO: django-filterによるフィルタリング
    async loadUserTags(userId) {
        const tag_url = '/tag/';
        const usertag_url = '/user_tag/';
        const tagIds = [];
        const tags = [];

        // パラメータとして渡されたideaIdをもとに、マッチするアイテムを取得
        // tagそのものでなく、tagのidを取得する点に注意
        let response = await api.get(usertag_url);
        let loadTags = await response.data;
        for (const tag of loadTags) {
            if (tag.user == userId) {
                tagIds.push(tag.tag);
            }
        }

        // ここで実際のタグの名前を取得
        for (const tagId of tagIds) {
            response = await api.get(tag_url + tagId + '/');
            const loadTag = await response.data;
            tags.push(loadTag);
        }

        return tags;
    },
    async postIdeaTag(ideaId, tagName) {
        // TODO django-filter
        // step1 tag tableに存在するか確認
        let response = await api.get('/tag/');
        let tagAll = await response.data; 

        let target = tagAll.find( (tag) => {
            return tag.tag_name === tagName;
        });
        
        // step2 tag tableに追加もしくは、idを取得
        let tagId;
        if (target != null) {
            // もし見つかったらそのtag_idを取得
            tagId = target.tag_id;
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
        return response;
    },
    async postUserTag() {

    }
}
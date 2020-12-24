<template>
    <IdeaBoard
        v-if="loadComplete"
        title="あなたへのおすすめアイデア"
        :ideas="ideas"
    />
</template>

<script>
import apiHelper from '@/services/apiHelper.js'
import IdeaBoard from '@/components/Idea/IdeaBoard.vue'

export default {
    components: {
        IdeaBoard,
    },
    data() {
        return {
            ideaIds: [], // レコメンドするアイデアのIDを格納する
            ideas: [], // 要素はideaデータそのもの
            myTags: [],
            loadComplete: false,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    created() {
        // 自分の登録しているタグにマッチするアイデアと
        // 自分のフォローしている
        apiHelper.loadUserTags(this.myUserId)
        .then( res => {
            // 1. 自分のタグを取得
            this.myTags = res;

            // タグが未登録ならreturn
            if (this.myTags == null) {
                this.loadComplete = true;
                return;
            }    

            let promises = [];
            this.myTags.forEach( tag => {
                promises.push(apiHelper.loadIdeaTagsByTag(tag.tag_id));
            });
            Promise.all(promises)
            .then( results => {
                // 自分のタグにヒットするアイデアがなければ終了
                if (results == null) {
                    this.loadComplete = true;
                    return;
                }
                
                // 2. 自分の持つ各タグがつけられているアイデアのidを全取得
                results.forEach( result => {
                    // tagは配列で返されるため2重ループ
                    result.forEach( tag => {
                        // 重複を避けるために、配列に含まれていないものだけを追加する
                        if (!this.ideaIds.includes(tag.idea)) {
                            this.ideaIds.push(tag.idea);
                        }
                    });
                });

                // 3. 自分がフォローしているユーザーを取得
                return apiHelper.loadFollowingUsers(this.myUserId)
            }).then( res => {
                const followingUsers = res.map( user => user.following_user_id );
                if (followingUsers.length === 0) {
                    return;
                }

                // 4. 自分がフォローしているユーザが投稿しているアイデアのIDを取得する
                promises = [];
                followingUsers.forEach( userId => {
                    promises.push(apiHelper.loadFilteredPostIdeas(userId));
                });
                return Promise.all(promises);
            }).then( results => {
                if (results != null) {
                    results.forEach( ideas => {
                        if (ideas.length > 0) {
                            ideas.forEach( idea => {
                                if (!this.ideaIds.includes(idea.idea_id)) {
                                    this.ideaIds.push(idea.idea_id);
                                }
                            })
                        }
                    })
                }
            
                // 5. アイデアのidよりアイデアそのものを読み込む
                promises = [];
                this.ideaIds.forEach( ideaId => {
                    promises.push(apiHelper.loadIdeaDetail(ideaId));
                });
                return Promise.all(promises)
            }).then( results => {
                this.ideas = [];
                results.forEach( result => {
                    // 重複を避けるために、配列に含まれていないものだけを追加する
                    // かつ、自分のアイデア以外
                    if (!this.ideas.includes(result) && result.user_id != this.myUserId) {
                        this.ideas.push(result);
                    }
                });
                this.loadComplete = true;
            })
        }).catch( err => {
            console.log("error to load usertag at recommendIdeaPage: ", err);
        })
    }
}
</script>
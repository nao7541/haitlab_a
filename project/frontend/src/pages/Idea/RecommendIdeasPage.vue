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
            ideas: [],
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
        apiHelper.loadUserTags(this.myUserId)
        .then( res => {
            // 1. 自分のタグを取得
            this.myTags = res;

            let promises = [];
            this.myTags.forEach( tag => {
                promises.push(apiHelper.loadIdeaTagsByTag(tag.tag_id));
            });
            Promise.all(promises)
            .then( results => {
                // 2. 自分の持つ各タグがつけられているアイデアのidを全取得
                const ideaIds = [];
                results.forEach( result => {
                    // tagは配列で返されるため2重ループ
                    result.forEach( tag => {
                        // 重複を避けるために、配列に含まれていないものだけを追加する
                        if (!ideaIds.includes(tag.idea)) {
                            ideaIds.push(tag.idea);
                        }
                    });
                });

                console.log(results)

                // 3. アイデアのidよりアイデアそのものを読み込む
                promises = [];
                ideaIds.forEach( ideaId => {
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
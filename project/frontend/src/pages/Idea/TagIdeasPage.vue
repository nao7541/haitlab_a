<template>
    <div id="tag-idea__page">
        <SearchTag 
            v-if="loadHitTagComplete"
            tagLabel="検索タグ"
            :searchTags="searchTags"
            :hitTags="hitTags"
            :maximum="5"
        />
        <IdeaBoard
            v-if="boardVisible"
            title="検索結果"
            :ideas="searchIdeas"
        />
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import SearchTag from '@/components/Tag/SearchTag.vue';
import IdeaBoard from '@/components/Idea/IdeaBoard.vue';

export default {
    components: {
        SearchTag,
        IdeaBoard,
    },
    computed: {
        boardVisible() {
            // nullでない & 要素が最低1つある & load完了時のみtrueを返す
            if (this.searchIdeas != null) {
                if (this.searchIdeas.length > 0 && this.loadComplete) {
                    return true;
                }
            }
            return false;
        },
        myUserId() {
            return this.$store.getters['auth/userId'];
        }
    },
    data() {
        return {
            hitTags: [],
            searchTags: [],
            searchIdeas: [],
            loadComplete: false,
            loadHitTagComplete: false,
        }
    },
    methods: {
        loadHitTags() {
            apiHelper.loadHitTags()
            .then( res => {
                this.hitTags = res;

                this.loadHitTagComplete = true;
            }).catch( err => {
                console.log("error to load hit tags: ", err);
            })
        },
    },
    created() {
        this.loadHitTags();
    },
    watch: {
        // searchTagsに変更があればアイデアフィルタリングを実行
        searchTags() {
            // searchIdeasの初期化
            this.searchIdeas = [];

            // step1
            // searchTagsに含まれるタグに対して、タグが存在する場合はidを取得
            const tagIDs = [];
            let promises = [];
            for (const tag of this.searchTags) {
                promises.push(apiHelper.loadTagsByName(tag));
            }
            Promise.all(promises)
            .then( results => {
                for (const res of results) {
                    // タグが存在する場合のみ保存
                    if (res != null) {
                        if (!tagIDs.includes(res.tag_id)) {
                            tagIDs.push(res.tag_id);
                        }
                    }
                }

                // tagを持つアイデアが存在する場合のみstep2へ進む
                if (tagIDs.length > 0) {
                    // step2
                    // step1で取得したタグからアイデアIDsを取得
                    const ideaIDs = [];
                    promises = [];
                    for (const tagId of tagIDs) {
                        promises.push(apiHelper.loadIdeaTagsByTag(tagId));
                    }
                    Promise.all(promises)
                    .then( results => {
                        for (const ideaTags of results) {
                            for (const ideaTag of ideaTags) {
                                // もしまだリストに追加されてないアイデアなら追加
                                if (!ideaIDs.includes(ideaTag.idea)) {
                                    ideaIDs.push(ideaTag.idea);
                                }
                            }
                        }
                        
                        // アイデアが存在する場合のみstep3へ
                        if (ideaIDs.length > 0) {
                            // step3
                            // step2で取得したアイデアより、自分が投稿したアイデア以外のアイデアデータを取得
                            promises = [];
                            for (const id of ideaIDs) {
                                promises.push(apiHelper.loadIdeaDetail(id));
                            }
                            Promise.all(promises)
                            .then( results => {
                                for (const idea of results) {
                                    // 自分のアイデアない && 投稿済み
                                    if (idea.user_id != this.myUserId && idea.state === 'post') {
                                        this.searchIdeas.push(idea)
                                    }
                                }
                                this.loadComplete = true;
                            })
                        } else {
                            this.loadComplete = true;
                        }
                    })
                } else {
                    this.loadComplete = true;
                }
            }).catch( err => {
                console.log("error to get search ideas: ", err);
            })
        }
    }
}
</script>
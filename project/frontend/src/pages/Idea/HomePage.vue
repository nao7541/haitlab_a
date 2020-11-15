<template>
    <div id="home-page">
        <div class="sidebar">
            <SearchSetting/>
        </div>
        <div class="main-content">
            <IdeaList :ideas="ideas"/>
        </div>
    </div>
</template>

<script>
import IdeaList from '@/components/Idea/IdeaList.vue';
import SearchSetting from '@/components/Idea/SearchSetting.vue';

export default {
    components: {
        SearchSetting,
        IdeaList,
    },
    data() {
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
            ]
        }
    },
    provide() {
        return {
            users: this.users,
            ideas: this.ideas,
        };
    },
}
</script>

<style scoped>
#home-page {
    width: 60%;
    background-color: #fff;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    grid-template-areas: "sidebar main-content";
}

.sidebar {
    grid-area: sidebar;
}

.main-content {
    grid-area: main-content;
}


</style>
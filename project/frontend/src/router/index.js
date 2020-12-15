import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//---------- impport page components ----------//
// Idea pages
import HomePage from '@/pages/HomePage.vue';
import IdeasPage from '@/pages/Idea/IdeasPage.vue';
import NewIdeasPage from '@/pages/Idea/NewIdeasPage.vue';
import TagIdeasPage from '@/pages/Idea/TagIdeasPage.vue';
import TrendIdeasPage from '@/pages/Idea/TrendIdeasPage';
import RecommendIdeasPage from '@/pages/Idea/RecommendIdeasPage';
import IdeaDetailPage from '@/pages/Idea/IdeaDetailPage.vue';
// Idea Post
import IdeaPostPage from '@/pages/Idea/IdeaPostPage.vue';
import PostStep1 from '@/pages/Idea/PostStep1.vue';
import PostStep2 from '@/pages/Idea/PostStep2.vue';
import PostStep3 from '@/pages/Idea/PostStep3.vue';
import PostStep4 from '@/pages/Idea/PostStep4.vue';
import PostStep5 from '@/pages/Idea/PostStep5.vue';
// Auth pages
import SignupPage from '@/pages/Auth/SignupPage.vue';
import LoginPage from '@/pages/Auth/LoginPage.vue';
// User Pages
import UserProfilePage from '@/pages/User/UserProfilePage.vue';
import SettingsPage from '@/pages/User/SettingsPage.vue';
import UserSearchPage from '@/pages/User/UserSearchPage.vue';
import MessageHomePage from '@/pages/User/MessageHomePage.vue';
import MessageDisplayPage from '@/pages/User/MessageDisplayPage.vue';
// Event pages
import EventHomePage from '@/pages/Event/EventHomePage.vue';
import NewEventsPage from '@/pages/Event/NewEventsPage';
import ComingEventsPage from '@/pages/Event/ComingEventsPage';

//---------- import vuex ----------//
import store from '@/store/index.js';

//---------- about meta ----------//
// requiresAuth: ログイン状態でのみ訪問可能なページ
// requiresUnAuth: 未ログイン状態でのみ訪問可能なページ

const routes = [
    {
        path: '/',
        component: HomePage,
        redirect: '/ideas',
        children: [
            {
                name: 'ideas',
                path: 'ideas',
                component: IdeasPage,
                redirect: { name: 'newIdeas' },
                children: [
                    { name: 'newIdeas',   path: 'new',   component: NewIdeasPage   },
                    { name: 'trendIdeas', path: 'trend', component: TrendIdeasPage },
                    { name: 'tagIdeas',   path: 'tag',   component: TagIdeasPage   },
                    { name: 'RecommendIdeasPage', path: 'recommend', component: RecommendIdeasPage },
                ]
            },
            {
                // アイデア詳細画面
                name: 'ideaDetail',
                path: 'ideas/:ideaId',
                component: IdeaDetailPage,
                props: true,
            },
            {
                // サインアップ画面
                name: 'signup',
                path: 'signup',
                component: SignupPage,
                meta: { requiresUnAuth: true },
            },
            {
                // ログイン画面
                name: 'login',
                path: 'login',
                component: LoginPage,
                meta: { requiresUnAuth: true },
            },
            {
                // ユーザー画面
                name: 'userprofile',
                path: 'profile/:userId',
                component: UserProfilePage,
                props: true,
                meta: { requiresAuth: true }, 
            },
            {
                // プロフィール設定画面
                name: 'settings',
                path: 'settings',
                component: SettingsPage,
                meta: { requiresAuth: true },
            },
            {
                name: 'userSearch',
                path: 'user/search',
                component: UserSearchPage,
            },
            {
                // メッセージ一覧画面
                name: 'messages',
                path: 'messages',
                component: MessageHomePage,
                meta: { requiresAuth: true },
                children: [
                    {
                        name: 'messageDisplay',
                        path: 'message/:userId',
                        component: MessageDisplayPage,
                    }
                ]
            },
            {
                // イベント一覧画面
                name: 'events',
                path: 'events',
                component: EventHomePage,
                redirect: { name: 'newEvents' },
                children: [
                    { name: 'newEvents', path: 'new', component: NewEventsPage },
                    { name: 'comingEvents', path: 'coming', component: ComingEventsPage }
                ]
            },
        ]
    },
    {
        // アイデア投稿画面
        name: 'post',
        path: '/post',
        // redirect: { name: 'step1' },
        component: IdeaPostPage,
        meta: { requiresAuth: true },
        children: [
            { name: 'step1', path: 'step1', component: PostStep1 },
            { name: 'step2', path: 'step2', component: PostStep2 },
            { name: 'step3', path: 'step3', component: PostStep3 },
            { name: 'step4', path: 'step4', component: PostStep4 },
            { name: 'step5', path: 'step5', component: PostStep5 },
        ]
    },
    {
        // それ以外はホーム画面に遷移
        path: '/:notFound(.*)',
        redirect: ''
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters['auth/isLoggedIn'];

    // loginが必要となページへの遷移の場合はloginしているかを確認する
    if (to.matched.some( record => record.meta.requiresAuth )) {
        
        // すでにログインしている場合
        if (isLoggedIn) {
            console.log('User is already logged in, feel free to go.');
            next();
        } else {
            // 強制的にログインさせる
            forceToLoginPage(to, from, next);
        }
    } else if (to.matched.some( record => record.meta.requiresUnAuth )) {
        // loginしている場合に回避したいページへ遷移しようとした場合
        //TODO: 実装未完成
        next();
    } else {
        // loginが不必要なページへの遷移の場合はそのままページ遷移を許可する
        next();
    }
});

// ログインページに強制送還するための関数
function forceToLoginPage(to, _, next) {
    next({
        path: '/login',
        query: { next: to.fullPath },
    });
}

export default router;
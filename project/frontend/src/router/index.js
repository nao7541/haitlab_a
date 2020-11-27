import { createRouter, createWebHistory } from 'vue-router';

//---------- impport page components ----------//
// Idea pages
import HomePage from '@/pages/Idea/HomePage.vue';
import IdeaPostPage from '@/pages/Idea/IdeaPostPage.vue';
import IdeaDetailPage from '@/pages/Idea/IdeaDetailPage.vue';
// Auth pages
import SignupPage from '@/pages/Auth/SignupPage.vue';
import LoginPage from '@/pages/Auth/LoginPage.vue';
// User Pages
import UserProfilePage from '@/pages/User/UserProfilePage.vue';
import SettingsPage from '@/pages/User/SettingsPage.vue';
import MessageListPage from '@/pages/User/MessageListPage.vue';
import MessageDisplayPage from '@/pages/User/MessageDisplayPage.vue';
// Event pages
import EventListPage from '@/pages/Event/EventListPage.vue';

//---------- import vuex ----------//
import store from '@/store/index.js';

//---------- about meta ----------//
// requiresAuth: ログイン状態でのみ訪問可能なページ
// requiresUnAuth: 未ログイン状態でのみ訪問可能なページ

const routes = [
    {
        // アイデア詳細画面
        name: 'ideas',
        path: '/ideas',
        component: HomePage, // 表示する画面はHomePageと同じ
    },
    {
        name: 'idea',
        path: '/ideas/:ideaId',
        component: IdeaDetailPage,
        props: true,
    },
    {
        // アイデア投稿画面
        name: 'post',
        path: '/post',
        component: IdeaPostPage,
        meta: { requiresAuth: true },
    },
    {
        // サインアップ画面
        name: 'signup',
        path: '/signup',
        component: SignupPage,
        meta: { requiresUnAuth: true },
    },
    {
        // ログイン画面
        name: 'login',
        path: '/login',
        component: LoginPage,
        meta: { requiresUnAuth: true },
    },
    {
        // ユーザー画面
        name: 'userprofile',
        path: '/profile/:userId',
        component: UserProfilePage,
        props: true,
        meta: { requiresAuth: true }, 
    },
    {
        name: 'settings',
        path: '/settings',
        component: SettingsPage,
        meta: { requiresAuth: true },
    },
    {
        // メッセージ一覧画面
        name: 'messages',
        path: '/messages',
        component: MessageListPage,
        meta: { requiresAuth: true },
        children: [
            {
                name: 'messageDisplay',
                path: 'username',
                component: MessageDisplayPage,
            }
        ]
    },
    {
        // イベント一覧画面
        name: 'events',
        path: '/events',
        component: EventListPage,
    },
    {
        // それ以外はホーム画面に遷移
        path: '/:notFound(.*)',
        redirect: '/ideas'
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
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

import { createRouter, createWebHistory } from 'vue-router';

// pages
import HomePage from '@/pages/HomePage.vue';
import SignupPage from '@/pages/SignupPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import UserProfilePage from '@/pages/UserProfilePage.vue';
import IdeaPostPage from '@/pages/IdeaPostPage.vue';
import IdeaDetailPage from '@/pages/IdeaDetailPage.vue';

const routes = [
    {
        // ホーム画面
        name: 'home',
        path: '/home',
        component: HomePage,
    },
    {
        // サインアップ画面
        name: 'signup',
        path: '/signup',
        component: SignupPage,
    },
    {
        // ログイン画面
        name: 'login',
        path: '/login',
        component: LoginPage,
    },
    {
        // ユーザー画面
        name: 'userprofile',
        path: '/:username',
        component: UserProfilePage,
        meta: { requiresAuth: true }, // ログイン後にのみ参照できるページはmetaタグとしてrequiresAuthを付ける
    },
    {
        // アイデア投稿画面
        name: 'post',
        path: '/post',
        component: IdeaPostPage,
        meta: { requiresAuth: true },
    },
    {
        // アイデア詳細画面
        name: 'ideas',
        path: '/ideas',
        component: HomePage, // 表示する画面はHomePageと同じ
        children: [
            {
                name: 'idea',
                path: '/:ideaId',
                component: IdeaDetailPage,
                props: true,
            }
        ]
    },
    {
        // メッセージ一覧画面
        // name: 'messages',
        // path: '/messages',
        // component: null,
        // meta: { requiresAuth: true },
    },
    {
        // メッセージ詳細画面
        // TODO: urlをどうすればよいかわからない
        // 今のままだと他のユーザーも見れる
        // path: '/messages/:username',
        // component: null,
        // meta: { requiresAuth: true },
    },
    {
        // イベント一覧画面
        name: 'events',
        path: '/events',
        component: null,
    },
    {
        // それ以外はホーム画面に遷移
        path: '/:notFound(.*)',
        redirect: '/home'
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;

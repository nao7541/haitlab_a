import { createRouter, createWebHistory } from 'vue-router';

//// impport page components
// Idea pages
import HomePage from '@/pages/Idea/HomePage.vue';
import IdeaPostPage from '@/pages/Idea/IdeaPostPage.vue';
import IdeaDetailPage from '@/pages/Idea/IdeaDetailPage.vue';
// User pages
import SignupPage from '@/pages/User/SignupPage.vue';
import LoginPage from '@/pages/User/LoginPage.vue';
import UserProfilePage from '@/pages/User/UserProfilePage.vue';
import MessageListPage from '@/pages/User/MessageListPage.vue';
import MessageDisplayPage from '@/pages/User/MessageDisplayPage.vue';
// Event pages
import EventListPage from '@/pages/Event/EventListPage.vue';

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
        path: '/:userId',
        component: UserProfilePage,
        props: true,
        meta: { requiresAuth: true }, // ログイン後にのみ参照できるページはmetaタグとしてrequiresAuthを付ける
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

export default router;

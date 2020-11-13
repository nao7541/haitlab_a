<template>
    <div class="idea-element">
        <div class="profile">
            <img src="@/assets/user.png" alt="image">
        </div>
        <div class="card-body">
            <div class="title">
                <h2>{{ title }}</h2>
            </div>
            <div class="content">
                <p>{{ content }}</p>
            </div>
            <div class="detail-button">
                <TheButton text="詳細"/>
            </div>
            <div class="footer">
                <small>{{ date }}</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['idea_id', 'user_id', 'title', 'content', 'date'],
}
</script>

<style scoped>
.idea-element {
    width: 45%;
    text-align: center;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    margin: 2rem auto;
}

.idea-element:hover {
    transition: all 0.25s ease-in;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
}

.profile img{
    width: 128px;
    height: 128px;
    border-radius: 128px;
    margin: 2rem 0;
}

.card-body {
    background-color: #aaaaaa;
    border-radius: 12px;
    display: grid;
    grid-template-rows: 1fr 1.2fr .25fr 0.1fr;
    grid-template-areas:
                "title"
                "content"
                "detail"
                "footer";
}

.card-body .title {
    grid-area: title;
    height: 8rem;
}

.card-body .content {
    grid-area: content;
}

.card-body .detail-button {
    grid-area: detail;
}

.card-body .detail-button button {
    width: 60%;
}

.card-body .detail-button button:hover {
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
}

.card-body .detail-button button:focus {
    border: 1px solid #eeeeee;
    background-color: #eeeeee;
}

.card-body .footer {
    grid-area: footer;
    text-align: right;
    padding: 1rem 2rem 1rem 0;
}
</style>
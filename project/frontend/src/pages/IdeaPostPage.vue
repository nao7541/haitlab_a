<template>
    <div id="idea-post">
        <BaseCard>
            <form>
                <div class="form-control">
                    <p>タイトル</p>
                    <input type="text" id="title" name="title">
                </div>
                <div class="form-control">
                    <p>概要</p>
                    <textarea name="overview" rows="10" cols="33"></textarea>
                </div>
                <TheButton text="投稿"></TheButton>
            </form>
        </BaseCard>
    </div>
</template>

<script>
import BaseCard from '../components/BaseCard.vue';

export default {
    components: {
        BaseCard,
    }
}
</script>

<style scoped>
.form-control {
    margin-bottom: 1rem;
}

form {
    padding: 2rem;
}

form p {
    text-align: left;
    font-size: 20px;
}

input, textarea {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #000;
    box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.25);
    padding: .75rem .5rem;
}

input {
    font-size: 20px;
}

textarea {
    font-size: 16px;
}

input:focus,
textarea:focus {
    transition: all .5s ease;
    border: 1px solid #df9203;
    background-color: #ffe1a9;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

form button {
    margin-top: 2rem;
    width: 50%;
    border: 1px solid #ffeece;
    background-color: #ffeece;
}

form button:hover {
    border: 1px solid #ffe0a7;
    background-color: #ffe0a7;
}

form button:focus {
    border: 1px solid #ffca67;
    background-color: #ffca67;
}

</style>
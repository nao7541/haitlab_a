<template>
    <div class="recruit__input">
        <input type="text" id="recruit-type" placeholder="機械学習エンジニア" v-model="recruit.kind">
        <input type="number" min="1" id="recruit-number" v-model="recruit.number">
        <input type="button" @click="$emit('delRecruitInput', index)" value="-" class="del__btn">
    </div>
</template>

<script>
export default {
    props: {
        index: {
            type: Number,
            required: true,
        },
        recruit: {
            kind: {
                type: String,
            },
            number: {
                type: Number
            }
        }
    }
}
</script>

<style scoped>
.recruit__input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.5rem;
}

.recruit__input input {
    height: 30px;
    font-size: 18px;
    outline: none;
    background-color: #e5e5e5;
    border: 1px solid #e5e5e5;
}

.recruit__input input[type="number"] {
    width: 60px;
    margin-left: 0.5rem;
}

.recruit__input input:focus {
    border: 1px solid #444;
}

.recruit__input .icon {
    width: 20px;
    height: 20px;
    background-color: #eee;
}

.recruit__input .del__btn {
    width: 30px;
    height: 30px;
    outline: none;
    margin-left: 0.5rem;
}

.recruit__input .del__btn:hover {
    background-color: #eee;
}
</style>
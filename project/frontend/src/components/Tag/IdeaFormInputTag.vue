<template>
    <div class="input-tag">
        <label for="tag">
            <span v-if="!isTagValid" class="invalid">タグはこれ以上追加できません</span>
        </label>
        <input type="text" id="tag" name="tag" placeholder="Type tag" @keydown.enter="addTag" @blur="clearValidity">
        <div class="added-tags">
            <div v-for="(tag, id) in tags" :key="id" class="tag">
                <span class="name">{{tag}}</span>
                <span class="delete" @click="deleteTag(id)"><FontAwesomeIcon :icon="['fas', 'times']" /></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tags: {
            type: Array,
            required: true,
        },
        maximum: {
            type: Number,
            required: false,
            default: 10,
        }
    },
    data() {
        return {
            isTagValid : true,
        }
    },
    methods: {
        clearValidity() {
            this.isTagValid = true;
        },
        tagValidation() {
            // tagの数が上限を超えていたら追加できないようにする
            if (this.tags.length >= this.maximum) {
                this.isTagValid = false;
            }
        },
        addTag(event) {
            event.preventDefault();

            // 追加の認証
            this.tagValidation();
            if (!this.isTagValid) {
                return;
            }

            // 追加
            const val = event.target.value.trim();
            if (val.length > 0) {
                this.tags.push(val);
                event.target.value = '';
            }
        },
        deleteTag(index) {
            this.tags.splice(index, 1);
        }
    }
}
</script>

<style scoped>
.input-tag label {
    font-weight: bold;
    display: block;
    text-align: left;
}

.input-tag input {
    font-size: 25px;
    width: 30rem;
    height: 3rem;
    line-height: 3rem;
    outline: none;
    border-bottom: 1px solid #000;
}

.input-tag input:focus {
    border-bottom: 2px solid #ffbb3c;
}

.added-tags .tag {
    min-width: 5rem;
    float: left;
    background-color: #eee;
    padding: 0.2rem 0.4rem;
    margin: 0.4rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.added-tags .tag .name {
    font-weight: bold;
    margin-right: 1rem;
}

.added-tags .tag .delete {
    cursor: pointer;
}

.added-tags::after {
    content: "";
    display: block;
    clear: both;
}

.invalid {
    color: #ff4a4a;
}
</style>
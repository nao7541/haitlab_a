<template>
    <div class="input-tag">
        <label for="tag">
            {{ tagLabel }}
            <span v-if="!isTagValid" class="invalid">タグはこれ以上追加できません</span>
        </label>
        <input type="text" id="tag" name="tag" placeholder="タグを入力" @keydown.enter="addTag" @blur="clearValidity">
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
        tagLabel: {
            type: String,
            required: false,
        },
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
    font-size: 17px;
    font-weight: bold;
    display: block;
    text-align: left;
    margin-bottom: 0.25rem;
}

.input-tag input {
    font-size: 18px;
    line-height: 2rem;
    padding-left: 0.5rem;
    width: 100%;
    outline: none;
    background-color: #e5e5e5;
    border: 1px solid #e5e5e5;
}

.input-tag input:focus {
    border: 1px solid #444;
}

.added-tags {
    margin-top: 0.5rem;
}

.added-tags .tag {
    min-width: 4rem;
    float: left;
    background-color: #eee;
    padding: 0.1rem 0.2rem;
    margin: 0.2rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.added-tags .tag .name {
    font-weight: bold;
    margin-right: .5rem;
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
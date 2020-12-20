<template>
    <div class="input-tag">
        <span v-if="!isTagValid" class="invalid">タグはこれ以上追加できません</span>
        <div class="search-box">
            <FontAwesomeIcon class="search-box__icon" :icon="['fas', 'search']" size="lg" />
            <input type="text" id="tag" name="tag" class="search-box__input" placeholder="タグで検索" @keydown.enter="addTag" @blur="clearValidity">
        </div>
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
    font-weight: bold;
    display: block;
    text-align: left;
}

.search-box {
    position: relative;
}

.search-box__icon {
    position: absolute;
    top: 12px;
    left: 10px;
}

.search-box__input {
    font-size: 20px;
    width: 100%;
    padding-left: 40px;
    height: 45px;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 64px;
    outline: none;
}

.added-tags .tag {
    float: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 6rem;
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 4px;
    color: #333;
    background-color: #ffe0a7;
}

.added-tags .tag .name {
    font-size: 18px;
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
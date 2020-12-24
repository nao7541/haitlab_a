<template>
    <div class="search-tag">
        <div class="hit-tags">
            <span>人気のあるタグ</span>
            <BaseTag v-for="(tag, index) in hitTags"
                :key="index"
                :name="tag.tag_name"
                :clickable="true"
                @clickTag="clickTag"
            ></BaseTag>
        </div>
        <div class="search">
            <span v-if="!isTagValid" class="invalid">タグはこれ以上追加できません</span>
            <div class="search-box">
                <FontAwesomeIcon class="search-box__icon" :icon="['fas', 'search']" size="lg" />
                <input type="text" id="tag" name="tag" class="search-box__input" placeholder="タグで検索" @keydown.enter="addTag" @blur="clearValidity">
            </div>
            <div class="added-tags">
                <div v-for="(tag, id) in searchTags" :key="id" class="tag">
                    <span class="name">{{tag}}</span>
                    <span class="delete" @click="deleteTag(id)"><FontAwesomeIcon :icon="['fas', 'times']" /></span>
                </div>
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
        searchTags: {
            type: Array,
            required: true,
        },
        hitTags: {
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
            if (this.searchTags.length >= this.maximum) {
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
                this.searchTags.push(val);
                event.target.value = '';
            }
        },
        deleteTag(index) {
            this.searchTags.splice(index, 1);
        },
        clickTag(name) {
             // 追加の認証
            this.tagValidation();
            if (!this.isTagValid) {
                return;
            }

            this.searchTags.push(name);
        }
    }
}
</script>

<style scoped>
.hit-tags { 
    padding: 1rem;
    background-color: #fff;
    margin-bottom: 1rem;
}

.hit-tags span {
    font-size: 20px;
    font-weight: bold;
    display: block;
}

.hit-tags::after {
    content: "";
    display: block;
    clear: both;
}

.search {
    padding: 1rem;
    margin-bottom: 2rem;
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
    background-color: #ddd;
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
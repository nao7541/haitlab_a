<template>
    <div class="skill">
        <div class="skill-title" :style="{ background: this.titleColor }">
            <slot name="delete-icon"></slot>
            {{ title }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            levelColor: {
                beginner: '#ffce1e',
                intermediate: '#ff9e1e',
                advanced: '#ff5e1e',
                expert: '#ff1e1e',
            }
        }
    },
    computed: {
        title() {
            return this.name + ' / ' + this.level;
        },
        titleColor() {
            return 'linear-gradient(-45deg,'  + this.levelColor[this.level] + ', #fff9b0)';
        }
    },
    props: ['name', 'level'],
    methods: {
    },
}
</script>

<style scoped>
.skill-title {
    float: left;
    font-size: 12px;
    font-weight: bold;
    padding: .5rem .75rem;
    margin: .25rem;
    color: #444;
    border-radius: 14px;
}
</style>
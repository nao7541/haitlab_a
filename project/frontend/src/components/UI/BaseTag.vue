<template>
    <div class="tag">
        <p :style="{backgroundColor: bgColor}">{{ tagname }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bgColor: null,
        }
    },
    props: ['tagname'],
    methods: {
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    },
    created() {
        // this.bgColor =  "#" + this.intToRGB(this.hashCode(this.tag-name));
        this.bgColor = this.getRandomColor();
    }
}
</script>

<style scoped>

.tag {
    margin: 0.2rem 0;
}

.tag p {   
    font-size: 14px;
    font-weight: bold;
    width: 8rem;
    text-align: center;
    padding: .3rem;
    border-radius: 18px;
    color: #ffffff;
}
</style>
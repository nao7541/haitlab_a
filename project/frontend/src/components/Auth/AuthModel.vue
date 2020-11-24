<template>
    <div class="auth">
        <BaseCard>
            <slot name="form"></slot>
            <div class="line"></div>
            <div class="or">
                <p>OR</p>
            </div>
            <BaseButton :text="facebookButtonTitle" class="facebook"/>
            <BaseButton :text="twitterButtonTitle" class="twitter"/>
        </BaseCard>
    </div>
</template>

<script>
export default {
    props: ['mode'],
    computed: {
        facebookButtonTitle() {
            return this.mode + ' with Facebook';
        },
        twitterButtonTitle() {
            return this.mode + ' with Twitter';
        }
    }
}
</script>

<style scoped>
.card {
    max-width: 30rem;
    padding: 2rem;
}

.line {
    padding-bottom: 1rem;
    border-bottom: 1px solid #a7a7a7;
}

.or {
    text-align: center;
    margin-top: -30px;
}

.facebook {
    color: #eeeeee;
    border-color: 1px solid #3A559F;
    background-color: #3A559F;
}

.twitter {
    color: #eeeeee;
    border-color: 1px solid #50ABF1;
    background-color: #50ABF1;
}
</style>
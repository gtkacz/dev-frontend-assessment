<template>
    <div class="ticker-card">
        <span class="column" style="display: flex; align-items: center; gap: 1vw; text-align: start">
            <h5 class="heading is-size-5">{{ticker.description}}</h5>
            <small class="is-size-7">({{ticker.displaySymbol}})</small>
        </span>
        <div class=column style="display: flex; align-items: center; gap: 1vw; text-align: start">
            <h5 class="is-size-5">{{ticker.currency}}</h5>
            <img :src="`https://flagsapi.com/${ticker.currency.slice(0, 2)}/flat/16.png`" :alt="`${ticker.currency.slice(0, 2)} Flag`">
        </div>
        <div class="column">
            <h5 class="is-size-5">{{ticker.type}}</h5>
        </div>
    </div>
</template>

<script>
export default {
    name : "TickerCard",
    props : {
        ticker : {
            type : Object,
            required : true
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/css/app.scss";

    .local-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10vw;
    }

    .ticker-card {
        @extend .local-container;

        border: 1px solid transparent !important;

        &:hover {
            transition: all 100ms ease-in-out !important;
            box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2) !important;
            border: 1px solid $primary !important;
            border-radius: 1ch;
            cursor: pointer !important;
            transform: scale(1.02) !important;

            span, h5, small {
                color: $primary !important;
            }
        }
    }
</style>
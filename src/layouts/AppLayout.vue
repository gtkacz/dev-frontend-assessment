<template>
    <div id="app-layout" class="app">

        <div class="primary-layout-con">

            <div class="primary-menu-con">
                <div class="menu-items">
                    <div class="logo-con">
                        <img src="../assets/image/logo.png" class="image">
                    </div>
                    <router-link :to="{ name: $ROUTES.HOME }" exact class="item tooltip is-tooltip-right"
                        data-tooltip="Home">
                        <i class="fa fa-home"></i>
                    </router-link>
                    <router-link :to="{ name: $ROUTES.SYMBOLS }" exact class="item tooltip is-tooltip-right"
                        data-tooltip="Symbols">
                        <i class="fa fa-briefcase"></i>
                    </router-link>
                </div>
            </div>

            <div class="primary-content-con" style="height:100%">

                <div class="primary-content">
                    <transition>
                        <router-view></router-view>
                    </transition>
                </div>

            </div>

        </div>


    </div>
</template>

<script>
export default {
    name: 'AppLayout',
}
</script>

<style scoped lang="scss">
@import "../assets/css/_theme.scss";

.primary-layout-con {

    width: 100%;
    height: 100%;
    display: block;
    position: relative;

    $menuWidth: 64px;

    &>.primary-menu-con {
        width: $menuWidth;
        background-color: rgba($color: #000000, $alpha: 0.4) !important;
        backdrop-filter: blur(3ch);
        text-align: center;
        position: fixed;
        height: 100vh;
        top: 0;
        //keeps tooltips from getting hidden behind main page content
        z-index: 1;

        .logo-con {
            margin-left: $menuWidth * 0.1;
            margin-top: $menuWidth * 0.1;
            margin-bottom: 1em;

            img {
                height: $menuWidth * 0.8;
                width: auto;
                aspect-ratio: 1/1 !important;
            }
        }

        .item {
            display: block;
            width: 100%;
            padding: 15px 0;
            color: $white-bis;
            cursor: pointer;

            &.router-link-active,
            &router-link-exact-active {
                border-left: 2px solid $primary;
                color: $primary;
            }

            &.is-dashboard {
                border-left: none;
            }

            &:not(.router-link-active) {
                &:hover {
                    transition: color 0.3s ease-in-out;
                    transition: border-left 0.1s ease-in-out;
                    border-left: 2px solid $primary;
                    color: $primary;
                }
            }

            .fa {
                font-size: 24px;
            }
        }

    }

    &>.primary-content-con {
        .primary-content {
            height: 100%;

            &>div {
                height: 100%;
            }
        }

    }

}
</style>

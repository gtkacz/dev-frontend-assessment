<template>
    <div>
      <div class="primary-heading-con">
          <div class="heading">
              <div class="title">Symbols/Tickers</div>
          </div>
      </div>

      <div class="page-content-con">
          <loading v-if="loading"></loading>
          <main v-else>
            <div>
                <TickerTable :tickers="tickers"/>
            </div>
        </main>
      </div>

    </div>
</template>

<script>
import FinnhubApi from "@/api/FinnhubApi";

export default {
    name : "Symbols",
    data () {
        return {
            loading : true,
            tickers : [],
        };
    },
    beforeMount () {
        FinnhubApi.getTickers().then(response => {
            this.tickers = response.data;
        }).finally(() => {
            this.loading = false;
        });
    },
}
</script>

<style lang="scss" scoped>
    @import '../assets/css/_theme';
    .ticker {
        margin-bottom:10px;
        padding-bottom:10px;
        border-bottom:1px solid $white-ter;
    }
</style>

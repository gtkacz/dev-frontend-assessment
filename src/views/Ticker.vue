<template>
  <div>
    <div class="primary-heading-con">
      <div class="heading">
        <div class="title">{{ symbol }}</div>
      </div>
    </div>

    <main class="page-content-con">
      <loading v-if="loading"></loading>
      <section v-else>
        <div>
          <div>
            <img :src="ticker.logo" :alt="ticker.name + `Logo`" class="company_logo" />
            <h3 class="company_name">
              <a :href="ticker.weburl" target="_blank" class="has-text-link">{{
                ticker.name
              }}</a>
            </h3>
            <h4 class="company_info">{{ ticker.finnhubIndustry }}</h4>
          </div>

          <hr />

          <div class="company_section">
            <h4 class="section_title">Company Profile</h4>
            <div
              style="
                display: flex;
                gap: 0.25rem;
                align-items: center;
                justify-content: center;
              "
            >
              <span>Country: </span>
              <img
                :src="`https://flagsapi.com/${ticker.country}/flat/16.png`"
                :alt="`${ticker.currency.slice(0, 2)} Flag`"
              />
            </div>
            <span>Currency: {{ ticker.currency }}</span>
            <div>
              <span>Exchange: {{ ticker.exchange }}</span
              ><br />
              <span>Open: </span>
              <i
                class="fa"
                :class="{
                  'fa-thumbs-up': market.isOpen,
                  'fa-thumbs-down': !market.isOpen,
                  'has-text-success': market.isOpen,
                  'has-text-danger': !market.isOpen,
                }"
              />
            </div>
            <div>
              <span>Market capitalization: </span>
              <money
                :class="
                  ticker.marketCapitalization > 0 ? 'has-text-success' : 'has-text-danger'
                "
                :value="ticker.marketCapitalization"
              />
            </div>
            <div>
              <span>Outstanding shares: </span>
              <number
                :class="
                  ticker.shareOutstanding > 0 ? 'has-text-success' : 'has-text-danger'
                "
                :value="ticker.shareOutstanding"
              />
            </div>

            <!--  -->

            <!-- <div class="company_section">
              <h4 class="section_title">Financials</h4>

              <div>
                <span>Last traded price: {{ ticker.quote.c }}</span>
              </div>
            </div> -->
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import FinnhubApi from "@/api/FinnhubApi";

export default {
  name: "Ticker",
  data() {
    return {
      loading: true,
      symbol: this.$route.params.symbol,
      ticker: {},
      market: {},
    };
  },
  watch: {
    "$route.params.symbol"(newSymbol) {
      this.symbol = newSymbol;
    },
  },
  methods: {
    fetchTickerDetails() {
      FinnhubApi.getMarketStatus().then((response) => {
        this.market = response.data;
      });

      FinnhubApi.getCompanyInfo(this.symbol).then((response) => {
        this.ticker = response.data;
      });

      FinnhubApi.getCompanyFinancial(this.symbol).then((response) => {
        this.ticker.financials = response.data;
      });

      FinnhubApi.getCompanyQuote(this.symbol).then((response) => {
        this.ticker.quote = response.data;
      });

      this.loading = false;
    },
  },
  beforeMount() {
    this.fetchTickerDetails();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/app.scss";

.company_logo {
  width: 15ch;
  height: auto;
  border-radius: 50%;
  aspect-ratio: 1/1;
}

.company_name {
  font-size: 2rem;
  font-weight: 700;
}

.section_title {
  font-size: 1.5rem;
  font-weight: 500;
}

.company_section {
  // max-width: max-content;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  // border: 1px solid $font-color;
  border-radius: 0.5rem;
}
</style>

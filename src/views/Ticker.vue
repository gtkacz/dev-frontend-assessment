<template>
  <div>
    <header class="primary-heading-con">
      <h1 class="heading">
        <span class="title">{{ symbol }}</span>
      </h1>
    </header>

    <main class="page-content-con">
      <loading v-if="loading"></loading>
      <section v-else>
        <article>
          <figure>
            <img :src="ticker.logo" :alt="ticker.name + ` Logo`" class="company_logo" />
            <figcaption
              style="
                display: flex;
                gap: 0.75rem;
                align-items: center;
                justify-content: center;
              "
            >
              <h2 class="company_name">
                <a :href="ticker.weburl" target="_blank" class="has-text-link">{{ ticker.name }}</a>
              </h2>
              <img
                :src="`https://flagsapi.com/${ticker.country}/flat/32.png`"
                :alt="`${ticker.currency.slice(0, 2)} Flag`"
              />
            </figcaption>
          </figure>
          <h3 class="company_info">{{ ticker.finnhubIndustry }}</h3>

          <hr />

          <section class="company_section">
            <h4 class="section_title">Company Profile</h4>
            <p>Currency: {{ ticker.currency }}</p>
            <div>
              <p>Exchange: {{ ticker.exchange }}</p>
              <p>
                Open: 
                <i
                  class="fa"
                  :class="{
                    'fa-thumbs-up': market.isOpen,
                    'fa-thumbs-down': !market.isOpen,
                    'has-text-success': market.isOpen,
                    'has-text-danger': !market.isOpen,
                  }"
                />
              </p>
            </div>
            <div>
              <p>Market capitalization: 
                <money
                  :class="ticker.marketCapitalization > 0 ? 'has-text-success' : 'has-text-danger'"
                  :value="ticker.marketCapitalization"
                />
              </p>
            </div>
            <div>
              <p>Outstanding shares: 
                <number
                  :class="ticker.shareOutstanding > 0 ? 'has-text-success' : 'has-text-danger'"
                  :value="ticker.shareOutstanding"
                />
              </p>
            </div>
          </section>

          <section class="company_section">
            <h4 class="section_title">Financials</h4>
            <div>
              <p>Last traded price: 
                <money
                  :class="quote.c > 0 ? 'has-text-success' : 'has-text-danger'"
                  :value="quote.c"
                />
                <span :class="quote.dp > 0 ? 'has-text-success' : 'has-text-danger'">
                  ({{ quote.dp }}%)
                </span>
              </p>
              <p>52-week high: 
                <money
                  :class="financials.metric['52WeekHigh'] > 0 ? 'has-text-success' : 'has-text-danger'"
                  :value="financials.metric['52WeekHigh']"
                />
              </p>
              <p>52-week low: 
                <money
                  :class="financials.metric['52WeekLow'] > 0 ? 'has-text-success' : 'has-text-danger'"
                  :value="financials.metric['52WeekLow']"
                />
                <span> on <span class="has-text-primary">{{ financials.metric['52WeekLowDate'] }}</span></span>
              </p>
              <p>52-week daily return: 
                <number
                  :class="financials.metric['52WeekPriceReturnDaily'] > 0 ? 'has-text-success' : 'has-text-danger'"
                  :value="financials.metric['52WeekPriceReturnDaily']"
                />
              </p>
              <p>Beta: 
                <number
                  :class="financials.metric.beta > 0 ? 'has-text-success' : 'has-text-danger'"
                  :value="financials.metric.beta"
                />
              </p>
            </div>
          </section>
        </article>
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
      financials: {},
      quote: {},
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
        this.financials = response.data;
      });

      FinnhubApi.getCompanyQuote(this.symbol).then((response) => {
        this.quote = response.data;
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
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.5rem;
}
</style>

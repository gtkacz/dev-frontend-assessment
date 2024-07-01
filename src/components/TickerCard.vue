<template>
  <div class="ticker-card">
    <span
      class="column"
      style="display: flex; align-items: center; gap: 1vw; text-align: start"
    >
      <img
        :src="`https://eodhd.com/img/logos/US/${ticker.displaySymbol}.png`"
        :alt="`Logo for ${ticker.description}`"
        class="companyLogo"
        onerror="javascript:this.src='https://static-00.iconduck.com/assets.00/question-mark-circle-icon-512x512-3ysq58ug.png'"
      />
      <h5 class="heading is-size-5">
        {{
          ticker.description
            .replace("-CL A", "")
            .replace("-CL B", "")
            .replace("-CL C", "")
            .replace("- CL A", "")
            .replace("- CL B", "")
            .replace("- CL C", "")
            .replace("-CLASS A", "")
            .replace("-CLASS B", "")
            .replace("-CLASS C", "")
            .replace("- CLASS A", "")
            .replace("- CLASS B", "")
            .replace("- CLASS C", "")
        }}
      </h5>
      <small class="is-size-7">({{ ticker.displaySymbol }})</small>
    </span>
    <div
      class="column"
      style="display: flex; align-items: center; gap: 1vw; text-align: start"
    >
      <h5 class="is-size-5">{{ ticker.currency }}</h5>
      <img
        :src="`https://flagsapi.com/${ticker.currency.slice(0, 2)}/flat/16.png`"
        :alt="`${ticker.currency.slice(0, 2)} Flag`"
      />
    </div>
    <div class="column">
      <h5 class="is-size-5">{{ ticker.type }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "TickerCard",
  props: {
    ticker: {
      type: Object,
      required: true,
    },
  },
};
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

    span,
    h5,
    small {
      color: $primary !important;
    }
  }
}

.companyLogo {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
}
</style>

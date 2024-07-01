<template>
  <div>
    <i class="fa fa-search" @click="showSearch = !showSearch" style="cursor: pointer" :style="{color: showSearch ? `orange` : `grey`}" />
    <div class="table-headers">
      <div>
        <div>
          <input
            type="text"
            v-model="searchDescription"
            placeholder="Description"
            v-if="showSearch"
          />
          <span v-else @click="sortBy('description')"> Description </span>
          <i :class="sortIcon('description')" @click="sortBy('description')"></i>
        </div>
  
        <div>
          <input
            type="text"
            v-model="searchSymbol"
            placeholder="Symbol"
            v-if="showSearch"
          />
          <span v-else @click="sortBy('symbol')"> Symbol </span>
          <i :class="sortIcon('symbol')" @click="sortBy('symbol')"></i>
        </div>
      </div>

      <div>
        <input
          type="text"
          v-model="searchCurrency"
          placeholder="Currency"
          v-if="showSearch"
        />
        <span v-else @click="sortBy('currency')"> Currency </span>
        <i :class="sortIcon('currency')" @click="sortBy('currency')"></i>
      </div>

      <div>
        <input type="text" v-model="searchType" placeholder="Type" v-if="showSearch" />
        <span v-else @click="sortBy('type')"> Type </span>
        <i :class="sortIcon('type')" @click="sortBy('type')"></i>
      </div>
    </div>

    <div v-for="ticker in paginatedTickers" :key="ticker.displaySymbol">
      <TickerCard :ticker="ticker" />
    </div>
    <div class="pagination">
      <i
        class="fa fa-chevron-left pagination-icon"
        @click="prevPage"
        :disabled="currentPage === 1"
      />
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <i
        class="fa fa-chevron-right pagination-icon"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      />
    </div>
  </div>
</template>

<script>
import TickerCard from "./TickerCard.vue";
import "../assets/css/app.scss";

export default {
  name: "TickerTable",
  components: { TickerCard },
  props: {
    tickers: {
      type: Array,
      required: true,
    },
    maxPerPage: {
      type: Number,
      default: 50,
    },
    initialSortColumn: {
      type: String,
      default: "description",
    },
  },
  data() {
    return {
      searchDescription: "",
      searchSymbol: "",
      searchCurrency: "",
      searchType: "",
      currentPage: 1,
      perPage: this.maxPerPage,
      sortKey: this.initialSortColumn,
      sortOrder: 1, // default to ascending order
      showSearch: false,
    };
  },
  computed: {
    filteredTickers() {
      return this.tickers.filter((ticker) => {
        return (
          ticker.description
            .toLowerCase()
            .includes(this.searchDescription.toLowerCase()) &&
          ticker.displaySymbol.toLowerCase().includes(this.searchSymbol.toLowerCase()) &&
          ticker.currency.toLowerCase().includes(this.searchCurrency.toLowerCase()) &&
          ticker.type.toLowerCase().includes(this.searchType.toLowerCase())
        );
      });
    },
    sortedTickers() {
      if (!this.sortKey) return this.filteredTickers;
      return this.filteredTickers.slice().sort((a, b) => {
        let result = 0;
        if (a[this.sortKey] < b[this.sortKey]) result = -1;
        if (a[this.sortKey] > b[this.sortKey]) result = 1;
        return result * this.sortOrder;
      });
    },
    totalPages() {
      return Math.ceil(this.sortedTickers.length / this.perPage);
    },
    paginatedTickers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.sortedTickers.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = ((this.sortOrder + 2) % 3) - 1; // Cycle through 0, 1, -1
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
    },
    sortIcon(key) {
      if (this.sortKey !== key) return "fa fa-sort";
      if (this.sortOrder === 1) return "fa fa-sort-up";
      if (this.sortOrder === -1) return "fa fa-sort-down";
      return "fa fa-sort";
    },
  },
  watch: {
    searchDescription() {
      this.currentPage = 1;
    },
    searchSymbol() {
      this.currentPage = 1;
    },
    searchCurrency() {
      this.currentPage = 1;
    },
    searchType() {
      this.currentPage = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/app.scss";

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  & > span {
    cursor: default;
  }
}

.pagination-icon {
  cursor: pointer;

  &:hover {
    transition: all 100ms ease-in-out;
    color: $primary;
  }

  &[disabled] {
    color: $grey-dark;
    cursor: not-allowed;
  }
}

input {
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid $font-color;
  border-radius: 0.5rem;
  background-color: transparent;

  &:focus {
    outline: none;
    border: 1px solid $primary;
  }
}

.table-headers {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10vw;
  margin-bottom: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: default;

    span,
    i {
      cursor: pointer;
    }
  }
}
</style>

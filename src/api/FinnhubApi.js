import apiCreator from './util/ApiCreator';
import moment from 'moment';

const api = apiCreator(
    'https://finnhub.io/api/v1',
    {
        params: {
            token: 'cpu373pr01qj8qq10b3gcpu373pr01qj8qq10b40',
        },
    }
);

export default {
    getTickers() {
        return api.get(`stock/symbol`, {
            params: {
                exchange: 'US',
                securityType: 'Common Stock',
                currency: 'USD',
                // mic : 'XNAS',
            }
        });
    },

    getMarketStatus() {
        return api.get(`stock/market-status`, {
            params: {
                exchange: 'US',
            }
        });
    },

    getCompanyInfo(symbol) {
        return api.get(`stock/profile2`, {
            params: {
                symbol: symbol,
            }
        });
    },

    getCompanyFinancial(symbol) {
        return api.get(`stock/metric`, {
            params: {
                symbol: symbol,
                metric: 'all',
            }
        });
    },

    getCompanyQuote(symbol) {
        return api.get(`/quote`, {
            params: {
                symbol: symbol,
            }
        });
    },
}

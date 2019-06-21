/*
 *
 */
export default {
    state: {
        companyId: null
    },

    mutations: {
        mutationSetCompanyId: (state, companyId) => {
            state.companyId = companyId
        }
    },

}
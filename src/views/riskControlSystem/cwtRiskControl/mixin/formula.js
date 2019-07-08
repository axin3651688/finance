import {mapGetters} from "vuex"

export default {
    computed: {
        ...mapGetters(["device", "user", "showDims"])
    },

    methods: {

    }
}
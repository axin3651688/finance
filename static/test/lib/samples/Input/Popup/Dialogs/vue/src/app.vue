<template>
    <div class="container-fluid">
        <button class="btn btn-primary btn-space" @click="frmLoginPopup.show(true)">
            Log In
        </button>

        <button class="btn btn-primary btn-space" @click="frmCreateAccountPopup.show(true)">
            Create Account
        </button>

        <button class="btn btn-primary" @click="frmEditAccountPopup.show(true)">
            Edit Account
        </button>

        <!-- Log In form -->
        <wj-popup id="frmLoginPopup" :initialized="initForm">
            <form @submit.prevent="onSubmit(frmLoginPopup)">
                <h4 class="modal-header">
                    Log in
                    <button type="button" tabindex="-1" class="close wj-hide">&times;</button>
                </h4>
                <div class="modal-body">
                    <label>
                        Email:
                        <input class="form-control" required type="email"/>
                    </label>
                    <br />
                    <label>
                        Password:
                        <input class="form-control" type="password" required pattern=".{4,}"
                            title="Please enter 4 characters or more."/>
                    </label>
                    <br />
                    <label>
                        Remember Me
                        <input class="remember" type="checkbox" v-model="isRemember"/>
                    </label>
                    <br />
                    <a href="" class="wj-hide-create" @click="frmCreateAccountPopup.show(true)">Don't have an account
                        yet?</a>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary">
                        Log in
                    </button>
                </div>
            </form>
        </wj-popup>

        <!-- Create Account form -->
        <wj-popup id="frmCreateAccountPopup" :initialized="initForm">
            <form @submit.prevent="onSubmit(frmCreateAccountPopup)">
                <h4 class="modal-header">
                    Create Account
                    <button type="button" tabindex="-1" class="close wj-hide">&times;</button>
                </h4>
                <div class="modal-body">
                    <label>
                        Name:
                        <input class="form-control" required pattern=".{2,}" title="Please enter 2 characters or more." />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input class="form-control" type="email" required />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input name="pswdFrmCreate" class="form-control" type="password" required pattern=".{4,}"
                            v-model="pw1" title="Please enter 4 characters or more." />
                    </label>
                    <br />
                    <label>
                        Confirm Password:
                        <input class="form-control" name="cnfrmPswdFrmCreate" v-model="pw2" type="password" required
                            validateEqual="pswdFrmCreate"/>
                        <small
                            :hidden="cnfrmPswdFrmCreateValid">
                            Passwords don't match.
                        </small>
                    </label>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="submit">
                        Create Account
                    </button>
                </div>
            </form>
        </wj-popup>

        <!-- Edit Account form -->
        <wj-popup id="frmEditAccountPopup" :initialized="initForm">
            <form @submit.prevent="onSubmit(frmEditAccountPopup)">
                <h4 class="modal-header">
                    Edit Account
                    <button type="button" tabindex="-1" class="close wj-hide">&times;</button>
                </h4>
                <div class="modal-body">
                    <label>
                        Email:
                        <input class="form-control" required type="email" />
                    </label>
                    <br />
                    <label>
                        Current Password:
                        <input class="form-control" type="password" required pattern=".{4,}"
                            title="Please enter 4 characters or more." />
                    </label>
                    <br />
                    <label>
                        New Name:
                        <input class="form-control" required pattern=".{2,}" title="Please enter 2 characters or more." />
                    </label>
                    <br />
                    <label>
                        New Password:
                        <input name="pswdFrmEdit" v-model="pw3" class="form-control" type="password" required
                            pattern=".{4,}" title="Please enter 4 characters or more." />
                    </label>
                    <br />
                    <label>
                        Confirm New Password:
                        <input class="form-control" name="cnfrmPswdFrmEdit" v-model="pw4" type="password" required
                            validateEqual="pswdFrmEdit" />
                        <small :hidden="cnfrmPswdFrmEditValid">
                            Passwords don't match.
                        </small>
                    </label>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" type="submit">
                        Update Account
                    </button>
                </div>
            </form>
        </wj-popup>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                pw1: '',
                pw2: '',
                pw3: '',
                pw4: '',
                isRemember: false,
                frmLoginPopup: {},
                frmCreateAccountPopup: {},
                frmEditAccountPopup: {},
                cnfrmPswdFrmEditValid: true,
                cnfrmPswdFrmCreateValid: true
            }
        },
        methods: {
            initForm: function(popup){
                this[popup.hostElement.id] = popup;
            },
            onSubmit: function(popup){
                alert('form submitted');
                popup.hide();
            }
        },
        watch: {
            pw2: function(){
                this.cnfrmPswdFrmCreateValid = this.pw2 != this.pw1 ? false : true;
            },
            pw4: function(){
                this.cnfrmPswdFrmEditValid = this.pw4 != this.pw3 ? false : true;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .modal-body {
        min-width: 300px;
    }

    input:invalid {
        border-color: red;
    }

    body {
        margin-bottom: 24pt;
    }

    .btn-space {
        margin-right: 5px !important;
    }
</style>

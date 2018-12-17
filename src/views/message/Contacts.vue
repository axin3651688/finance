<template>
    <div class="Contacts vue-module">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane name="Teams">
                <template slot="label">
                    我的团队
                    <i class="splide-line"></i>
                </template>
                <contacts-teams></contacts-teams>
            </el-tab-pane>
            <el-tab-pane name="friends">
                <template slot="label">
                    我的好友
                    <i class="splide-line"></i>
                </template>
                <contacts-friends></contacts-friends>
            </el-tab-pane>
            <el-tab-pane label="我的群聊" name="groups">
                <contacts-groups></contacts-groups>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    // 消息》通讯
    import ContactsTeams from './ContactsTeams' // 我的团队 pane
    import ContactsFriends from './ContactsFriends' // 我的团队 pane
    import ContactsGroups from './ContactsGroups' // 我的群聊 pane

    export default {
        name: "Contacts",
        components: {
            ContactsTeams,
            ContactsFriends,
            ContactsGroups
        },
        data() {
            return {
                activeName2: 'Teams'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@s/green/variables.scss";

    .vue-module {
        overflow: hidden;
        margin: 40px 40px 0 40px;
        background: #ffffff;
        height: 100%;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }
    /deep/ .el-tabs {
        height: 100%;
        .el-tabs__header {
            margin-bottom: 0;
            .el-tabs__nav {
                border: none;
            }
            .el-tabs__item {
                $tabsItemHeight: 50px;
                height: $tabsItemHeight;
                line-height: $tabsItemHeight;
                padding-left: 40px;
                padding-right: 40px;
                border: none;
                color: $colorText3;
                .splide-line {
                    width: 1px;
                    height: 30px;
                    background: #cccccc;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .el-tabs__item.is-active {
                color: #ffffff;
                background: $colorTheme;
                .splide-line {
                    background: transparent;
                }
            }
        }
        .el-tabs__content {
            height: 100%;
        }
        .el-tab-pane {
            height: 100%;
        }
    }

    /deep/ .el-collapse {
        border: none;
    }
</style>
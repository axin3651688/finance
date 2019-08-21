import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {
    getClientParams
} from "utils/index";
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            // redirect: '/message',
            redirect: '/login'
        },
        {
            path: '/',
            name: '我的工作台',
            component: () =>
                import ('@v/layout/BorderPage'),
            children: [{
                    path: '/main',
                    name: 'main',
                    component: () =>
                        import ('@v/BiModule'),
                },
                // 列表
                {
                    path: '/list',
                    name: 'list',
                    component: () =>
                        import ('@v/intelligenceReport/List.vue')
                },

                // 消息模块
                {
                    path: '/message',
                    name: 'message',
                    component: () =>
                        import ('@v/message/Message.vue')
                },
                // 公司
                {
                    path: '/company',
                    name: 'company',
                    component: () =>
                        import ('@v/test/Company.vue')
                },
                // 用户
                {
                    path: '/user',
                    name: 'user',
                    component: () =>
                        import ('@v/test/User.vue')
                },
                // 角色
                {
                    path: '/role',
                    name: 'role',
                    component: () =>
                        import ('@v/test/Role.vue')
                },
                // {
                //     path: '/fillData',
                //     name: 'fillData',
                //     component: () =>
                //         import ('@v/intelligenceReport/HTandtable.vue')
                // },
                {
                    path: '/fillData',
                    name: 'fillData',
                    component: () =>
                        import ('@v/intelligenceReport/HTandtable1.vue')
                },
                {
                    path: '/interaction',
                    name: 'interaction',
                    component: () =>
                        import ('@v/intelligenceReport/Interaction.vue')
                },
                {
                    path: '/progressStatistics',
                    name: 'progressStatistics',
                    component: () =>
                        import ('@v/intelligenceReport/progressStatistics.vue')
                },
                {
                    path: '/SFillTable',
                    name: 'SFillTable',
                    component: () =>
                        import ('@v/intelligenceReport/SHandSonTable.vue')
                },
                {
                    path: '/c',
                    name: 'cx',
                    component: () =>
                        import ('@v/intelligenceReport/a.1.vue')
                },
                {
                    path: '/i',
                    name: 'iiii',
                    component: () =>
                        import ('@c/Itable.vue')
                }, // 角色
                {
                    path: '/roles',
                    name: 'roles',
                    component: () =>
                        import ('@v/test/Role.vue')
                },
                //风控的路由
                // 风险识别与评估sjz
                {
                    path: '/riskDis',
                    name: 'riskDis',
                    component: () =>
                        import ('@v/riskControlSystem/sjzRiskControl/riskDis.vue')
                },
                //风险报告sjz
                {
                    path: '/riskReport',
                    name: 'riskReport',
                    component: () =>
                        import ('@v/riskControlSystem/sjzRiskControl/riskReport.vue')
                },
                // 风险统计sjz
                {
                    path: '/riskStatistics',
                    name: 'riskStatistics',
                    component: () => 
                        import ('@v/riskControlSystem/riskStatistics/riskStatistics.vue')
                },
                //风险管控
                {
                    path: '/riskControl',
                    name: 'riskControl',
                    component: () =>
                        import ('@v/riskControlSystem/szcRiskControl/riskControl.vue')
                },
                //风险反馈
                {
                    path: '/riskFeedback',
                    name: 'riskFeedback',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/riskFeedback/riskFeedback.vue')
                },
                //风险追踪
                {
                    path: '/riskInstructions',
                    name: 'riskInstructions',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/riskTrack/riskTrack.vue')
                },

                //人才队伍
                {
                    path: '/talentTeam',
                    name: 'talentTeam',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/talentTeam/talentTeam.vue')
                },
                //风险制度
                {
                    path: '/riskSystem',
                    name: 'riskSystem',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/riskSystem/riskSystem.vue')
                },
                // 风险指引制度 sjz （1版）
                {
                    path: '/riskGuidanceSystem2',
                    name: 'riskGuidanceSystem2',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/riskGuidanceSystem/riskGuidanceSystem.vue')
                },
                // 风险指引制度 sjz （1版）
                {
                    path: '/riskGuidanceSystem',
                    name: 'riskGuidanceSystem',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/riskGuidanceSystem2/riskGuidance.vue')
                },
                //组织架构
                {
                    path: '/organization',
                    name: 'organization',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/organization/organization.vue')
                },
                //预警报告
                {
                    path: '/warningReport',
                    name: 'warningReport',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/warningReport/warningReport.vue')
                },
                //行业对标
                {
                    path: '/industryBenchmarking',
                    name: 'industryBenchmarking',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/industryBenchmarking/industryBenchmarking.vue')
                },
                //市企对标
                {
                    path: '/cityBenchmarking',
                    name: 'cityBenchmarking',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/cityBenchmarking/cityBenchmarking.vue')
                },
                //集团指标
                {
                    path: '/groupIndicators',
                    name: 'groupIndicators',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/groupIndicators/groupIndicators.vue')
                },
                //国资委考核指标
                {
                    path: '/assessmentIndicators',
                    name: 'assessmentIndicators',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/assessmentIndicators/assessmentIndicators.vue')
                },



                //国资委考核指标
                {
                    path: '/profitForecastingModel',
                    name: 'profitForecastingModel',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/predictiveModel/profitForecastingModel.vue')
                },
                //国资委考核指标
                {
                    path: '/assetStructurePrediction',
                    name: 'assetStructurePrediction',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/predictiveModel/assetStructurePrediction.vue')
                },
                //国资委考核指标
                {
                    path: '/forecastOfSolvency',
                    name: 'forecastOfSolvency',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/predictiveModel/forecastOfSolvency.vue')
                },
                //国资委考核指标
                {
                    path: '/duPontPredictionModel',
                    name: 'duPontPredictionModel',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/predictiveModel/duPontPredictionModel.vue')
                },
                //国资委考核指标
                {
                    path: '/EVAPredictionModel',
                    name: 'EVAPredictionModel',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/predictiveModel/EVAPredictionModel.vue')
                },
                //国资委考核指标
                {
                    path: '/capitalChainAndFinancingForecast',
                    name: 'capitalChainAndFinancingForecast',
                    component: () =>
                        import ('@v/riskControlSystem/cwtRiskControl/predictiveModel/capitalChainAndFinancingForecast.vue')
                }
            ]
        },
        {
            path: '/',
            name: '集团对标',
            component: () =>
                import ('@v/layout/BorderPage'),
            children: [{
                    path: '/insideBenchmarking',
                    name: '内部对标',
                    component: () =>
                        import ('@v/riskControlSystem/szcRiskControl/riskWarning/groupBenchmarking/insideBenchmarking.vue'),
                },
                {
                    path: '/comprehensiveRating',
                    name: 'comprehensiveRating',
                    component: () =>
                        // import ('@v/riskControlSystem/szcRiskControl/riskWarning/groupBenchmarking/comprehensiveRating.vue'),
                        import ('@v/riskControlSystem/szcRiskControl/riskWarning/groupBenchmarking/tabShell.vue'),
                },
                {
                    path: '/profitability',
                    name: 'profitability',
                    component: () =>
                        import ('@v/riskControlSystem/szcRiskControl/riskWarning/groupBenchmarking/tabShell.vue'),
                },
                {
                    path: '/developmentAbility',
                    name: 'developmentAbility',
                    component: () =>
                        import ('@v/riskControlSystem/szcRiskControl/riskWarning/groupBenchmarking/tabShell.vue'),
                },
                {
                    path: '/operationQuality',
                    name: 'operationQuality',
                    component: () =>
                        import ('@v/riskControlSystem/szcRiskControl/riskWarning/groupBenchmarking/tabShell.vue'),
                },
                {
                    path: '/debtRisk',
                    name: 'debtRisk',
                    component: () =>
                        import ('@v/riskControlSystem/szcRiskControl/riskWarning/groupBenchmarking/tabShell.vue'),
                },
                {
                    path: '/listingBenchmarking',
                    name: 'listingBenchmarking',
                    component: () =>
                        import ('@v/riskControlSystem/szcRiskControl/riskWarning/groupBenchmarking/listingBenchmarking.vue'),
                }
            ]
        },
        {
            path: '/',
            name: '各种charts',
            component: () =>
                import ('@v/layout/BorderPage'),
            children: [{
                    path: '/BiFunnel',
                    name: 'BiFunnel',
                    component: () =>
                        import ('@c/charts/BiFunnel'),
                }, {
                    path: '/BiRadar',
                    name: 'BiRadar',
                    component: () =>
                        import ('@c/charts/BiRadar'),
                },
                {
                    path: '/BiPie',
                    name: 'BiPie',
                    component: () =>
                        import ('@c/charts/BiPie'),
                }, {
                    path: '/BiTreemap',
                    name: 'BiTreemap',
                    component: () =>
                        import ('@c/charts/BiTreemap'),
                }
            ]
        },
        {
            path: '/',
            name: 'test路由',
            component: () =>
                import ('@v/layout/BorderPage'),
            children: [{
                    path: '/treeTest',
                    name: 'treeTest',
                    component: () =>
                        import ('@v/test/treeTest'),
                },
                {
                    path: '/BiTreema',
                    name: 'BiTreema',
                    component: () =>
                        import ('@c/charts/BiTreemap')

                },
                {
                    path: '/father',
                    name: 'father',
                    component: () =>
                        import ('@v/test/father'),
                },
                {
                    path: '/genarateTree',
                    name: 'genarateTree',
                    component: () =>
                        import ('@v/test/genarateTree'),
                },

                {
                    path: '/productIntroduction',
                    name: 'productIntroduction',
                    component: () =>
                        import ('@v/test/eleTreeTable'),
                },
                // {// sjz 专用测试
                //   path: '/testDebug',
                //   name: 'testDebug',
                //   component: () =>
                //     import('@v/test/testDebug'),
                // },
                // {// sjz 专用测试
                //   path: '/treeTable',
                //   name: 'treeTable',
                //   component: () =>
                //     import('@c/treeTable/treeGrid'),
                // },
                // {// sjz 专用测试(用户管理)
                //   path: '/com',
                //   name: 'com',
                //   component: () =>
                //     import('@c/treeTable/com'),
                // },
                { // sjz 专用测试(日志管理)
                    path: '/log',
                    name: 'log',
                    component: () =>
                        import ('@v/systemSettings/log')
                },
                { // sjz 专用测试(在线用户)
                    path: '/online',
                    name: 'online',
                    component: () =>
                        import ('@v/systemSettings/online')
                },
                { //市管企业经营业绩情况表
                    path: '/sg',
                    name: 'sg',
                    component: () =>
                        import ('@v/systemSettings/cityResults')
                },
                { //市管企业经营业绩情况表（2）
                    path: '/sgyj',
                    name: 'sgyj',
                    component: () =>
                        import ('@v/systemSettings/cityResults2')
                },
                { //EVA表（sjz）
                    path: '/eva',
                    name: 'eva',
                    component: () =>
                        import ('@v/systemSettings/EVA')
                },
                { // 图片管理（sjz）
                    path: '/dimension',
                    name: 'dimension',
                    component: () =>
                        import ('@v/systemSettings/Image_management/dimension')
                },
                { // 参数设置---【集团指标数据维护】 （sjz）
                    path: '/groupSetting',
                    name: 'groupSetting',
                    component: () =>
                        import ('@v/systemSettings/parameterSetting/group_management/groupSetting')
                },
                { // 参数设置---【国资指标数据维护】 （sjz）
                    path: '/assets',
                    name: 'assets',
                    component: () =>
                        import ('@v/systemSettings/parameterSetting/assets_management/assetsSetting')
                },
                { // 参数设置---【行业指标数据维护】 （sjz）
                    path: '/industry',
                    name: 'industry',
                    component: () =>
                        import ('@v/systemSettings/parameterSetting/industry_management/industrySetting')
                },
                { // 参数设置---【市企指标数据维护】 （sjz）
                    path: '/enterprise',
                    name: 'enterprise',
                    component: () =>
                        import ('@v/systemSettings/parameterSetting/city_management/citySetting')
                },
                { // 参数设置---【上市指标数据维护】 （sjz）
                    path: '/listed',
                    name: 'listed',
                    component: () =>
                        import ('@v/systemSettings/parameterSetting/listed_management/listedSetting')
                },
                { // 全局控制（sjz）globalControl
                    path: '/globalControl',
                    name: 'globalControl',
                    component: () =>
                        import ('@v/systemSettings/globalControl')
                },
                { // 初始化管理
                    path: '/initialize',
                    name: 'initialize',
                    component: () =>
                        import ('@v/systemSettings/initialize')
                },
                { // 应收账款（sjz）
                    path: '/yszk',
                    name: 'yszk',
                    component: () =>
                        import ('@v/yskxx/yszk')
                },
                { // 预付账款（sjz）
                    path: '/yfzk',
                    name: 'yfzk',
                    component: () =>
                        import ('@v/yskxx/yfzk.vue')
                },
                { // 其他应收款（sjz）
                    path: '/qtysk',
                    name: 'qtysk',
                    component: () =>
                        import ('@v/yskxx/qtysk.vue')
                },
                { //数据抽取（sjz）
                    path: '/extradata',
                    name: 'extradata',
                    component: () =>
                        import ('@v/systemSettings/Extradata')
                },
                // 利润表
                {
                    path: '/profit',
                    name: 'profit',
                    component: () =>
                        import ('@v/intelligenceReport/Profit.vue')
                },
                {
                    path: '/Column',
                    name: 'Column',
                    component: () =>
                        import ('@v/test/BiColumn.vue')
                },


                // 填报表格
                {
                    path: '/table',
                    name: 'table',
                    component: () =>
                        import ('@v/intelligenceReport/Itable.vue')
                },
                {
                    path: '/a',
                    name: 'a',
                    component: () =>
                        import ('@v/intelligenceReport/a.vue')
                },
                { // 数据填报
                    path: '/handsontable',
                    name: 't',
                    component: () =>
                        import ('@v/intelligenceReport/Handtable.vue')
                },
                {
                    path: '/i',
                    name: 'i',
                    component: () =>
                        import ('@c/Itable')
                },
                {
                    path: '/Fill',
                    name: 'Fill',
                    component: () =>
                        import ('@v/test/Fill.vue')
                }
            ]
        },
        {
            path: '/Login',
            name: 'Login',
            component: () =>
                // import('@v/layout/login/Login'),
                // import('@v/layout/login/LoginNew'),
                import ('@v/layout/login/szcLogin'),
            // import ('@v/layout/login/LoginNew'),
        },
        {
            path: '*',
            name: '/404',
            component: () =>
                import ('@v/common/404')
        },

    ]
})

// 路由守卫

router.beforeEach((to, from, next) => {
    let bean = getClientParams();
    let authorization = bean.authorization || bean.tikct || bean.token;
    if (!authorization) {
        authorization = localStorage.authorization ? true : false;
    }
    // debugger;
    if (to.path == "/login") {
        next();
    } else {
        authorization ? next() : next("/login");
    }
})

export default router;
export const JobResumeConfig = {
    /**
     * -------------------------------
     * Config for the Job Resume Cart
     * -------------------------------
     */

    presentation: {
        /**
         * Scale colors definition is 13 total.
         * So over 13 items color is same of first scale color
         */
        scaleColors: [
            "#eac295",
            "#eaea95",
            "#b8ea95",
            "#a69ab0",
            "#8d74b0",
            "#70a2dd",
            "#b0a272",
            "#e09f63",
            "#779595",
            "#e2a8a8",
            "#c0ceaa",
            "#abbcd3",
            "#e5d177",
        ],

        /**
         * The initial shown range.
         * Note: It's not max and min range
         */
        initialShowRange: {
            from: 2015,
            to: 2019,
        },
    },

    aggregate: {
        /**
         * Default range, that not depends on fetch data.
         */
        defaultTermRange: {
            min: 1970,
            max: 2019,
        },

        /**
         * The work hour per day.
         * It's use for calc a man-hour, when not set specific man-hour.
         */
        workHourPerDay: 8,

        /**
         * The keys for the resume topic and aggregates group.
         * Note:
         * - The values must be keep in unique.
         * - Shown in this order.
         */
        topicKeys: [
            //"assignedTasks",
            "backendLanguages",
            "frontendLanguages",
            "frameworksBackend",
            "frameworksFront",
            "databases",
            "webServers",
            "libraries",
            "systemPlatformOs",
            "devWorkOs",
            "ide",
            "vcs",
            "projectManagementTools",
            // "otherToolsAndService"
        ]
    },

    localization: {
        ja: {
            "assignedTasks": "担当業務",
            "backendLanguages": "プログラミング言語 (back-end)",
            "frontendLanguages": "開発利用言語 (front-end)",
            "frameworksBackend": "フレームワーク (back-end)",
            "frameworksFront": "フレームワーク (front-end)",
            "databases": "データベース",
            "webServers": "Webサーバ",
            "libraries": "ライブラリ",
            "systemPlatformOs": "システムプラットフォームOS",
            "devWorkOs": "開発作業マシンOS",
            "ide": "IDE",
            "vcs": "VCS",
            "projectManagementTools": "プロジェクトマネジメントツール",
            "otherToolsAndService": "その他ツール&サービス"
        },

        en: {
            "assignedTasks": "Tasks",
            "backendLanguages": "Programing Languages (back-end)",
            "frontendLanguages": "Used Dev-Languages (front-end)",
            "frameworksBackend": "Frameworks (back-end)",
            "frameworksFront": "Frameworks (front-end)",
            "databases": "Databases",
            "webServers": "Web Servers",
            "libraries": "Libraries",
            "systemPlatformOs": "OS (system platform)",
            "devWorkOs": "OS (for a dev-work)",
            "ide": "IDE",
            "vcs": "VCS",
            "projectManagementTools": "Project Management Tools",
            "otherToolsAndService": "Other Tools And Service"
        },
    },
};

export default {
    JobResumeConfig
}
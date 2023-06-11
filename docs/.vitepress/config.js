export default {
    themeConfig: {
        base:"/Junlogz.github.io",
        siteTitle: "Junlogz-Docs",
        logo: "/edit.png",
        socialLinks: [
            { icon: "github", link: "https://github.com/Junlogz" },
        ],
        nav: [
            {
                text: "Java",
                items: [
                    { text: 'Java基础', link: '/java/java-base' },
                    { text: 'Jvm', link: '/java/java-jvm' },
                    { text: 'Spring', link: 'java/java-spring' },
                    { text: 'Mybatis', link: 'java/java-mybatis' }
                ]
            },
            {
                text: "中间件",
                items: [
                    { text: "redis", link: '/middleware/redis' }
                ]

            },
            { text: "数据库", link: "/sql/mysql" },
            { text: "github", link: "https://github.com/Junlogz" },

        ],
        sidebar: {
            "/articles/": [
                {
                    text: "日常小记",
                    collapsible: true,
                    collapsed:true,
                    items: [
                        {
                            text: "4.3-4.7小记",
                            link: "/articles/4.3-4.7小记",
                        },
                        { text: "3.15", link: "/articles/3.15" },
                    ],
                },
                {
                    text: "周报",
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: "周报小记",
                            link: "/articles/周报小记",
                        },
                    ],
                },
            ],
        },
    },
};

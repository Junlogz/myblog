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
                    { text: 'Java', link: '/item-2' },
                    { text: 'Item C', link: '/item-3' }
                ]
            },
            { text: "中间件", link: "/articles/4.3-4.7小记" },
            { text: "数据库", link: "/guide/test" },
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

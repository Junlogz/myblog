export default {
    themeConfig: {
        siteTitle: "blog-z",
        logo: "/edit.png",
        socialLinks: [
            { icon: "github", link: "https://github.com/Junlogz" },
        ],
        nav: [
            { text: "博客", link: "/articles/4.3-4.7小记" },
            { text: "Guide", link: "/guide/test" },
            { text: "github", link: "https://github.com/Junlogz" },
            {
                text: "Menu",
                items: [
                    { text: 'Item A', link: '/item-1' },
                    { text: 'Item B', link: '/item-2' },
                    { text: 'Item C', link: '/item-3' }
                ]
            }
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

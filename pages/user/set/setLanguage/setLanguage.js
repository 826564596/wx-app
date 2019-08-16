const app = getApp();
Page({
    data: {
        languages: [
            "默认",
            "简体中文",
            "Bahasa Indonesia",
            "‎Bahasa Melayu",
            "‎Deutsch",
            "‎Diné bizaad",
            "‎English",
            "‎Esperanto",
            "‎Lëtzebuergesch",
            "‎Nederlands",
            "‎Scots",
            "‎azərbaycanca",
            "‎català",
            "‎dansk",
            "‎español",
            "‎français",
            "‎føroyskt",
            "‎italiano",
            "‎lietuvių",
            "‎magyar",
            "‎norsk bokmål",
            "‎occitan",
            "‎polski",
            "‎português do Brasil",
            "‎suomi",
            "‎svenska",
            "‎čeština",
            "‎български",
            "‎русский",
            "‎українська",
            "‎ئۇيغۇرچە",
            "‎اردو",
            "‎العربية",
            "‎سنڌي",
            "‎فارسی",
            "‎پښتو",
            "‎کوردی",
            "‎हिन्दी",
            "‎বাংলা",
            "‎মেইতেই লোন্",
            "‎ગુજરાતી",
            "‎සිංහල",
            "‎ქართული",
            "‎ភាសាខ្មែរ",
            "‎繁体中文",
            "‎日本语",
            "‎한국어"
        ],
        selected: "默认"
    },
    onLoad: function() {},
    change: function(e) {
        let language = e.currentTarget.dataset.language;
        this.setData({
            selected: language
        });
    }
});

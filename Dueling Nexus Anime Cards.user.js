// ==UserScript==
// @name         Anime Card Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @match        https://duelingnexus.com/game/*
// @match        https://duelingnexus.com/editor/*
// @grant        none
// ==/UserScript==

(function() {
window.usingAnimeCards = true;

const getAsset = (a) => "assets/" + a;
const imageVersion = "1937fe2";
const IMAGE_SOURCES = {
    anime: "https://raw.githubusercontent.com/yasuotornado/Anime-Cards/master/images/",
    github: "https://raw.githubusercontent.com/DuelingNexus/images/" + imageVersion + "/",
    cdn: "https://cdn.jsdelivr.net/gh/DuelingNexus/images@" + imageVersion + "/"
}
const loadCardImage = function (id, useAnime) {
    if(id === 0) {
        return getAsset("images/cover.png");
    }
    else if(id === -1) {
        return getAsset("images/unknown.png");
    }
    else {
        let image = id + ".jpg";
        let source;
        if(useAnime) {
            source = IMAGE_SOURCES.anime;
        }
        else if(da) {
            source = IMAGE_SOURCES.github;
        }
        else {
            source = IMAGE_SOURCES.cdn;
        }
        return source + image;
    }
}

// update
window.ra = loadCardImage;

window.l = function l(img, id, useAnime = usingAnimeCards) {
    img.off("error");
    img.attr("src", ra(id, useAnime));
    if (0 < id) img.one("error", function() {
        if(useAnime) {
            // try without
            l(img, id, false);
        }
        else {
            $(this).attr("src", ra(-1));
        }
    })
}
})();

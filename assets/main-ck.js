// Responsive Images
function responsiveImages() {
    var e = $(window).width();

    if (e < 768) {
        $(".project-image").each(function () {
            $(this).attr("src", $(this).attr("src").replace("/standard/", "/small/"))
        });

        $(".mdc").load("html/projects/" + targetID + ".html")
    } else {
        if (!(devicePixelRatio > 1.5 && e > 1280))return !1;
        $(".project-image").each(function () {
            $(this).attr("src", $(this).attr("src").replace("/standard/", "/retina/"))
        })
    }
}
function semiresponsiveImages() {
    var e = $(window).width();

    if (!(e < 768))return !1;

    $(".project-image").each(function () {
        $(this).attr("src", $(this).attr("src").replace("/standard/", "/small/"))
    })
}
$(document).ready(function () {
    $(".trigger-nav, .menu-overlay, .menu-close, .content-close").bind("click", function () {
        $(".trigger-nav").toggleClass("trigger-nav-active");

        $(".menu").toggleClass("menu-active");

        $("body").toggleClass("scrollzero")
    })
});

$(document).ready(function () {
    var e = 0;
    $(window).scroll(function () {
        var t = $(this).scrollTop();

        t > e && t > 100 ? $(".trigger-nav").addClass("trigger-nav-hidden") : $(".trigger-nav").removeClass("trigger-nav-hidden");
        e = t
    })
});

$(document).ready(function () {
    function t() {
        $(".modal").addClass("modal-active");

        $("body").scrollTop(0);

        $("body").addClass("body-modal-active");

        $("#work").addClass("dnone");

        $(".loading-icon").removeClass("fade-in-slow");

        $(".loading-icon").addClass("loading");

        setTimeout(function () {
            $(".loading-icon").removeClass("loading").addClass("fade-in-slow")
        }, 3e3)
    }

    function n() {
        $("body").animate({scrollTop: e}, 500);
        $(".modal").removeClass("modal-active");

        $("body").removeClass("body-modal-active");

        $(".loading-icon").removeClass("fade-in-slow");

        $(".loading-icon").addClass("loading")
    }

    $.ajaxSetup({cache: !1});
    if ($("#works").length)var e = $("#works").offset().top;

    $(".modal").on("click", ".modal-close-trigger", function () {
        n()
    })
});

$(document).ready(function () {
    if (!(screen.width > 768))return !1;
    var e = $(".work-item");
    e.on("mouseenter mouseleave", function (t) {
        e.not(this).stop(!0).fadeTo(300, t.type === "mouseenter" ? .6 : 1, "swing")
    })
});

$(document).ready(function () {
    $(".colour-swatch").bind("click", function () {
        var e = $(this), t = $(this).attr("id"), n = $("body").attr("id");
        $("body").attr("id", t);
        $(e).addClass("color-fill");
        $(".trigger-nav").toggleClass("trigger-nav-active");
        $(".menu").toggleClass("menu-active");
        $("body").toggleClass("scrollzero");
        $(e).removeClass("color-fill")
    })
});
$(document).ready(function () {
    $(".email-link").attr("href", "mailto:" + (new Array("kresnikwang", "gmail.com")).join("@"))
});
$(document).ready(function () {
    $(window).scroll(function () {
        var e = $(window).scrollTop();
        if (e < 1e3) {
            var t = e.toFixed(1) / 800 * 1, n = "background: rgba(71, 83, 88, " + t.toFixed(2) + ");";
            $(".header-overlay").attr("style", n)
        }
    })
});
(function () {
    var e, t;
    e = function () {
        function e(e, t) {
            var n, r;
            this.options = {
                target: "instafeed",
                get: "popular",
                resolution: "thumbnail",
                sortBy: "none",
                links: !0,
                mock: !1,
                useHttp: !1
            };
            if (typeof e == "object")for (n in e)r = e[n], this.options[n] = r;
            this.context = t != null ? t : this, this.unique = this._genKey()
        }

        return e.prototype.hasNext = function () {
            return typeof this.context.nextUrl == "string" && this.context.nextUrl.length > 0
        }, e.prototype.next = function () {
            return this.hasNext() ? this.run(this.context.nextUrl) : !1
        }, e.prototype.run = function (t) {
            var n, r, i;
            if (typeof this.options.clientId != "string" && typeof this.options.accessToken != "string")throw new Error("Missing clientId or accessToken.");
            if (typeof this.options.accessToken != "string" && typeof this.options.clientId != "string")throw new Error("Missing clientId or accessToken.");
            return this.options.before != null && typeof this.options.before == "function" && this.options.before.call(this), typeof document != "undefined" && document !== null && (i = document.createElement("script"), i.id = "instafeed-fetcher", i.src = t || this._buildUrl(), n = document.getElementsByTagName("head"), n[0].appendChild(i), r = "instafeedCache" + this.unique, window[r] = new e(this.options, this), window[r].unique = this.unique), !0
        }, e.prototype.parse = function (e) {
            var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S;
            if (typeof e != "object") {
                if (this.options.error != null && typeof this.options.error == "function")return this.options.error.call(this, "Invalid JSON data"), !1;
                throw new Error("Invalid JSON response")
            }
            if (e.meta.code !== 200) {
                if (this.options.error != null && typeof this.options.error == "function")return this.options.error.call(this, e.meta.error_message), !1;
                throw new Error("Error from Instagram: " + e.meta.error_message)
            }
            if (e.data.length === 0) {
                if (this.options.error != null && typeof this.options.error == "function")return this.options.error.call(this, "No images were returned from Instagram"), !1;
                throw new Error("No images were returned from Instagram")
            }
            this.options.success != null && typeof this.options.success == "function" && this.options.success.call(this, e), this.context.nextUrl = "", e.pagination != null && (this.context.nextUrl = e.pagination.next_url);
            if (this.options.sortBy !== "none") {
                this.options.sortBy === "random" ? d = ["", "random"] : d = this.options.sortBy.split("-"), p = d[0] === "least" ? !0 : !1;
                switch (d[1]) {
                    case"random":
                        e.data.sort(function () {
                            return .5 - Math.random()
                        });
                        break;
                    case"recent":
                        e.data = this._sortBy(e.data, "created_time", p);
                        break;
                    case"liked":
                        e.data = this._sortBy(e.data, "likes.count", p);
                        break;
                    case"commented":
                        e.data = this._sortBy(e.data, "comments.count", p);
                        break;
                    default:
                        throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
                }
            }
            if (typeof document != "undefined" && document !== null && this.options.mock === !1) {
                a = e.data, this.options.limit != null && a.length > this.options.limit && (a = a.slice(0, this.options.limit + 1 || 9e9)), n = document.createDocumentFragment(), this.options.filter != null && typeof this.options.filter == "function" && (a = this._filter(a, this.options.filter));
                if (this.options.template != null && typeof this.options.template == "string") {
                    i = "", o = "", l = "", v = document.createElement("div");
                    for (m = 0, b = a.length; m < b; m++)s = a[m], u = s.images[this.options.resolution].url, this.options.useHttp || (u = u.replace("http://", "//")), o = this._makeTemplate(this.options.template, {
                        model: s,
                        id: s.id,
                        link: s.link,
                        image: u,
                        caption: this._getObjectProperty(s, "caption.text"),
                        likes: s.likes.count,
                        comments: s.comments.count,
                        location: this._getObjectProperty(s, "location.name")
                    }), i += o;
                    v.innerHTML = i, S = [].slice.call(v.childNodes);
                    for (g = 0, w = S.length; g < w; g++)h = S[g], n.appendChild(h)
                } else for (y = 0, E = a.length; y < E; y++)s = a[y], f = document.createElement("img"), u = s.images[this.options.resolution].url, this.options.useHttp || (u = u.replace("http://", "//")), f.src = u, this.options.links === !0 ? (t = document.createElement("a"), t.href = s.link, t.appendChild(f), n.appendChild(t)) : n.appendChild(f);
                document.getElementById(this.options.target).appendChild(n), r = document.getElementsByTagName("head")[0], r.removeChild(document.getElementById("instafeed-fetcher")), c = "instafeedCache" + this.unique, window[c] = void 0;
                try {
                    delete window[c]
                } catch (x) {
                }
            }
            return this.options.after != null && typeof this.options.after == "function" && this.options.after.call(this), !0
        }, e.prototype._buildUrl = function () {
            var e, t, n;
            e = "https://api.instagram.com/v1";
            switch (this.options.get) {
                case"popular":
                    t = "media/popular";
                    break;
                case"tagged":
                    if (typeof this.options.tagName != "string")throw new Error("No tag name specified. Use the 'tagName' option.");
                    t = "tags/" + this.options.tagName + "/media/recent";
                    break;
                case"location":
                    if (typeof this.options.locationId != "number")throw new Error("No location specified. Use the 'locationId' option.");
                    t = "locations/" + this.options.locationId + "/media/recent";
                    break;
                case"user":
                    if (typeof this.options.userId != "number")throw new Error("No user specified. Use the 'userId' option.");
                    if (typeof this.options.accessToken != "string")throw new Error("No access token. Use the 'accessToken' option.");
                    t = "users/" + this.options.userId + "/media/recent";
                    break;
                default:
                    throw new Error("Invalid option for get: '" + this.options.get + "'.")
            }
            return n = "" + e + "/" + t, this.options.accessToken != null ? n += "?access_token=" + this.options.accessToken : n += "?client_id=" + this.options.clientId, this.options.limit != null && (n += "&count=" + this.options.limit), n += "&callback=instafeedCache" + this.unique + ".parse", n
        }, e.prototype._genKey = function () {
            var e;
            return e = function () {
                return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
            }, "" + e() + e() + e() + e()
        }, e.prototype._makeTemplate = function (e, t) {
            var n, r, i, s, o;
            r = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, n = e;
            while (r.test(n))i = n.match(r)[1], s = (o = this._getObjectProperty(t, i)) != null ? o : "", n = n.replace(r, "" + s);
            return n
        }, e.prototype._getObjectProperty = function (e, t) {
            var n, r;
            t = t.replace(/\[(\w+)\]/g, ".$1"), r = t.split(".");
            while (r.length) {
                n = r.shift();
                if (!(e != null && n in e))return null;
                e = e[n]
            }
            return e
        }, e.prototype._sortBy = function (e, t, n) {
            var r;
            return r = function (e, r) {
                var i, s;
                return i = this._getObjectProperty(e, t), s = this._getObjectProperty(r, t), n ? i > s ? 1 : -1 : i < s ? 1 : -1
            }, e.sort(r.bind(this)), e
        }, e.prototype._filter = function (e, t) {
            var n, r, i, s, o;
            n = [], i = function (e) {
                if (t(e))return n.push(e)
            };
            for (s = 0, o = e.length; s < o; s++)r = e[s], i(r);
            return n
        }, e
    }(), t = typeof exports != "undefined" && exports !== null ? exports : window, t.Instafeed = e
}).call(this);
var feed = new Instafeed({
    get: "user",
    userId: 3733380,
    accessToken: "3733380.cf0499d.edbd0e81c60246379393c506013e09f8",
    clientId: "45b307547f2a4d82a61126963110248d",
    resolution: "standard_resolution",
    limit: 12,
    sortBy: "random",
    template: '<div class="large-4 medium-6 small-12 columns nopadding"><a href="{{link}}" target="_blank" class="square"><img src="{{image}}" /><div class="caption"><p>{{caption}}</p></div></a></div>'
});
feed.run();

$(document).ready(function () {
    $(".js-tab-switch").on("click", function () {
        $(".js-tab-switch").each(function () {
            $(this).toggleClass("active")
        });
        $(".js-tab-content").each(function () {
            $(this).toggleClass("active")
        })
    })
});
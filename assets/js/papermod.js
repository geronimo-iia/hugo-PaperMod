import * as params from '@params';

function initializeMenu() {
    let menu = document.getElementById('menu')
    menu.scrollLeft = localStorage.getItem("menu-scroll-position");
    menu.onscroll = function () {
        localStorage.setItem("menu-scroll-position", menu.scrollLeft);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            var id = this.getAttribute("href").substr(1);
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.querySelector(`[id='${decodeURIComponent(id)}']`).scrollIntoView({
                    behavior: "smooth"
                });
            } else {
                document.querySelector(`[id='${decodeURIComponent(id)}']`).scrollIntoView();
            }
            if (id === "top") {
                history.replaceState(null, null, " ");
            } else {
                history.pushState(null, null, `#${id}`);
            }
        });
    });
}

function scrollToTop() {
    var mybutton = document.getElementById("top-link");
    window.onscroll = function () {
        if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
            mybutton.style.visibility = "visible";
            mybutton.style.opacity = "1";
        } else {
            mybutton.style.visibility = "hidden";
            mybutton.style.opacity = "0";
        }
    };
}

function enableThemeToggle() {
    document.getElementById("theme-toggle").addEventListener("click", () => {
        if (document.body.className.includes("dark")) {
            document.body.classList.remove('dark');
            localStorage.setItem("pref-theme", 'light');
        } else {
            document.body.classList.add('dark');
            localStorage.setItem("pref-theme", 'dark');
        }
    })
}

function showCodeCopyButtons() {
    document.querySelectorAll('pre > code').forEach((codeblock) => {
        const container = codeblock.parentNode.parentNode;

        const copybutton = document.createElement('button');
        copybutton.classList.add('copy-code');
        copybutton.innerText = '{{- i18n "code_copy" | default "copy" }}';

        function copyingDone() {
            copybutton.innerText = '{{- i18n "code_copied" | default "copied!" }}';
            setTimeout(() => {
                copybutton.innerText = '{{- i18n "code_copy" | default "copy" }}';
            }, 2000);
        }

        copybutton.addEventListener('click', (cb) => {
            if ('clipboard' in navigator) {
                navigator.clipboard.writeText(codeblock.textContent);
                copyingDone();
                return;
            }

            const range = document.createRange();
            range.selectNodeContents(codeblock);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
                copyingDone();
            } catch (e) { };
            selection.removeRange(range);
        });

        if (container.classList.contains("highlight")) {
            container.appendChild(copybutton);
        } else if (container.parentNode.firstChild == container) {
            // td containing LineNos
        } else if (codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "TABLE") {
            // table containing LineNos and code
            codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(copybutton);
        } else {
            // code blocks not having highlight as parent class
            codeblock.parentNode.appendChild(copybutton);
        }
    });
}

function initializeTheme() {

    if (params.themeToggle) {
        if (params.defaultTheme === 'light') {
            /* theme is light */
            if (localStorage.getItem("pref-theme") === "dark") {
                document.body.classList.add('dark');
            }

        } else if (params.defaultTheme === 'dark') {
            /* theme is dark */
            if (localStorage.getItem("pref-theme") === "light") {
                document.body.classList.remove('dark')
            }
        } else {
            // theme is auto
            if (localStorage.getItem("pref-theme") === "dark") {
                document.body.classList.add('dark');
            } else if (localStorage.getItem("pref-theme") === "light") {
                document.body.classList.remove('dark')
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark');
            }
        }
        enableThemeToggle();
    } else {
        /* theme-toggle is disabled and theme is auto */
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
        }
    }
}

initializeMenu();
if (params.scrollToTop) scrollToTop();
initializeTheme();
if (params.showCodeCopyButtons) showCodeCopyButtons();



//import anime from 'animejs/lib/anime.es.js';
//Pendiente de incluir animate js en la pag

const bodyEl = document.getElementsByTagName("body");
const menuEl = document.querySelector(".main-nav__menu");

/* 
Al momento de cargar la pagina se ve una animacion inical 
'flickering', se resolvio añadiendo una clase a body .preload
para evitar animaciones iniciales, una vez cargado js procedemos a 
eliminar la clase.
*/

class FruitsHero {
    totalFruits = [];

    init() {
        const fruits = document.querySelectorAll(".main-hero__fruit");
        fruits.forEach((item) => {
            const fruit = new Fruit(item);
            this.totalFruits.push(fruit);
        });
    }

    printAllFruits() {
        this.totalFruits.forEach((item) => {
            console.log(item);
        });
    }
}

class Fruit {
    element = null;
    isHide = false;
    isDisplayed = true;
    constructor(element) {
        this.element = element;
    }

    hide() {
        this.element.classList.add("main-hero__fruit__hide");
        this.isHide = true;
    }

    show() {
        this.element.classList.remove("main-hero__fruit__hide");
        this.isHide = false;
    }

    remove() {
        this.element.classList.add("main-hero__fruit__no-display");
        this.isDisplayed = false;
    }

    display() {
        this.element.classList.remove("main-hero__fruit__no-display");
        this.isDisplayed = true;
    }

    set isDisplayed(isDisplayed) {
        this.isDisplayed = isDisplayed;
    }
}

class Nav {
    MenuNavEl = null;
    isOpen = null;
    isBackgroundShown = null;
    valScroll = null;
    navListMobile = null;
    wrapperNavEl = null;

    constructor(navEl) {
        this.navEl = navEl;
        this.isOpen = false;
        this.isBackgroundShown = false;
        this.valScroll = 0;
        this.navListMobile = document.querySelector(".main-nav__list-mobile");
        this.wrapperNavEl = document.querySelector(".wrapper__nav");
    }

    menuClickHandler() {
        if (this.valScroll === 0) {
            if (this.isOpen) {
                this.closeList();
                this.hideBackground();
            } else {
                this.openList();
                this.showBackground();
            }
        } else {
            if (this.isOpen) {
                this.closeList();
            } else {
                this.openList();
            }
        }
        console.log(this.isOpen);
    }

    navBackgroundHandler(y) {
        this.valScroll = y;
        if (this.valScroll > 0) {
            this.showBackground();
        } else {
            if (this.isOpen) {
                return;
            }
            this.hideBackground();
        }
    }

    openList() {
        this.navListMobile.classList.remove("main-nav__list-mobile__hidden");
        setTimeout(() => {
            this.navListMobile.classList.remove(
                "main-nav__list-mobile__visually-hidden"
            );
        }, 20);
        this.isOpen = true;
    }

    closeList() {
        this.navListMobile.classList.add(
            "main-nav__list-mobile__visually-hidden"
        );
        this.navListMobile.addEventListener(
            "transitionend",
            () => {
                this.navListMobile.classList.add(
                    "main-nav__list-mobile__hidden"
                );
            },
            {
                capture: false,
                once: true,
                passive: false,
            }
        );
        this.isOpen = false;
    }

    showBackground() {
        this.wrapperNavEl.classList.add("wrapper__nav__show-background");
        this.isBackgroundShown = true;
    }

    hideBackground() {
        this.wrapperNavEl.classList.remove("wrapper__nav__show-background");
        this.isBackgroundShown = false;
    }
}

//Fruit controller
const windowSize = (onLoad, fruitsHero) => {
    // Get width and height of the window excluding scrollbars
    let w = document.documentElement.clientWidth;
    //let h = document.documentElement.clientHeight;
    /* 
        0. Kiwi 
        1. Mandarina 
        2. Orange
        3. Peach
        4. Toronja
    */
    let fruitO = fruitsHero.totalFruits[2];
    let fruitT = fruitsHero.totalFruits[4];

    if (onLoad) {
        if (w < 1000) {
            fruitT.remove();
            fruitO.remove();
        } else if (w > 1000 && w < 1500) {
            fruitO.remove();
        }
    } else {
        if (fruitT.isDisplayed === false && fruitO.isDisplayed === false) {
            fruitT.display();
            fruitO.display();
        }

        if (w < 767) {
            fruitO.remove();
            fruitT.remove();
        } else if (w > 767 && w < 1000) {
            if (!fruitO.isHide) {
                fruitO.hide();
            }
            if (!fruitT.isHide) {
                fruitT.hide();
            }
        } else if (w > 1000 && w < 1500) {
            //Appear toronja
            if (fruitT.isHide) {
                fruitT.show();
            }
            //Hide orange
            if (!fruitO.isHide) {
                fruitO.hide();
            }
        } else if (w > 1500) {
            //Hide orange
            if (fruitO.isHide) {
                fruitO.show();
            }
        }
    }
};

const menuHanler = (menuArg) => {
    menuArg.menuClickHandler();
};

const navScrollHandler = (menuArg) => {
    menuArg.navBackgroundHandler(window.scrollY);
};

const removeInitialAnimations = () => {
    const preload = document.querySelector(".preload");
    preload.classList.remove("preload");
};

removeInitialAnimations();
const fruitsHeroArr = new FruitsHero();
fruitsHeroArr.init();
windowSize(true, fruitsHeroArr);

const menu = new Nav(menuEl);

window.addEventListener("resize", windowSize.bind(this, false, fruitsHeroArr));
window.addEventListener("scroll", navScrollHandler.bind(this, menu));
menuEl.addEventListener("click", menuHanler.bind(this, menu));

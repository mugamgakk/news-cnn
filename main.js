var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const navItems = document.querySelectorAll('.gnb-item');
const searchInput = document.querySelector('.search-input');
let page = 1;
let category = 'general';
let totalPage = 0;
let searchProp = false;
let keyWard = '';
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('keyup', function () {
    const e = window.event;
    if (e.key === 'Enter') {
        // console.log(this.value )
        let searchWard = this.value;
        searchProp = true;
        keyWard = searchWard;
        page = 1;
        searchNews(keyWard);
        this.value = '';
    }
});
const searchNews = (ward) => __awaiter(this, void 0, void 0, function* () {
    spinnerRender();
    let url = `https://newsapi.org/v2/top-headlines?q=${ward}&apiKey=a2c90a571ab144978f8b1832a1c15883&pageSize=20&page=${page}`;
    console.log(url);
    let res = yield fetch(url);
    let data = yield res.json();
    totalPage = Math.ceil(data.totalResults / 20);
    newsRender(data.articles);
});
const getNews = () => __awaiter(this, void 0, void 0, function* () {
    spinnerRender();
    let url = `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=a2c90a571ab144978f8b1832a1c15883&pageSize=20&page=${page}`;
    let res = yield fetch(url);
    let data = yield res.json();
    console.log(data);
    console.log(category);
    totalPage = Math.ceil(data.totalResults / 20);
    console.log(totalPage);
    newsRender(data.articles);
});
const newsRender = (data) => {
    console.log(data);
    let renderHTML = ``;
    data.forEach((a) => {
        renderHTML += `<article class="news">
                            <img src="${a.urlToImage}" class="news-img" alt="" onerror="this.src='https://s.pstatic.net/static/www/img/uit/2019/sp_search.svg'">
                            <h2 class="news-title">
                                <a href=${a.url} target="_blank">
                                   ${a.title}
                                </a> 
                            </h2>
                            <p class="news-content">
                                ${a.description == null ? '' : a.description}
                            </p>
                        </article>`;
    });
    let newsArea = document.querySelector('.news-seaction');
    if (newsArea instanceof HTMLElement) {
        newsArea.innerHTML = renderHTML;
    }
    if (data.length !== 0) {
        renderPagination();
    }
    else {
        let paginationWrap = document.querySelector('.navigation');
        if (paginationWrap !== null) {
            paginationWrap.innerHTML = '';
        }
    }
};
navItems.forEach(function (a) {
    a === null || a === void 0 ? void 0 : a.addEventListener('click', function (e) {
        if (e.target instanceof HTMLElement) {
            let clickCatecory = e.target.dataset.catecory;
            page = 1;
            searchProp = false;
            category = clickCatecory;
            getNews();
        }
    });
});
const renderPagination = () => {
    let pageGroup = Math.ceil(page / 5);
    let lastPage = pageGroup * 5;
    let firstPage = lastPage - 4;
    if (totalPage < lastPage) {
        lastPage = totalPage;
    }
    let renderHTML = '';
    if (page !== 1) {
        renderHTML = `<li onClick="moveToPage(${page - 1})" class="page-item"><a class="page-link" href="javascript:void(0);">Previous</a></li>`;
    }
    for (let i = firstPage; i <= lastPage; i++) {
        renderHTML += `<li onClick="moveToPage(${i})" class="page-item ${page === i ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
    }
    if (page !== lastPage) {
        renderHTML += `<li onClick="moveToPage(${page + 1})" class="page-item"><a class="page-link" href="javascript:void(0);">Next</a></li>`;
    }
    let paginationWrap = document.querySelector('.navigation');
    if (paginationWrap !== null) {
        paginationWrap.innerHTML = renderHTML;
    }
};
const moveToPage = (clickPage) => {
    page = clickPage;
    if (searchProp === true) {
        searchNews(keyWard);
    }
    else {
        getNews();
    }
};
const spinnerRender = () => {
    let newsArea = document.querySelector('.news-seaction');
    let render = `<div class="spin-wrap">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>`;
    newsArea.insertAdjacentHTML('beforeend', render);
};
getNews();

(function (window, document) {
    'use strict';
    const post = document.querySelector('article#content .inner .entry-content .tt_article_useless_p_margin');
    if (!post) return;

    const maxHeading = () => {
        if (h2arr.length > 0) return 2;
        else if (h3arr.length > 0) return 3;
        else if (h4arr.length > 0) return 4;
        else return 'no heading';
    };
    const makeTagArray = (tag) => {
        return [...post.getElementsByTagName(tag)];
    };
    const sortByOffsetTop = (elements) => {
        elements.sort((a, b) => a.offsetTop - b.offsetTop);
    };
    const putNumbers = (elements, max) => {
        if (max === 'no heading') return;
        let i = 0; let j = 0; let k = 0;
        // max is either 2, 3 or 4
        elements.forEach(element => {
            if (element.innerText === '출처') return;
            if (element.tagName === `H${max}`) {
                i += 1;
                j = 0;
                k = 0;
                element.innerText = `${i}. ` + element.innerText;
            } else if (element.tagName === `H${max+1}`) {
                j += 1;
                k = 0;
                element.innerText = `${i}.${j}. ` + element.innerText;
            } else {
                k += 1;
                element.innerText = `${i}.${j}.${k}. ` + element.innerText;
            }
        });
    };

    const h2arr = makeTagArray('h2');
    const h3arr = makeTagArray('h3');
    const h4arr = makeTagArray('h4');
    const headersArr = h2arr.concat(h3arr).concat(h4arr);

    console.log('hello!');
    sortByOffsetTop(headersArr);
    headersArr.pop();
    const max = maxHeading();
    putNumbers(headersArr, max);

}) (window, document)
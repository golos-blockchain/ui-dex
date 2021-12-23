export const blockContent = () => {
    const body = document.body;
    const blockClass = 'fixed-body';

    if(body.classList.contains(blockClass)){
        const scrollTo = Math.abs(parseInt(body.style.top));
        body.classList.remove(blockClass);
        body.removeAttribute('style');
        window.scrollTo(0, scrollTo);
        return;
    }

    const scroll = window.scrollY;
    body.style.top = '-' + scroll + 'px';
    body.classList.add(blockClass);
};
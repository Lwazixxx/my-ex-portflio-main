document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    // find slide elements (support .carousel-item or plain imgs)
    let items = Array.from(carousel.querySelectorAll('.carousel-item'));
    if (items.length === 0) items = Array.from(carousel.querySelectorAll('img'));
    if (items.length === 0) return;

    // ensure slides have the class used by the script
    items.forEach(img => img.classList.add('carousel-item'));

    // create or use dots container
    let dotsContainer = carousel.querySelector('.carousel-dots');
    if (!dotsContainer) {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        carousel.appendChild(dotsContainer);
    }

    // create or find prev/next buttons
    let prevBtn = carousel.querySelector('.carousel-prev');
    let nextBtn = carousel.querySelector('.carousel-next');

    if (!prevBtn) {
        prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-prev';
        prevBtn.type = 'button';
        prevBtn.textContent = '❮';
        carousel.appendChild(prevBtn);
    }
    if (!nextBtn) {
        nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-next';
        nextBtn.type = 'button';
        nextBtn.textContent = '❯';
        carousel.appendChild(nextBtn);
    }

    // build dots
    dotsContainer.innerHTML = '';
    const dots = items.map((_, i) => {
        const d = document.createElement('span');
        d.className = 'dot';
        d.dataset.index = i;
        dotsContainer.appendChild(d);
        return d;
    });

    // state
    let current = items.findIndex(i => i.classList.contains('active'));
    if (current === -1) current = 0;

    function update() {
        items.forEach((it, i) => {
            if (i === current) {
                it.classList.add('active');
                it.style.display = 'block';
            } else {
                it.classList.remove('active');
                it.style.display = 'none';
            }
        });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    function go(n) {
        current = (n + items.length) % items.length;
        update();
    }

    prevBtn.addEventListener('click', () => go(current - 1));
    nextBtn.addEventListener('click', () => go(current + 1));
    dots.forEach(dot => dot.addEventListener('click', e => go(Number(e.target.dataset.index))));

    // initialize
    update();
});
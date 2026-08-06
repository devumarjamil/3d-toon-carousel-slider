const IMAGES = [
{ src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
{ src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
{ src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' },
{ src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];

IMAGES.forEach(d => { const img = new Image(); img.src = d.src; });

const grainSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(#n)' opacity='0.08'/></svg>`;
document.getElementById('grain').style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(grainSvg)}")`;

let activeIndex = 0;
let isAnimating = false;
let isMobile = window.innerWidth < 640;

window.addEventListener('resize', () => { isMobile = window.innerWidth < 640; applyRoles(); });

const carousel = document.getElementById('carousel');
const items = IMAGES.map((d, i) => {
const el = document.createElement('div');
el.className = 'carousel-item';
const img = document.createElement('img');
img.src = d.src;
img.draggable = false;
img.alt = `Figurine ${i + 1}`;
el.appendChild(img);
carousel.appendChild(el);
return el;
});

function getRoles() {
return {
    center: activeIndex,
    left: (activeIndex + 3) % 4,
    right: (activeIndex + 1) % 4,
    back: (activeIndex + 2) % 4,
};
}

function applyRoles() {
const { center, left, right, back } = getRoles();
items.forEach((el, i) => {
    let style = {};
    if (i === center) {
    style = {
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'none',
        opacity: '1',
        zIndex: '20',
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom: isMobile ? '22%' : '0',
    };
    } else if (i === left) {
    style = {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: '0.85',
        zIndex: '10',
        left: isMobile ? '20%' : '30%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
    };
    } else if (i === right) {
    style = {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: '0.85',
        zIndex: '10',
        left: isMobile ? '80%' : '70%',
        height: isMobile ? '16%' : '28%',
        bottom: isMobile ? '32%' : '12%',
    };
    } else {
    style = {
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(4px)',
        opacity: '1',
        zIndex: '5',
        left: '50%',
        height: isMobile ? '13%' : '22%',
        bottom: isMobile ? '32%' : '12%',
    };
    }
    Object.assign(el.style, style);
});

document.getElementById('app').style.backgroundColor = IMAGES[activeIndex].bg;
}

function navigate(dir) {
if (isAnimating) return;
isAnimating = true;
if (dir === 'next') {
    activeIndex = (activeIndex + 1) % 4;
} else {
    activeIndex = (activeIndex + 3) % 4;
}
applyRoles();
setTimeout(() => { isAnimating = false; }, 650);
}

document.getElementById('btn-prev').addEventListener('click', () => navigate('prev'));
document.getElementById('btn-next').addEventListener('click', () => navigate('next'));

document.addEventListener('keydown', e => {
if (e.key === 'ArrowLeft') navigate('prev');
if (e.key === 'ArrowRight') navigate('next');
});

applyRoles();
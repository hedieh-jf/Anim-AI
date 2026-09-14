/**
 * ============================================================
 * AnimAI — اسکریپت اصلی
 * ============================================================
 */

(function () {
    'use strict';

    // ============ تبدیل عدد به فارسی ============
    function toPersianNumber(num) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(num).replace(/[0-9]/g, (d) => persianDigits[d]);
    }

    // ============ منوی موبایل ============
    const Menu = {
        burger: null,
        nav: null,

        init() {
            this.burger = document.getElementById('burger');
            this.nav = document.getElementById('nav');
            if (!this.burger || !this.nav) return;

            this.burger.addEventListener('click', () => this.toggle());

            // بستن هنگام کلیک روی لینک
            this.nav.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => this.close());
            });

            // بستن با کلیک بیرون
            document.addEventListener('click', (e) => {
                if (!this.nav.classList.contains('open')) return;
                if (this.nav.contains(e.target) || this.burger.contains(e.target)) return;
                this.close();
            });
        },

        toggle() {
            this.nav.classList.toggle('open');
            this.burger.classList.toggle('active');
        },

        close() {
            this.nav.classList.remove('open');
            this.burger.classList.remove('active');
        }
    };

    // ============ ویدیو ============
    const Video = {
        player: null,
        items: [],

        init() {
            this.player = document.getElementById('mainVideo');
            this.items = document.querySelectorAll('.playlist-item');
            if (!this.player || this.items.length === 0) return;

            this.items.forEach(item => {
                item.addEventListener('click', () => this.select(item));
            });
        },

        select(item) {
            // کلاس فعال
            this.items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // تغییر ویدیو
            const src = item.dataset.src;
            const poster = item.dataset.poster;
            const source = this.player.querySelector('source');

            if (source) source.src = src;
            if (poster) this.player.poster = poster;

            this.player.load();
            this.player.play().catch(() => { });

            // اطلاعات
            const tag = document.getElementById('videoTag');
            const title = document.getElementById('videoTitle');
            const desc = document.getElementById('videoDesc');

            if (tag) tag.textContent = item.dataset.tag || '';
            if (title) title.textContent = item.dataset.title || '';
            if (desc) desc.textContent = item.dataset.desc || '';
        }
    };

    // ============ گالری با نمایشگر پیش‌فرض + لایت‌باکس ============
    const Gallery = {
        items: [],
        currentIndex: 0,

        // نمایشگر اصلی
        viewerImage: null,
        viewerBadge: null,
        viewerTitle: null,
        viewerDesc: null,

        // لایت‌باکس
        lightbox: null,
        lightboxImg: null,
        lightboxCounter: null,

        // داده‌های توضیحات
        descriptions: [
        ],

        init() {
            this.items = Array.from(document.querySelectorAll('.gallery-item'));

            // عناصر نمایشگر
            this.viewerImage = document.getElementById('viewerImage');
            this.viewerBadge = document.getElementById('viewerBadge');
            this.viewerTitle = document.getElementById('viewerTitle');
            this.viewerDesc = document.getElementById('viewerDesc');

            // عناصر لایت‌باکس
            this.lightbox = document.getElementById('lightbox');
            this.lightboxImg = document.getElementById('lightboxImg');
            this.lightboxCounter = document.getElementById('lightboxCounter');

            if (this.items.length === 0) return;

            // کلیک روی هر آیتم → نمایش در viewer
            this.items.forEach((item, index) => {
                item.addEventListener('click', () => this.select(index));
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.select(index);
                    }
                });
            });

            // دکمه‌های ناوبری viewer
            document.getElementById('viewerPrev')
                ?.addEventListener('click', () => this.select(this.currentIndex - 1));

            document.getElementById('viewerNext')
                ?.addEventListener('click', () => this.select(this.currentIndex + 1));

            document.getElementById('viewerExpand')
                ?.addEventListener('click', () => this.openLightbox());

            // بستن لایت‌باکس
            document.getElementById('lightboxClose')
                ?.addEventListener('click', () => this.closeLightbox());

            document.getElementById('lightboxPrev')
                ?.addEventListener('click', () => this.navigateLightbox(-1));

            document.getElementById('lightboxNext')
                ?.addEventListener('click', () => this.navigateLightbox(1));

            // کلیک روی پس‌زمینه لایت‌باکس
            this.lightbox?.addEventListener('click', (e) => {
                if (e.target === this.lightbox) this.closeLightbox();
            });

            // کیبورد
            document.addEventListener('keydown', (e) => {
                if (this.lightbox?.classList.contains('open')) {
                    if (e.key === 'Escape') this.closeLightbox();
                    if (e.key === 'ArrowRight') this.navigateLightbox(-1);
                    if (e.key === 'ArrowLeft') this.navigateLightbox(1);
                } else {
                    if (e.key === 'ArrowRight') this.select(this.currentIndex - 1);
                    if (e.key === 'ArrowLeft') this.select(this.currentIndex + 1);
                }
            });

            // نمایش اولیه
            this.select(0);
        },

        // انتخاب و نمایش در viewer
        select(index) {
            if (!this.items.length) return;

            // حلقه‌ای
            this.currentIndex =
                (index + this.items.length) % this.items.length;

            const item = this.items[this.currentIndex];
            const img = item.querySelector('img');
            if (!img) return;

            // به‌روزرسانی نمایشگر
            if (this.viewerImage) {
                this.viewerImage.src = img.src;
                this.viewerImage.alt = img.alt || '';

                // انیمیشن
                this.viewerImage.style.animation = 'none';
                requestAnimationFrame(() => {
                    this.viewerImage.style.animation = 'viewerFade .35s ease';
                });
            }

            // شمارنده
            const current = toPersianNumber(this.currentIndex + 1);
            const total = toPersianNumber(this.items.length);

            if (this.viewerBadge) {
                this.viewerBadge.textContent = `تصویر ${current} از ${total}`;
            }

            // عنوان
            const overlayTitle = item.querySelector('.gallery-overlay h4');
            if (this.viewerTitle && overlayTitle) {
                this.viewerTitle.textContent = overlayTitle.textContent;
            }

            // توضیحات
            if (this.viewerDesc) {
                this.viewerDesc.textContent =
                    this.descriptions[this.currentIndex] || '';
            }

            // کلاس active
            this.items.forEach((it, i) => {
                it.classList.toggle('active', i === this.currentIndex);
            });
        },

        // باز کردن لایت‌باکس
        openLightbox() {
            if (!this.lightbox || !this.lightboxImg) return;

            const item = this.items[this.currentIndex];
            const img = item?.querySelector('img');
            if (!img) return;

            this.lightboxImg.src = img.src;
            this.lightboxImg.alt = img.alt || '';

            const current = toPersianNumber(this.currentIndex + 1);
            const total = toPersianNumber(this.items.length);
            if (this.lightboxCounter) {
                this.lightboxCounter.textContent = `${current} / ${total}`;
            }

            this.lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
            document.getElementById('lightboxClose')?.focus();
        },

        closeLightbox() {
            if (!this.lightbox) return;
            this.lightbox.classList.remove('open');
            document.body.style.overflow = '';
        },

        navigateLightbox(direction) {
            this.select(this.currentIndex + direction);
            this.openLightbox();
        }
    };

    // ============ انیمیشن ورود ============
    const Reveal = {
        init() {
            const elements = document.querySelectorAll(
                '.section, .roadmap-step, .about-card, .gallery-item, .video-player, .playlist, .cta-game-box'
            );

            if (!('IntersectionObserver' in window)) {
                elements.forEach(el => el.style.opacity = '1');
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(24px)';
                el.style.transition = 'opacity .7s ease, transform .7s ease';
                observer.observe(el);
            });
        }
    };

    // ============ مقداردهی اولیه ============
    document.addEventListener('DOMContentLoaded', () => {
        Menu.init();
        Video.init();
        Gallery.init();
        Reveal.init();
    });

})();

// /sales/script.js
// 전환효과 20종 + ROI 계산기 + 수익 그래프 완전판

(function() {
    'use strict';

    // ========================================
    // Effect 14: Dynamic UTM Headline
    // ========================================
    function getUTMParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function initUTMHeadline() {
        const headlineElement = document.getElementById('dynamic-headline');
        if (!headlineElement) return;

        // TODO 교체: UTM 우선순위 (utm_headline > utm_ad > utm_kw)
        const utmHeadline = getUTMParameter('utm_headline');
        const utmAd = getUTMParameter('utm_ad');
        const utmKw = getUTMParameter('utm_kw');

        let customHeadline = null;

        if (utmHeadline) {
            customHeadline = decodeURIComponent(utmHeadline);
        } else if (utmAd) {
            customHeadline = `${decodeURIComponent(utmAd)}로<br><span class="text-primary">매출 자동화 시작하기</span>`;
        } else if (utmKw) {
            customHeadline = `${decodeURIComponent(utmKw)} 고민 해결,<br><span class="text-primary">월5천 세일즈 자동화</span>`;
        }

        if (customHeadline) {
            headlineElement.innerHTML = customHeadline;
        }
    }

    // ========================================
    // Effect 3: Sequential Reveal
    // ========================================
    function initRevealAnimation() {
        const revealElements = document.querySelectorAll('.reveal');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        let delay = 0;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    delay += 100;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }

    // ========================================
    // Stats Counter-Up
    // ========================================
    function animateCounter(element, target, isDecimal = false, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 150);
            }

            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    function initCounterUp() {
        const statNumbers = document.querySelectorAll('.stat-number');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseFloat(element.getAttribute('data-target'));
                    const isDecimal = element.hasAttribute('data-decimal');
                    element.style.transition = 'transform 0.15s ease';
                    animateCounter(element, target, isDecimal);
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        statNumbers.forEach(el => observer.observe(el));
    }

    // ========================================
    // Effect 8: Countdown Timer (15분, 3분 이하 문구 변경)
    // ========================================
    function initCountdown() {
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        const scarcityDesc = document.getElementById('scarcity-desc');

        if (!minutesElement || !secondsElement) return;

        const TIMER_DURATION = 15 * 60; // TODO 교체: 타이머 시간 (초 단위)
        const STORAGE_KEY = 'sales_countdown_start';

        let startTime = localStorage.getItem(STORAGE_KEY);

        if (!startTime) {
            startTime = Date.now();
            localStorage.setItem(STORAGE_KEY, startTime);
        } else {
            startTime = parseInt(startTime, 10);
        }

        function updateCountdown() {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            const remaining = Math.max(0, TIMER_DURATION - elapsed);

            const minutes = Math.floor(remaining / 60);
            const seconds = remaining % 60;

            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');

            // Effect 8: 3분 이하일 때 문구 변경
            if (remaining <= 180 && remaining > 0) {
                scarcityDesc.textContent = '지금 신청 시 세팅비 무료';
                scarcityDesc.style.color = 'var(--success)';
            }

            // 0초 도달 시 CTA 문구 변경
            if (remaining === 0) {
                const allCTAButtons = document.querySelectorAll('.btn-text, .sticky-cta-text');
                allCTAButtons.forEach(btn => {
                    btn.textContent = '대기열 등록하기';
                });

                clearInterval(timerInterval);
            }
        }

        updateCountdown();
        const timerInterval = setInterval(updateCountdown, 1000);
    }

    // ========================================
    // Offer Countdown (내일 자정까지)
    // ========================================
    function initOfferCountdown() {
        const hoursEl = document.getElementById('offer-hours');
        const minutesEl = document.getElementById('offer-minutes');
        const secondsEl = document.getElementById('offer-seconds');

        if (!hoursEl || !minutesEl || !secondsEl) return;

        function updateOfferCountdown() {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const diff = tomorrow - now;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        updateOfferCountdown();
        setInterval(updateOfferCountdown, 1000);
    }

    // ========================================
    // Effect 17: Limited Slots Counter (실시간 랜덤 감소)
    // ========================================
    function initLimitedSlots() {
        const slotsNumber = document.getElementById('limited-slots');
        if (!slotsNumber) return;

        let slots = 3;

        // 30초~90초마다 랜덤으로 1 감소
        function decreaseSlots() {
            if (slots > 0 && Math.random() > 0.5) {
                slots--;
                slotsNumber.textContent = slots;

                if (slots === 0) {
                    slotsNumber.textContent = '마감';
                    slotsNumber.style.color = 'var(--muted)';
                }
            }

            const nextDelay = 30000 + Math.random() * 60000; // 30~90초
            setTimeout(decreaseSlots, nextDelay);
        }

        setTimeout(decreaseSlots, 30000); // 첫 감소는 30초 후
    }

    // ========================================
    // Effect 16: ROI Simulator (실시간 계산 + 미니바 그래프)
    // ========================================
    function initROISimulator() {
        const trafficInput = document.getElementById('traffic');
        const priceInput = document.getElementById('price');
        const conversionInput = document.getElementById('conversion');
        const quantityInput = document.getElementById('quantity');
        const dailyRevenueEl = document.getElementById('daily-revenue');
        const monthlyRevenueEl = document.getElementById('monthly-revenue');
        const resultBar = document.getElementById('result-bar');

        if (!trafficInput || !dailyRevenueEl) return;

        // TODO 교체: 기본값 상수
        const DEFAULT_TRAFFIC = 100;
        const DEFAULT_PRICE = 100000;
        const DEFAULT_CONVERSION = 12.8;
        const DEFAULT_QUANTITY = 1;

        function calculateROI() {
            const traffic = parseFloat(trafficInput.value) || DEFAULT_TRAFFIC;
            const price = parseFloat(priceInput.value) || DEFAULT_PRICE;
            const conversion = parseFloat(conversionInput.value) || DEFAULT_CONVERSION;
            const quantity = parseFloat(quantityInput.value) || DEFAULT_QUANTITY;

            const dailyRevenue = traffic * (conversion / 100) * price * quantity;
            const monthlyRevenue = dailyRevenue * 30;

            dailyRevenueEl.textContent = `${Math.floor(dailyRevenue).toLocaleString()}원`;
            monthlyRevenueEl.textContent = `${Math.floor(monthlyRevenue).toLocaleString()}원`;

            // 미니바 그래프 (최대 1억 기준)
            const maxRevenue = 100000000;
            const barPercent = Math.min((monthlyRevenue / maxRevenue) * 100, 100);
            resultBar.style.width = `${barPercent}%`;
        }

        // 입력 이벤트 리스너
        [trafficInput, priceInput, conversionInput, quantityInput].forEach(input => {
            input.addEventListener('input', calculateROI);
        });

        // 초기 계산
        calculateROI();
    }

    // ========================================
    // Effect 18: Revenue Graph (7일 상승 애니메이션)
    // ========================================
    function initRevenueGraph() {
        const canvas = document.getElementById('revenue-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // 더미 데이터 (Day 1~7)
        const data = [500000, 850000, 1200000, 1800000, 2400000, 3100000, 3800000];
        const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

        const maxValue = Math.max(...data);
        const padding = 60;
        const graphWidth = width - padding * 2;
        const graphHeight = height - padding * 2;

        let animationProgress = 0;

        function drawGraph() {
            ctx.clearRect(0, 0, width, height);

            // 배경
            ctx.fillStyle = '#141414';
            ctx.fillRect(0, 0, width, height);

            // 그리드 라인
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;

            for (let i = 0; i <= 5; i++) {
                const y = padding + (graphHeight / 5) * i;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
            }

            // Y축 라벨
            ctx.fillStyle = '#b3b3b3';
            ctx.font = '12px system-ui';
            ctx.textAlign = 'right';

            for (let i = 0; i <= 5; i++) {
                const value = maxValue - (maxValue / 5) * i;
                const y = padding + (graphHeight / 5) * i;
                ctx.fillText(`${(value / 1000000).toFixed(1)}M`, padding - 10, y + 4);
            }

            // X축 라벨
            ctx.textAlign = 'center';
            labels.forEach((label, i) => {
                const x = padding + (graphWidth / (labels.length - 1)) * i;
                ctx.fillText(label, x, height - padding + 20);
            });

            // 라인 그래프 (애니메이션)
            const pointsToShow = Math.ceil(data.length * animationProgress);

            ctx.strokeStyle = '#e50914';
            ctx.lineWidth = 3;
            ctx.beginPath();

            for (let i = 0; i < pointsToShow; i++) {
                const x = padding + (graphWidth / (data.length - 1)) * i;
                const y = padding + graphHeight - (data[i] / maxValue) * graphHeight;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();

            // 포인트 원
            ctx.fillStyle = '#e50914';
            for (let i = 0; i < pointsToShow; i++) {
                const x = padding + (graphWidth / (data.length - 1)) * i;
                const y = padding + graphHeight - (data[i] / maxValue) * graphHeight;

                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();
            }

            // 애니메이션 진행
            if (animationProgress < 1) {
                animationProgress += 0.02;
                requestAnimationFrame(drawGraph);
            }
        }

        // IntersectionObserver로 뷰포트 진입 시 애니메이션 시작
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animationProgress = 0;
                    drawGraph();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(canvas);
    }

    // ========================================
    // Effect 19: Before→After Slider
    // ========================================
    function initBeforeAfterSlider() {
        const slider = document.getElementById('ba-slider');
        const afterElement = document.getElementById('ba-after');

        if (!slider || !afterElement) return;

        function updateSlider() {
            const value = slider.value;
            afterElement.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        }

        slider.addEventListener('input', updateSlider);
        updateSlider();
    }

    // ========================================
    // Effect 6: Sticky CTA + Progress Bar
    // ========================================
    function initStickyCTA() {
        const stickyCTA = document.getElementById('sticky-cta');
        const stickyProgress = document.getElementById('sticky-progress');
        if (!stickyCTA) return;

        const SCROLL_THRESHOLD = 400;

        function handleScroll() {
            const scrolled = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progressPercent = (scrolled / docHeight) * 100;

            if (stickyProgress) {
                stickyProgress.style.width = `${progressPercent}%`;
            }

            if (scrolled > SCROLL_THRESHOLD) {
                stickyCTA.classList.add('visible');
            } else {
                stickyCTA.classList.remove('visible');
            }
        }

        let rafId = null;
        window.addEventListener('scroll', () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                handleScroll();
                rafId = null;
            });
        });

        handleScroll();
    }

    // ========================================
    // Header Scroll Effect
    // ========================================
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        function handleScroll() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        let rafId = null;
        window.addEventListener('scroll', () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                handleScroll();
                rafId = null;
            });
        });
    }

    // ========================================
    // Effect 4: Floating Benefit Bubble
    // ========================================
    function initFloatingBubble() {
        const bubble = document.getElementById('floating-bubble');
        if (!bubble) return;

        let bubbleVisible = false;
        let hideTimeout = null;

        function showBubble() {
            if (bubbleVisible) return;
            bubble.classList.add('visible');
            bubbleVisible = true;

            hideTimeout = setTimeout(() => {
                hideBubble();
            }, 5000);
        }

        function hideBubble() {
            bubble.classList.remove('visible');
            bubbleVisible = false;
            if (hideTimeout) clearTimeout(hideTimeout);
        }

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent >= 40 && scrollPercent <= 70 && !bubbleVisible) {
                showBubble();
            } else if ((scrollPercent < 40 || scrollPercent > 70) && bubbleVisible) {
                hideBubble();
            }
        });
    }

    // ========================================
    // Effect 7: Scroll-Triggered CTA
    // ========================================
    function initScrollCTA() {
        const scrollCTA = document.getElementById('scroll-cta');
        if (!scrollCTA) return;

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent >= 60) {
                scrollCTA.classList.add('visible');
            } else {
                scrollCTA.classList.remove('visible');
            }
        });

        scrollCTA.querySelector('.btn').addEventListener('click', openModal);
    }

    // ========================================
    // Effect 9: Exit Intent Notice
    // ========================================
    function initExitIntent() {
        let originalTitle = document.title;
        let titleInterval = null;

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                let toggle = false;
                titleInterval = setInterval(() => {
                    document.title = toggle ? '⚠️ 세팅 진행 중입니다' : originalTitle;
                    toggle = !toggle;
                }, 1000);
            } else {
                if (titleInterval) {
                    clearInterval(titleInterval);
                    document.title = originalTitle;
                }
            }
        });
    }

    // ========================================
    // Effect 10: Auto CTA Popup
    // ========================================
    function initAutoCTAPopup() {
        let idleTimer = null;
        let viewTimer = null;
        let popupShown = false;

        function showMiniPopup() {
            if (popupShown) return;
            popupShown = true;

            const bubble = document.getElementById('floating-bubble');
            if (bubble) {
                bubble.querySelector('.bubble-text').textContent = '지금 신청하면 보너스 3종 무료!';
                bubble.classList.add('visible');

                setTimeout(() => {
                    bubble.classList.remove('visible');
                }, 6000);
            }
        }

        function resetIdleTimer() {
            if (idleTimer) clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                showMiniPopup();
            }, 20000);
        }

        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetIdleTimer, { passive: true });
        });

        resetIdleTimer();

        viewTimer = setTimeout(() => {
            showMiniPopup();
        }, 30000);
    }

    // ========================================
    // Effect 11: Live Counter Simulation
    // ========================================
    function initLiveCounter() {
        const liveCounter = document.getElementById('live-counter');
        const liveCount = document.getElementById('live-count');
        if (!liveCounter || !liveCount) return;

        let count = 37;

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent >= 20) {
                liveCounter.classList.add('visible');
            }
        });

        setInterval(() => {
            const change = Math.random() > 0.5 ? 1 : -1;
            count = Math.max(30, Math.min(50, count + change));
            liveCount.textContent = count;
        }, 30000);
    }

    // ========================================
    // Effect 12: Toast Notification
    // ========================================
    function initToastNotification() {
        const toast = document.getElementById('toast');
        const toastText = document.getElementById('toast-text');
        if (!toast || !toastText) return;

        // TODO 교체: 더미 데이터 배열
        const dummyData = [
            '김○○님 3분 전 신청',
            '이○○님 5분 전 신청',
            '박○○님 7분 전 신청',
            '정○○님 10분 전 신청',
            '최○○님 12분 전 신청',
            '강○○님 15분 전 신청'
        ];

        let currentIndex = 0;

        function showToast() {
            toastText.textContent = dummyData[currentIndex];
            toast.classList.add('visible');

            setTimeout(() => {
                toast.classList.remove('visible');
            }, 4000);

            currentIndex = (currentIndex + 1) % dummyData.length;
        }

        setTimeout(() => {
            showToast();
            setInterval(showToast, 45000);
        }, 15000);
    }

    // ========================================
    // Effect 13: Proof Auto Slider
    // ========================================
    function initProofCarousel() {
        const carousel = document.getElementById('proof-carousel');
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track');
        const items = track.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-nav-prev');
        const nextBtn = document.querySelector('.carousel-nav-next');

        if (!track || items.length === 0) return;

        let currentIndex = 0;
        let autoSlideInterval = null;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        const itemWidth = items[0].offsetWidth + 16;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % (items.length - 2);
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }

        if (prevBtn) prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        track.addEventListener('mousedown', dragStart);
        track.addEventListener('touchstart', dragStart);
        track.addEventListener('mouseup', dragEnd);
        track.addEventListener('touchend', dragEnd);
        track.addEventListener('mousemove', drag);
        track.addEventListener('touchmove', drag);
        track.addEventListener('mouseleave', dragEnd);

        function dragStart(e) {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            track.classList.add('dragging');
            stopAutoSlide();
        }

        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const diff = currentX - startX;
            currentTranslate = prevTranslate + diff;
        }

        function dragEnd() {
            if (!isDragging) return;
            isDragging = false;
            track.classList.remove('dragging');

            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -100 && currentIndex < items.length - 3) {
                nextSlide();
            } else if (movedBy > 100 && currentIndex > 0) {
                prevSlide();
            }

            prevTranslate = currentIndex * itemWidth;
            currentTranslate = prevTranslate;
            startAutoSlide();
        }

        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);

        startAutoSlide();
    }

    // ========================================
    // Effect 15: Randomized Testimonials
    // ========================================
    function initRandomizedTestimonials() {
        const carouselItems = document.querySelectorAll('.carousel-item');
        if (carouselItems.length === 0) return;

        const itemsArray = Array.from(carouselItems);
        for (let i = itemsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [itemsArray[i], itemsArray[j]] = [itemsArray[j], itemsArray[i]];
        }

        const track = carouselItems[0].parentElement;
        track.innerHTML = '';
        itemsArray.forEach(item => track.appendChild(item));
    }

    // ========================================
    // Effect 5: Micro Vibration on Click
    // ========================================
    function initMicroVibration() {
        const allButtons = document.querySelectorAll('.btn');

        allButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.add('vibrate');
                setTimeout(() => {
                    this.classList.remove('vibrate');
                }, 90);
            });
        });
    }

    // ========================================
    // Modal (Effect 20: Double Tap Guard)
    // ========================================
    let modalSubmitting = false;

    function openModal() {
        const modal = document.getElementById('modal');
        if (!modal) return;

        modal.classList.add('active');
        document.body.classList.add('modal-open');

        const focusableElements = modal.querySelectorAll('button, iframe, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    function closeModal() {
        const modal = document.getElementById('modal');
        if (!modal) return;

        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        modalSubmitting = false;
    }

    function initModal() {
        const modal = document.getElementById('modal');
        const modalOverlay = modal?.querySelector('.modal-overlay');
        const modalClose = modal?.querySelector('.modal-close');
        const allCTAButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-sticky, .btn-hero, .btn-header');

        if (!modal) return;

        allCTAButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                // Effect 20: Double Tap Guard
                if (modalSubmitting) return;

                openModal();
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // 폼 제출 시뮬레이션 (Effect 20)
        const iframe = modal.querySelector('.airtable-embed');
        if (iframe) {
            // 실제로는 Airtable 폼 제출 이벤트를 감지해야 함
            // 여기서는 시뮬레이션
            setTimeout(() => {
                // 제출 감지 시
                // showLoadingState();
            }, 0);
        }
    }

    function showLoadingState() {
        modalSubmitting = true;
        const modal = document.getElementById('modal');
        const loading = document.getElementById('modal-loading');
        const allButtons = modal.querySelectorAll('.btn');

        allButtons.forEach(btn => btn.classList.add('loading'));
        if (loading) loading.classList.add('active');

        // 시뮬레이션: 2초 후 thankyou.html로 이동
        setTimeout(() => {
            window.location.href = 'thankyou.html';
        }, 2000);
    }

    // ========================================
    // Lazy Loading Images
    // ========================================
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            return; // 네이티브 지원
        }

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // 초기화
    // ========================================
    function init() {
        // Effect 14: UTM Headline
        initUTMHeadline();

        // Effect 3: Sequential Reveal
        initRevealAnimation();

        // Stats Counter
        initCounterUp();

        // Effect 8: Countdown Timer
        initCountdown();

        // Offer Countdown
        initOfferCountdown();

        // Effect 17: Limited Slots
        initLimitedSlots();

        // Effect 16: ROI Simulator
        initROISimulator();

        // Effect 18: Revenue Graph
        initRevenueGraph();

        // Effect 19: Before→After Slider
        initBeforeAfterSlider();

        // Effect 6: Sticky CTA
        initStickyCTA();

        // Header Scroll
        initHeaderScroll();

        // Effect 4: Floating Bubble
        initFloatingBubble();

        // Effect 7: Scroll CTA
        initScrollCTA();

        // Effect 9: Exit Intent
        initExitIntent();

        // Effect 10: Auto CTA Popup
        initAutoCTAPopup();

        // Effect 11: Live Counter
        initLiveCounter();

        // Effect 12: Toast Notification
        initToastNotification();

        // Effect 15: Randomized Testimonials
        initRandomizedTestimonials();

        // Effect 13: Proof Carousel
        initProofCarousel();

        // Effect 5: Micro Vibration
        initMicroVibration();

        // Modal
        initModal();

        // Lazy Loading
        initLazyLoading();

        // TODO 교체: 애널리틱스/트래킹 코드
        setTimeout(() => {
            console.log('월5천 세일즈 자동화 - 완전판 로드 완료 (전환효과 20종)');
        }, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/*
배포 안내:
/sales 폴더를 Vercel/Netlify에 배포
- Vercel: cd /sales && vercel --prod
- Netlify: cd /sales && netlify deploy --prod --dir .
*/

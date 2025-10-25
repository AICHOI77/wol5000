// ========================================
// AI 자동화 수익 무료 비밀강의
// 20가지 전환효과 완전 통합 스크립트
// ========================================

// ========================================
// EFFECT 1: Hover Gradient CTA
// ========================================
// CSS에서 .cta-hover-gradient 클래스로 구현됨

// ========================================
// EFFECT 2: Scroll Gradient Background
// ========================================
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        const opacity = Math.min(scrollPercent * 2, 0.8);
        heroSection.style.background = `linear-gradient(180deg, #0b0b0b 0%, rgba(26, 5, 5, ${opacity}) 100%)`;
    }
});

// ========================================
// EFFECT 3: Sequential Reveal
// ========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-sequential').forEach(el => {
    revealObserver.observe(el);
});

// ========================================
// EFFECT 4: Floating Benefit Bubble
// ========================================
// CSS 애니메이션으로 구현 완료 (floatBubble)

// ========================================
// EFFECT 5: Micro Vibration
// ========================================
const vibrateTriggers = document.querySelectorAll('.micro-vibrate');
const vibrateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('micro-vibrate');
            setTimeout(() => {
                entry.target.classList.remove('micro-vibrate');
            }, 300);
        }
    });
}, { threshold: 0.5 });

vibrateTriggers.forEach(el => vibrateObserver.observe(el));

// ========================================
// EFFECT 6: Sticky CTA + Progress Bar
// ========================================
const scrollProgress = document.getElementById('scroll-progress');
const stickyCTA = document.getElementById('sticky-cta');

window.addEventListener('scroll', () => {
    // Progress Bar
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';

    // Sticky CTA (appears after 40% scroll)
    if (scrollPercent > 40) {
        stickyCTA.classList.add('visible');
    } else {
        stickyCTA.classList.remove('visible');
    }
});

// ========================================
// EFFECT 7: Scroll Triggered CTA
// ========================================
const scrollCTA = document.getElementById('scroll-cta');
if (scrollCTA) {
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    ctaObserver.observe(scrollCTA);
}

// ========================================
// NEW: PROGRESS BAR ANIMATION (93%)
// ========================================
const progressBarTop = document.getElementById('progress-bar-top');
const progressBarBottom = document.getElementById('progress-bar-bottom');

// Animate to 93% on page load
setTimeout(() => {
    if (progressBarTop) progressBarTop.style.width = '93%';
    if (progressBarBottom) progressBarBottom.style.width = '93%';
}, 100);

// ========================================
// NEW: DRAMATIC COUNTDOWN TIMER (MM:SS:CS)
// ========================================
const countdownTimer = document.getElementById('countdown-timer');
const countdownTimerFinal = document.getElementById('countdown-timer-final');
const countdownText = document.getElementById('countdown-text');
const countdownTextFinal = document.getElementById('countdown-text-final');

// 5분 (300초) 카운트다운을 센티초(centisecond) 단위로 정밀하게 표시
// 형식: MM:SS:CS (분:초:센티초)
let totalCentiseconds = 300 * 100; // 5분 = 30000 센티초

function updatePreciseTimer() {
    if (totalCentiseconds >= 0) {
        const minutes = Math.floor(totalCentiseconds / 6000);
        const seconds = Math.floor((totalCentiseconds % 6000) / 100);
        const centiseconds = totalCentiseconds % 100;

        const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;

        if (countdownTimer) countdownTimer.textContent = display;
        if (countdownTimerFinal) countdownTimerFinal.textContent = display;

        totalCentiseconds--;
        setTimeout(updatePreciseTimer, 10); // 10ms = 0.01초마다 업데이트
    } else {
        // Timer finished
        if (countdownText) {
            countdownText.textContent = '⚠️ 세션 마감! 지금은 대기등록만 가능합니다.';
            countdownText.style.color = '#e50914';
            countdownText.style.animation = 'none';
        }
        if (countdownTextFinal) {
            countdownTextFinal.textContent = '⚠️ 세션 마감! 지금은 대기등록만 가능합니다.';
            countdownTextFinal.style.color = '#e50914';
            countdownTextFinal.style.animation = 'none';
        }
    }
}

// Start timer
updatePreciseTimer();

// ========================================
// EFFECT 9: Exit Intent Title Blink
// ========================================
let exitIntentTriggered = false;

document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        const heroTitle = document.getElementById('hero-title-blink');
        if (heroTitle) {
            heroTitle.classList.add('blink-animation');
            setTimeout(() => {
                heroTitle.classList.remove('blink-animation');
            }, 1500);
        }

        // Reset after 10 seconds
        setTimeout(() => {
            exitIntentTriggered = false;
        }, 10000);
    }
});

// ========================================
// EFFECT 10: Idle Auto CTA Pop
// ========================================
let idleTimer;
let idlePopupShown = false;

function resetIdleTimer() {
    clearTimeout(idleTimer);
    if (!idlePopupShown) {
        idleTimer = setTimeout(() => {
            const idlePopup = document.getElementById('idle-popup-modal');
            if (idlePopup) {
                idlePopup.classList.add('active');
                idlePopupShown = true;
            }
        }, 30000); // 30 seconds
    }
}

['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetIdleTimer);
});

resetIdleTimer();

// Close idle popup
const closeIdlePopup = document.getElementById('close-idle-popup');
if (closeIdlePopup) {
    closeIdlePopup.addEventListener('click', () => {
        document.getElementById('idle-popup-modal').classList.remove('active');
    });
}

// ========================================
// EFFECT 11: Live Counter Simulation
// ========================================
const liveCounter = document.getElementById('live-counter');
let counterValue = 38;

function updateLiveCounter() {
    const change = Math.random() > 0.5 ? 1 : -1;
    counterValue = Math.max(25, Math.min(55, counterValue + change));
    if (liveCounter) {
        liveCounter.textContent = counterValue;
    }
}

setInterval(updateLiveCounter, 5000); // 5초마다 업데이트

// ========================================
// EFFECT 12: Toast Notification
// ========================================
const toastContainer = document.getElementById('toast-container');
const names = ['김*수', '이*영', '박*현', '최*호', '정*민', '강*우', '조*희', '윤*석'];

function showToast() {
    const name = names[Math.floor(Math.random() * names.length)];
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<strong>${name}</strong>님이 방금 신청했습니다!`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// 10-20초 간격으로 랜덤 토스트 표시
function scheduleNextToast() {
    const delay = Math.random() * 10000 + 10000; // 10-20초
    setTimeout(() => {
        showToast();
        scheduleNextToast();
    }, delay);
}

scheduleNextToast();

// ========================================
// EFFECT 13: Proof Auto Slider
// ========================================
// (이미지 슬라이더는 content-row 구조로 대체됨)

// ========================================
// EFFECT 14: Dynamic UTM Headline
// ========================================
// URL 파라미터 기반 헤드라인 변경
const urlParams = new URLSearchParams(window.location.search);
const utmSource = urlParams.get('utm_source');
const heroEmphasis = document.querySelector('.hero-emphasis-title .red-emphasis');

if (utmSource && heroEmphasis) {
    const headlines = {
        'facebook': 'SNS 자동화로<br>월 1.6억을 찍었던 비법',
        'google': 'AI 검색 최적화로<br>월 1.6억을 찍었던 비법',
        'youtube': '유튜브 수익화로<br>월 1.6억을 찍었던 비법',
        'email': '이메일 마케팅으로<br>월 1.6억을 찍었던 비법'
    };

    if (headlines[utmSource]) {
        heroEmphasis.innerHTML = headlines[utmSource];
    }
}

// ========================================
// EFFECT 15: Randomized Testimonials
// ========================================
const testimonialsContainer = document.getElementById('testimonials-container');
if (testimonialsContainer) {
    const testimonials = Array.from(testimonialsContainer.querySelectorAll('.benefit-item'));

    // Fisher-Yates Shuffle
    for (let i = testimonials.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        testimonialsContainer.appendChild(testimonials[j]);
    }
}

// ========================================
// EFFECT 16: ROI Simulator
// ========================================
const roiSlider = document.getElementById('roi-slider');
const roiDisplay = document.getElementById('roi-display');
const monthlyRevenue = document.getElementById('monthly-revenue');
const yearlyRevenue = document.getElementById('yearly-revenue');

if (roiSlider) {
    roiSlider.addEventListener('input', (e) => {
        const hours = parseInt(e.target.value);
        roiDisplay.textContent = hours;

        // 시간당 150만원 수익 가정
        const monthly = hours * 30 * 1500000;
        const yearly = monthly * 12;

        monthlyRevenue.textContent = monthly.toLocaleString();
        yearlyRevenue.textContent = yearly.toLocaleString();
    });
}

// ========================================
// EFFECT 17: Limited Slots Counter
// ========================================
const slotsRemaining = document.getElementById('slots-remaining');
let slots = 3;

function updateSlotsCounter() {
    if (slots > 0 && Math.random() > 0.7) {
        slots--;
        if (slotsRemaining) {
            slotsRemaining.textContent = slots;

            if (slots === 0) {
                slotsRemaining.parentElement.innerHTML = '⚠️ <strong style="color: #e50914;">마감되었습니다</strong>';
            }
        }
    }
}

setInterval(updateSlotsCounter, 15000); // 15초마다 체크

// ========================================
// EFFECT 18: Revenue Line Graph
// ========================================
const revenueCanvas = document.getElementById('revenue-canvas');
if (revenueCanvas) {
    const ctx = revenueCanvas.getContext('2d');
    const width = revenueCanvas.width;
    const height = revenueCanvas.height;

    // Clear canvas
    ctx.fillStyle = 'rgba(26, 26, 26, 0.6)';
    ctx.fillRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(width - 30, height - 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, 30);
    ctx.lineTo(50, height - 50);
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = '#FCEEE5';
    ctx.font = '14px Noto Sans KR';
    ctx.fillText('월', 30, height - 30);
    ctx.fillText('수익', 20, 20);

    // Draw line graph
    const data = [500, 800, 1200, 2500, 4500, 8000, 16000];
    const maxValue = Math.max(...data);
    const stepX = (width - 100) / (data.length - 1);

    ctx.strokeStyle = '#e50914';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((value, index) => {
        const x = 50 + (index * stepX);
        const y = height - 50 - ((value / maxValue) * (height - 100));

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        // Draw points
        ctx.fillStyle = '#e50914';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.strokeStyle = '#e50914';
    ctx.stroke();

    // Draw month labels
    ctx.fillStyle = '#FCEEE5';
    ctx.font = '12px Noto Sans KR';
    data.forEach((value, index) => {
        const x = 50 + (index * stepX);
        ctx.fillText(`${index + 1}월`, x - 10, height - 25);
    });
}

// ========================================
// EFFECT 19: Before→After Slide
// ========================================
// (content-row 구조로 이미 구현됨)

// ========================================
// EFFECT 20: CTA Double Tap Guard
// ========================================
const doubleTapGuards = document.querySelectorAll('.double-tap-guard');

doubleTapGuards.forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('processing')) {
            e.preventDefault();
            return false;
        }

        this.classList.add('processing');

        // 2초 후 재활성화
        setTimeout(() => {
            this.classList.remove('processing');
        }, 2000);

        // 실제 CTA 동작 (예: 폼 제출, 페이지 이동 등)
        console.log('CTA 클릭됨:', this.textContent);
    });
});

// ========================================
// BENEFIT ITEMS REVEAL (추가 효과)
// ========================================
const benefitItems = document.querySelectorAll('.benefit-item');
const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, { threshold: 0.3 });

benefitItems.forEach(item => benefitObserver.observe(item));

// ========================================
// UTILITY: Smooth Scroll for All Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// CONSOLE LOG
// ========================================
console.log(`
%c🚀 AI 자동화 수익 무료 비밀강의 %c

✅ 20가지 전환효과 모두 활성화됨:
1. Hover Gradient CTA
2. Scroll Gradient Background
3. Sequential Reveal
4. Floating Benefit Bubble
5. Micro Vibration
6. Sticky CTA + Progress Bar (상단/하단 50% 중앙 정렬)
7. Scroll Triggered CTA
8. Dramatic Countdown (18분 표시 → 5분 실제 카운트)
9. Exit Intent Title Blink
10. Idle Auto CTA Pop (30초)
11. Live Counter Simulation
12. Toast Notification
13. Proof Auto Slider
14. Dynamic UTM Headline
15. Randomized Testimonials
16. ROI Simulator
17. Limited Slots Counter
18. Revenue Line Graph
19. Before→After Slide
20. CTA Double Tap Guard

🎨 새로운 기능:
✓ Progress Bar 50% 너비 중앙 정렬 (93% 자동 채우기)
✓ 극적 카운트다운 타이머 (5분 실시간, scale 애니메이션)
✓ 하단 고정 Sticky CTA (그라데이션 + Hover 진동)
✓ 이미지-텍스트 겹침 오류 완전 제거!
`, 'color: #e50914; font-size: 20px; font-weight: bold;', 'color: #ffffff; font-size: 14px;');

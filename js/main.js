/* ========================================
   rawdogfoodguide.com - JavaScript 主文件
   处理导航、搜索、移动端菜单等交互
   ======================================== */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSearch();
    initSmoothScroll();
    initScrollEffects();
});

/* ========================================
   移动端汉堡菜单
   ======================================== */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // 点击导航链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/* ========================================
   搜索功能
   ======================================== */
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                // 跳转到指南列表页并传递搜索参数
                window.location.href = `guides.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
}

/* ========================================
   平滑滚动
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ========================================
   滚动效果
   ======================================== */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // 导航栏滚动效果
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // 添加阴影效果
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(44, 24, 16, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // 元素进入视口动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    });
    
    // 为卡片添加动画
    document.querySelectorAll('.game-card, .guide-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// 添加淡入动画样式
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

/* ========================================
   指南数据（用于动态渲染）
   ======================================== */
const guidesData = [
    {
        id: 'beginners-guide-raw-feeding-small-dogs',
        name: "Beginner's Guide to Raw Feeding Small Dogs",
        icon: '🥩',
        iconColor: '#C45C4A',
        tags: ['Beginner', 'Basics', 'Getting Started'],
        description: 'Everything you need to know to start your small dog on a raw food diet safely.',
        readTime: '12 min',
        difficulty: 1
    },
    {
        id: 'chihuahua-raw-diet',
        name: 'Chihuahua Raw Diet Guide',
        icon: '🐕',
        iconColor: '#8B6914',
        tags: ['Breed-Specific', 'Chihuahua', 'Small Breed'],
        description: 'Complete raw feeding guide tailored specifically for Chihuahuas and teacup varieties.',
        readTime: '9 min',
        difficulty: 2
    },
    {
        id: 'french-bulldog-raw-diet',
        name: 'French Bulldog Raw Diet Guide',
        icon: '🐶',
        iconColor: '#D4A017',
        tags: ['Breed-Specific', 'French Bulldog', 'Brachycephalic'],
        description: 'Raw feeding guide designed for French Bulldogs with their unique digestive needs.',
        readTime: '10 min',
        difficulty: 2
    },
    {
        id: 'yorkshire-terrier-raw-diet',
        name: 'Yorkshire Terrier Raw Diet Guide',
        icon: '🐕‍🦺',
        iconColor: '#4A7C59',
        tags: ['Breed-Specific', 'Yorkie', 'Small Breed'],
        description: 'Expert guidance on feeding your Yorkshire Terrier a healthy raw diet.',
        readTime: '8 min',
        difficulty: 2
    },
    {
        id: 'shihtzu-raw-diet',
        name: 'Shih Tzu Raw Diet Guide',
        icon: '🐩',
        iconColor: '#C45C4A',
        tags: ['Breed-Specific', 'Shih Tzu', 'Small Breed'],
        description: 'Nutritional guide for feeding your Shih Tzu a species-appropriate raw diet.',
        readTime: '8 min',
        difficulty: 2
    },
    {
        id: 'pomeranian-raw-diet',
        name: 'Pomeranian Raw Diet Guide',
        icon: '🦊',
        iconColor: '#5A9469',
        tags: ['Breed-Specific', 'Pomeranian', 'Toy Breed'],
        description: 'Raw feeding guidelines specifically for energetic Pomeranians.',
        readTime: '7 min',
        difficulty: 2
    },
    {
        id: 'dachshund-raw-diet',
        name: 'Dachshund Raw Diet Guide',
        icon: '🌭',
        iconColor: '#6B5010',
        tags: ['Breed-Specific', 'Dachshund', 'Small Breed'],
        description: 'Complete raw diet guide tailored for long-backed Dachshunds.',
        readTime: '9 min',
        difficulty: 2
    },
    {
        id: 'maltese-raw-diet',
        name: 'Maltese Raw Diet Guide',
        icon: '🐾',
        iconColor: '#A67C00',
        tags: ['Breed-Specific', 'Maltese', 'Toy Breed'],
        description: 'Raw feeding guide for your elegant Maltese companion.',
        readTime: '8 min',
        difficulty: 2
    },
    {
        id: 'barf-diet-small-breeds',
        name: 'BARF Diet for Small Breeds',
        icon: '🦴',
        iconColor: '#4A7C59',
        tags: ['BARF', 'Nutrition', 'Complete Diet'],
        description: 'Understanding the BARF (Biologically Appropriate Raw Food) diet model for small dogs.',
        readTime: '12 min',
        difficulty: 3
    },
    {
        id: 'raw-feeding-portion-calculator',
        name: 'Raw Feeding Portion Calculator',
        icon: '⚖️',
        iconColor: '#5A9469',
        tags: ['Calculator', 'Portions', 'Tools'],
        description: 'Calculate the perfect amount of raw food for your small breed dog.',
        readTime: '5 min',
        difficulty: 1
    },
    {
        id: 'raw-food-safety-handling',
        name: 'Raw Food Safety & Handling Guide',
        icon: '🛡️',
        iconColor: '#6B5010',
        tags: ['Safety', 'Hygiene', 'Storage'],
        description: 'Essential safety practices for handling, storing, and preparing raw dog food.',
        readTime: '8 min',
        difficulty: 1
    },
    {
        id: 'boston-terrier-raw-diet',
        name: 'Boston Terrier Raw Diet Guide',
        icon: '🎩',
        iconColor: '#4A7C59',
        tags: ['Breed-Specific', 'Boston Terrier', 'Small Breed'],
        description: 'Complete raw feeding guide tailored specifically for Boston Terriers and their unique nutritional needs.',
        readTime: '9 min',
        difficulty: 2
    },
    {
        id: 'cavalier-king-charles-raw-diet',
        name: 'Cavalier King Charles Raw Diet Guide',
        icon: '👑',
        iconColor: '#C45C4A',
        tags: ['Breed-Specific', 'Cavalier', 'Toy Breed'],
        description: 'Expert raw feeding guidance for Cavalier King Charles Spaniels with heart health considerations.',
        readTime: '10 min',
        difficulty: 2
    },
    {
        id: 'pug-raw-diet',
        name: 'Pug Raw Diet Guide',
        icon: '🐶',
        iconColor: '#8B6914',
        tags: ['Breed-Specific', 'Pug', 'Brachycephalic'],
        description: 'Raw feeding guide designed for Pugs with their unique respiratory and digestive requirements.',
        readTime: '8 min',
        difficulty: 2
    },
    {
        id: 'papillon-raw-diet',
        name: 'Papillon Raw Diet Guide',
        icon: '🦋',
        iconColor: '#D4A017',
        tags: ['Breed-Specific', 'Papillon', 'Toy Breed'],
        description: 'Nutritional guide for feeding your elegant Papillon a healthy raw diet.',
        readTime: '7 min',
        difficulty: 2
    },
    {
        id: 'havanese-raw-diet',
        name: 'Havanese Raw Diet Guide',
        icon: '🌺',
        iconColor: '#5A9469',
        tags: ['Breed-Specific', 'Havanese', 'Toy Breed'],
        description: 'Complete raw feeding guide for Havanese dogs with their silky coats and lively personalities.',
        readTime: '8 min',
        difficulty: 2
    },
    {
        id: 'raw-diet-transition-guide',
        name: 'Raw Diet Transition Guide',
        icon: '🔄',
        iconColor: '#6B5010',
        tags: ['Transition', 'Getting Started', 'Tips'],
        description: 'Step-by-step guide to safely transition your small dog from kibble to raw food.',
        readTime: '10 min',
        difficulty: 2
    },
    {
        id: 'raw-diet-supplements-small-dogs',
        name: 'Raw Diet Supplements for Small Dogs',
        icon: '💊',
        iconColor: '#C45C4A',
        tags: ['Supplements', 'Nutrition', 'Health'],
        description: 'Essential supplements to complement a raw diet for optimal small dog health.',
        readTime: '9 min',
        difficulty: 3
    },
    {
        id: 'raw-meaty-bones-small-dogs',
        name: 'Raw Meaty Bones for Small Dogs',
        icon: '🦴',
        iconColor: '#4A7C59',
        tags: ['Meaty Bones', 'Chewing', 'Dental Health'],
        description: 'Safe raw bone options and feeding guidelines for small breed dogs.',
        readTime: '8 min',
        difficulty: 2
    },
    {
        id: 'puppy-raw-feeding-guide',
        name: 'Puppy Raw Feeding Guide',
        icon: '🐕‍🦺',
        iconColor: '#8B6914',
        tags: ['Puppy', 'Growth', 'Development'],
        description: 'Complete guide to raising a healthy small breed puppy on a raw food diet.',
        readTime: '12 min',
        difficulty: 2
    },
    {
        id: 'raw-diet-allergies-small-dogs',
        name: 'Raw Diet Allergies in Small Dogs',
        icon: '⚠️',
        iconColor: '#D4A017',
        tags: ['Allergies', 'Health', 'Sensitive Dogs'],
        description: 'Understanding and managing food allergies when feeding a raw diet to small dogs.',
        readTime: '9 min',
        difficulty: 3
    },
    {
        id: 'prey-model-raw-diet-small-breeds',
        name: 'Prey Model Raw Diet for Small Breeds',
        icon: '🎯',
        iconColor: '#5A9469',
        tags: ['Prey Model', 'BARF', 'Complete Diet'],
        description: 'Understanding the prey model approach to raw feeding for small breed dogs.',
        readTime: '11 min',
        difficulty: 3
    }
];

// 添加更多品种指南数据
const breedsData = [
    { id: 'chihuahua', name: 'Chihuahua', icon: '🐕', color: '#8B6914' },
    { id: 'french-bulldog', name: 'French Bulldog', icon: '🐶', color: '#D4A017' },
    { id: 'yorkshire-terrier', name: 'Yorkshire Terrier', icon: '🐕‍🦺', color: '#4A7C59' },
    { id: 'shih-tzu', name: 'Shih Tzu', icon: '🐩', color: '#C45C4A' },
    { id: 'pomeranian', name: 'Pomeranian', icon: '🦊', color: '#5A9469' },
    { id: 'dachshund', name: 'Dachshund', icon: '🌭', color: '#6B5010' },
    { id: 'maltese', name: 'Maltese', icon: '🐾', color: '#A67C00' },
    { id: 'poodle', name: 'Toy Poodle', icon: '🐩', color: '#3A6249' },
    { id: 'cavalier', name: 'Cavalier King Charles', icon: '👑', color: '#C45C4A' },
    { id: 'papillon', name: 'Papillon', icon: '🦋', color: '#8B6914' },
    { id: 'japanese-chin', name: 'Japanese Chin', icon: '🇯🇵', color: '#D4A017' },
    { id: 'boston-terrier', name: 'Boston Terrier', icon: '🎩', color: '#5A9469' }
];

/* ========================================
   渲染函数
   ======================================== */

/**
 * 渲染指南卡片
 */
function renderGuideCard(guide) {
    return `
        <a href="guides/${guide.id}.html" class="game-card">
            <div class="game-card-icon" style="background: ${guide.iconColor}15; color: ${guide.iconColor};">
                ${guide.icon}
            </div>
            <h3>${guide.name}</h3>
            <p class="game-card-description">${guide.description}</p>
            <div class="game-card-meta">
                <span>⏱️ ${guide.readTime} read</span>
                <span>📊 Level ${guide.difficulty}/5</span>
            </div>
            <div class="game-card-tags">
                ${guide.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </a>
    `;
}

/**
 * 渲染列表卡片
 */
function renderListCard(guide) {
    return `
        <a href="guides/${guide.id}.html" class="guide-card">
            <div class="guide-card-icon" style="background: ${guide.iconColor}15; color: ${guide.iconColor};">
                ${guide.icon}
            </div>
            <div class="guide-card-content">
                <h3>${guide.name}</h3>
                <p>${guide.description}</p>
                <div class="guide-card-meta">
                    <span>⏱️ ${guide.readTime} read</span>
                    <span>📊 Level ${guide.difficulty}/5</span>
                </div>
            </div>
        </a>
    `;
}

/**
 * 渲染品种卡片
 */
function renderBreedCard(breed) {
    return `
        <a href="guides/${breed.id}-raw-diet.html" class="game-card">
            <div class="game-card-icon" style="background: ${breed.color}15; color: ${breed.color};">
                ${breed.icon}
            </div>
            <h3>${breed.name}</h3>
            <p class="game-card-description">Raw feeding guide specifically tailored for ${breed.name}s.</p>
        </a>
    `;
}

/* ========================================
   全局数据导出
   ======================================== */
window.rawdogfoodguide = {
    guides: guidesData,
    articles: articlesData,
    breeds: breedsData,
    renderGuideCard: renderGuideCard,
    renderListCard: renderListCard,
    renderBreedCard: renderBreedCard
};

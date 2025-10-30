document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchInput = document.getElementById('component-search');
    const componentLinks = document.querySelectorAll('.component-nav a');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        componentLinks.forEach(function(link) {
            const text = link.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                link.style.display = 'block';
            } else {
                link.style.display = 'none';
            }
        });
    });
    
    // 导航高亮和滚动监听
    const sections = document.querySelectorAll('section');
    const navHeight = document.querySelector('header').offsetHeight;
    
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        componentLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // 初始加载时执行一次
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 复制代码功能
    window.copyCode = function(button) {
        const codeBlock = button.nextElementSibling;
        const code = codeBlock.querySelector('code').innerText;
        
        navigator.clipboard.writeText(code).then(function() {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.classList.add('copied');
            
            setTimeout(function() {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(function(err) {
            console.error('复制失败:', err);
        });
    };
    
    // 使用Highlight.js进行代码高亮
    function highlightCode() {
        // 检查Highlight.js是否加载成功
        if (window.hljs) {
            console.log('Highlight.js已加载');
            try {
                // 高亮所有代码块
                document.querySelectorAll('pre code').forEach(block => {
                    hljs.highlightElement(block);
                });
            } catch (error) {
                console.error('代码高亮失败:', error);
                // 降级方案：设置所有代码块的颜色为黑色
                document.querySelectorAll('pre code').forEach(block => {
                    block.style.color = '#333';
                });
            }
        } else {
            console.warn('Highlight.js未加载，使用降级方案');
            // 降级方案：设置所有代码块的颜色为黑色
            document.querySelectorAll('pre code').forEach(block => {
                block.style.color = '#333';
            });
        }
    }
    
    // 等待DOM内容加载完成后执行代码高亮
    window.addEventListener('load', function() {
        // 给Highlight.js一点时间初始化
        setTimeout(highlightCode, 100);
    });
    
    // 创建移动端菜单切换按钮
    var menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.display = 'none';
    
    // 创建覆盖层
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    var header = document.querySelector('.flutter-header');
    header.appendChild(menuToggle);
    
    // 移动端侧边栏切换
    menuToggle.addEventListener('click', function() {
        var sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', function() {
        var sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // 响应式布局调整
    function handleResize() {
        var sidebar = document.querySelector('.sidebar');
        var overlay = document.querySelector('.overlay');
        
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // 初始加载时执行一次
    
    // 添加组件详情的折叠/展开功能
    const componentDetails = document.querySelectorAll('.component-detail');
    componentDetails.forEach(detail => {
        const sections = detail.querySelectorAll('h3');
        sections.forEach(section => {
            section.style.cursor = 'pointer';
            const nextElement = section.nextElementSibling;
            
            section.addEventListener('click', function() {
                if (nextElement && nextElement.tagName === 'PRE') {
                    nextElement.style.display = nextElement.style.display === 'none' ? 'block' : 'none';
                }
            });
        });
    });
    
    // 添加返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--primary);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: var(--shadow);
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 999;
        border: none;
        font-size: 20px;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 组件卡片的悬停动画增强
    var componentCards = document.querySelectorAll('.component-card');
    componentCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
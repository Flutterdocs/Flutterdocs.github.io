document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchInput = document.getElementById('component-search');
    const componentLinks = document.querySelectorAll('.component-nav a');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        componentLinks.forEach(link => {
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
    
    // 代码高亮（增强版）
    function highlightCode() {
        document.querySelectorAll('pre code').forEach(function(block) {
            let code = block.textContent;
            
            // 关键字高亮
            code = code.replace(/\b(class|void|var|const|final|if|else|for|while|return|import|from|extends|implements|with|as|dynamic|static|override|async|await|try|catch|finally|throw|rethrow)\b/g, '<span class="keyword">$1</span>');
            
            // 布尔值和null
            code = code.replace(/\b(true|false|null|undefined)\b/g, '<span class="boolean">$1</span>');
            
            // 函数调用
            code = code.replace(/\b([A-Za-z_][a-zA-Z0-9_]*(?=\())\b/g, '<span class="function">$1</span>');
            
            // 类名
            code = code.replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, function(match) {
                // 避免匹配已经是函数的名称
                if (match.endsWith('(')) return match;
                return '<span class="class-name">' + match + '</span>';
            });
            
            // 字符串
            code = code.replace(/'(.*?)'/g, "'<span class=\"string\">$1</span>'");
            code = code.replace(/"(.*?)"/g, '"<span class="string">$1</span>"');
            
            // 注释
            code = code.replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
            code = code.replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');
            
            // 数字
            code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="number">$1</span>');
            
            // 操作符
            code = code.replace(/(\+|-|\*|\/|=|==|!=|<=|>=|<|>|&&|\|\||!)/g, '<span class="operator">$1</span>');
            
            // 组件名
            code = code.replace(/\b(Color|Text|Container|Row|Column|Scaffold|AppBar|Icon|IconButton|ElevatedButton|TextButton|OutlinedButton)\b/g, '<span class="widget">$1</span>');
            
            // 颜色
            code = code.replace(/\b(Colors\.\w+)\b/g, '<span class="color">$1</span>');
            
            block.innerHTML = code;
        });
    }
    
    highlightCode();
    
    // 响应式菜单切换
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.display = 'none';
    
    const header = document.querySelector('header');
    header.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const nav = document.querySelector('.main-nav');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // 响应式布局调整
    function handleResize() {
        const nav = document.querySelector('.main-nav');
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            nav.style.display = 'none';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.backgroundColor = 'var(--primary)';
            nav.style.flexDirection = 'column';
            nav.style.padding = '20px';
            nav.style.gap = '10px';
        } else {
            menuToggle.style.display = 'none';
            nav.style.display = 'flex';
            nav.style.position = 'static';
            nav.style.flexDirection = 'row';
            nav.style.padding = '0';
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
    const componentCards = document.querySelectorAll('.component-card');
    componentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
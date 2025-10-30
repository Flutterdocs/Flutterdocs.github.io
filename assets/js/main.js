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
    
    // 代码高亮（增强版）
    function highlightCode() {
        document.querySelectorAll('pre code').forEach(function(block) {
            var code = block.textContent;
            
            // 先保存所有需要保留的内容到临时对象，避免替换冲突
            var tempItems = [];
            
            // 保存字符串内容
            code = code.replace(/(['"])(.*?)(\1)/g, function(match) {
                tempItems.push(match);
                return '__STRING_' + (tempItems.length - 1) + '__';
            });
            
            // 保存注释内容
            code = code.replace(/\/\*[\s\S]*?\*\//gm, function(match) {
                tempItems.push(match);
                return '__COMMENT_' + (tempItems.length - 1) + '__';
            });
            
            code = code.replace(/\/\/.*$/gm, function(match) {
                tempItems.push(match);
                return '__COMMENT_' + (tempItems.length - 1) + '__';
            });
            
            // Flutter 组件高亮（优先级最高）
            code = code.replace(/\b(Container|Row|Column|Stack|ListView|GridView|Text|Image|Icon|Button|ElevatedButton|TextButton|OutlinedButton|FloatingActionButton|Scaffold|AppBar|Card|TextField|Form|Checkbox|Radio|Switch|Slider|AlertDialog|BottomSheet|Navigator|Theme|MaterialApp|StatelessWidget|StatefulWidget|State|Center|Padding|Align|AnimatedContainer|AspectRatio|ClipRRect|DecoratedBox|Expanded|Flex|FittedBox|GestureDetector|Hero|IndexedStack|IntrinsicHeight|IntrinsicWidth|LimitedBox|Offstage|OverflowBox|SizedBox|SizedOverflowBox|Transform|Wrap|Flow|CustomMultiChildLayout|LayoutBuilder|MediaQuery|MouseRegion|NotificationListener|SafeArea|Semantics|TickerMode|Visibility|AbsorbPointer|IgnorePointer|Focus|FocusScope|FocusTraversalGroup|Directionality|Localizations|LocalizationsDelegate|DefaultTextStyle|AnimatedDefaultTextStyle|RichText|TextSpan|StrutStyle|TextStyle|Placeholder|ImageIcon|CircleAvatar|IconButton|Chip|Divider|LinearProgressIndicator|CircularProgressIndicator|BottomNavigationBar|NavigationBar|NavigationDrawer|TabBar|TabBarView|PageView|CupertinoActivityIndicator|CupertinoAlertDialog|CupertinoActionSheet|CupertinoButton|CupertinoPicker|CupertinoSlider|CupertinoSwitch|CupertinoTextField|DatePicker|TimePicker|CalendarDatePicker|DropdownButton|FormField|InputDecoration|TextFormField|Autocomplete|ValueListenableBuilder|StreamBuilder|FutureBuilder|InheritedWidget|InheritedModel|Scrollbar|SingleChildScrollView|RefreshIndicator|SliverAppBar|SliverList|SliverGrid|SliverFillRemaining|SliverPadding|SliverSafeArea|SliverToBoxAdapter|CustomScrollView|AnimatedBuilder|AnimatedWidget|Hero|Navigator|Route|MaterialPageRoute|CupertinoPageRoute|PageRouteBuilder|Overlay|OverlayEntry|Tooltip|SnackBar|MaterialBanner|Drawer|EndDrawer|FloatingActionButtonLocation|FloatingActionButtonAnimator|ListTile|ListTileTheme|DividerThemeData|ButtonBar|ButtonTheme|IconTheme|ThemeData|ColorScheme|TextTheme|AppBarTheme|CardTheme|ChipTheme|DialogTheme|FloatingActionButtonThemeData|ListTileThemeData|PopupMenuThemeData|SliderThemeData|TabBarTheme|TextButtonThemeData|ElevatedButtonThemeData|OutlinedButtonThemeData|ToggleButtonsThemeData|DataTable|DataColumn|DataRow|DataCell|PaginatedDataTable|CheckboxListTile|RadioListTile|SwitchListTile|ScaffoldMessenger|GestureRecognizer|TapGestureRecognizer|DoubleTapGestureRecognizer|LongPressGestureRecognizer|PanGestureRecognizer|ScaleGestureRecognizer|RotationGestureRecognizer|DragGestureRecognizer|PrimaryScrollController|ScrollConfiguration|ScrollController|ScrollPhysics|AlwaysScrollableScrollPhysics|NeverScrollableScrollPhysics|BouncingScrollPhysics|ClampingScrollPhysics|FixedExtentScrollController|PageController|Animation|AnimationController|CurvedAnimation|Tween|ColorTween|SizeTween|OffsetTween|Matrix4Tween|AlignTween|DecorationTween|EdgeInsetsTween|FractionalOffsetTween|IntTween|RectTween|ScrollPositionTween|StepTween|TweenSequence|TweenSequenceItem|ImplicitlyAnimatedWidget|AnimatedAlign|AnimatedContainer|AnimatedDefaultTextStyle|AnimatedOpacity|AnimatedPadding|AnimatedPhysicalModel|AnimatedPositioned|AnimatedPositionedDirectional|AnimatedSize|AnimatedSwitcher|DecoratedBoxTransition|FadeTransition|PositionedTransition|RotationTransition|ScaleTransition|SizeTransition|SlideTransition|AnimatedBuilder|AnimatedWidget|Hero|ValueNotifier|ChangeNotifier|ValueListenableBuilder|InheritedNotifier|ListenableBuilder|StreamBuilder|FutureBuilder|StreamController|StreamTransformer|Sink|StreamSink|BehaviorSubject|PublishSubject|ReplaySubject|CompositeSubscription|NavigatorObserver|HeroController|NavigatorState|GlobalKey|GlobalObjectKey|Key|LocalKey|UniqueKey|ValueKey|ObjectKey|PageStorageKey|FocusNode|FocusScopeNode|TextEditingController|ScrollController|AnimationController|Ticker|AppLifecycleListener|WidgetsBinding|PlatformDispatcher|SchedulerBinding|GestureBinding|RendererBinding|ServicesBinding|SemanticsBinding|TestWidgetsFlutterBinding|AssetBundle|DefaultAssetBundle|NetworkAssetBundle|MemoryAssetBundle|CachingAssetBundle|ImageConfiguration|ImageProvider|AssetImage|NetworkImage|MemoryImage|FileImage|ExactAssetImage|ExactAssetPlaceholder|FadeInImage|Placeholder|ImageFrameBuilder|ImageLoadingBuilder|ImageErrorWidgetBuilder|IconData|IconThemeData|TextSpan|TextStyle|StrutStyle|TextWidthBasis|TextAlignVertical|TextDirection|TextOverflow|FontWeight|FontStyle|TextDecoration|TextBaseline|FontFamily|ColorFilter|ColorTween|DecorationImage|Decoration|BoxDecoration|ShapeDecoration|UnderlineTabIndicator|InkSplash|InkRipple|InkWell|InkResponse|Material|Card|Chip|IconButton|Tooltip|ButtonBarLayout|ButtonBuilder|DropdownButtonHideUnderline|DropdownMenuItem|MenuItemButton|PopupMenuItem|PopupMenuButton|PopupMenuDivider|ShowMenu|Navigator|RouteSettings|ModalRoute|PageRoute|MaterialPageRoute|CupertinoPageRoute|PageRouteBuilder|PageRouteTransitionBuilder|HeroController|NavigatorState|NavigatorObserver|TransitionBuilder|Builder|StatefulBuilder|ValueListenableBuilder|LayoutBuilder|FutureBuilder|StreamBuilder|AnimatedBuilder|CustomPaint|CustomPainter|CustomClipper|CustomMultiChildLayout|MultiChildLayoutDelegate|SingleChildLayoutDelegate|DelegateBuilder|RenderBox|RenderObject|RenderCustomPaint|RenderCustomMultiChildLayoutBox|RenderBoxContainerDefaultsMixin|ContainerRenderObjectMixin|RenderProxyBox|RenderProxyBoxWithHitTestBehavior|RenderShiftedBox|RenderSliver|RenderSliverBoxChildManager|RenderSliverList|RenderSliverGrid|RenderSliverFillViewport|RenderSliverFillRemaining|RenderSliverPadding|RenderSliverToBoxAdapter|RenderAbstractViewport|SliverConstraints|SliverGeometry|SliverPhysicalParentData|SliverLogicalParentData|SliverMultiBoxAdaptorParentData|ScrollMetrics|ScrollableState|ScrollPosition|ScrollPositionWithSingleContext|ScrollController|PageController|FixedExtentScrollController|PrimaryScrollController|ScrollPhysics|AlwaysScrollableScrollPhysics|NeverScrollableScrollPhysics|BouncingScrollPhysics|ClampingScrollPhysics|RangeMaintainingScrollPhysics|ScrollBehavior|ScrollConfiguration|DragStartBehavior|AxisDirection|GrowthDirection|ScrollDirection|ViewportOffset|ScrollPositionDriver|ScrollPositionWithSingleContext|ScrollPositionWithSingleContextMixin|ScrollNotification|ScrollStartNotification|ScrollUpdateNotification|ScrollEndNotification|OverscrollNotification|UserScrollNotification|ScrollMetricsNotification|LayoutChangedNotification|Animation|AnimationController|TickerProvider|SingleTickerProviderStateMixin|Ticker|ValueNotifier|Listenable|ChangeNotifier|ValueListenableBuilder|ListenableBuilder|InheritedNotifier|Tween|ColorTween|SizeTween|OffsetTween|Matrix4Tween|AlignTween|DecorationTween|EdgeInsetsTween|FractionalOffsetTween|IntTween|RectTween|ScrollPositionTween|StepTween|TweenSequence|TweenSequenceItem|Animatable|CurvedAnimation|Curve|Curves|Interval|SpringSimulation|SpringCurve|AnimationStatus|AnimationDirection|ImplicitlyAnimatedWidget|AnimatedWidgetBaseState|AnimatedAlign|AnimatedContainer|AnimatedDefaultTextStyle|AnimatedOpacity|AnimatedPadding|AnimatedPhysicalModel|AnimatedPositioned|AnimatedPositionedDirectional|AnimatedSize|AnimatedSwitcher|DecoratedBoxTransition|FadeTransition|PositionedTransition|RotationTransition|ScaleTransition|SizeTransition|SlideTransition|AnimatedBuilder|AnimatedWidget|Hero|HeroController|HeroMode|TransitionBuilder|Builder|StatefulBuilder|ValueListenableBuilder|LayoutBuilder|FutureBuilder|StreamBuilder|AnimatedBuilder|CustomPaint|CustomPainter|CustomClipper|CustomMultiChildLayout|MultiChildLayoutDelegate|SingleChildLayoutDelegate|DelegateBuilder|RenderBox|RenderObject|RenderCustomPaint|RenderCustomMultiChildLayoutBox|RenderBoxContainerDefaultsMixin|ContainerRenderObjectMixin|RenderProxyBox|RenderProxyBoxWithHitTestBehavior|RenderShiftedBox|RenderSliver|RenderSliverBoxChildManager|RenderSliverList|RenderSliverGrid|RenderSliverFillViewport|RenderSliverFillRemaining|RenderSliverPadding|RenderSliverToBoxAdapter|RenderAbstractViewport|SliverConstraints|SliverGeometry|SliverPhysicalParentData|SliverLogicalParentData|SliverMultiBoxAdaptorParentData|ScrollMetrics|ScrollableState|ScrollPosition|ScrollPositionWithSingleContext|ScrollController|PageController|FixedExtentScrollController|PrimaryScrollController|ScrollPhysics|AlwaysScrollableScrollPhysics|NeverScrollableScrollPhysics|BouncingScrollPhysics|ClampingScrollPhysics|RangeMaintainingScrollPhysics|ScrollBehavior|ScrollConfiguration|DragStartBehavior|AxisDirection|GrowthDirection|ScrollDirection|ViewportOffset|ScrollPositionDriver|ScrollPositionWithSingleContext|ScrollPositionWithSingleContextMixin|ScrollNotification|ScrollStartNotification|ScrollUpdateNotification|ScrollEndNotification|OverscrollNotification|UserScrollNotification|ScrollMetricsNotification|LayoutChangedNotification|Animation|AnimationController|TickerProvider|SingleTickerProviderStateMixin|Ticker|ValueNotifier|Listenable|ChangeNotifier|ValueListenableBuilder|ListenableBuilder|InheritedNotifier|Tween|ColorTween|SizeTween|OffsetTween|Matrix4Tween|AlignTween|DecorationTween|EdgeInsetsTween|FractionalOffsetTween|IntTween|RectTween|ScrollPositionTween|StepTween|TweenSequence|TweenSequenceItem|Animatable|CurvedAnimation|Curve|Curves|Interval|SpringSimulation|SpringCurve|AnimationStatus|AnimationDirection)\b/g, '<span class="widget">$1</span>');
            
            // 类名高亮
            code = code.replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="class-name">$1</span>');
            
            // 关键字高亮
            code = code.replace(/\b(abstract|as|assert|async|await|break|case|catch|class|const|continue|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|false|final|finally|for|Function|get|if|implements|import|in|interface|is|late|library|mixin|new|null|on|operator|part|rethrow|return|set|static|super|switch|sync|this|throw|true|try|typedef|var|void|while|with|yield|override|required|covariant)\b/g, '<span class="keyword">$1</span>');
            
            // 布尔值高亮
            code = code.replace(/\b(true|false|null|undefined)\b/g, '<span class="boolean">$1</span>');
            
            // 数字高亮
            code = code.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="number">$1</span>');
            
            // 操作符高亮
            code = code.replace(/([+\-*/%=<>!&|^~?:.,;{}[\]()])/g, '<span class="operator">$1</span>');
            
            // 颜色值高亮
            code = code.replace(/\b(Colors\.[a-zA-Z0-9_]+)\b/g, '<span class="color">$1</span>');
            
            // 函数调用高亮（排除已经高亮的部分）
            code = code.replace(/\b([a-z][a-zA-Z0-9_]*)(?=\s*\()/g, '<span class="function">$1</span>');
            
            // 恢复保存的内容
            code = code.replace(/__STRING_(\d+)__/g, function(match, index) {
                return '<span class="string">' + tempItems[index] + '</span>';
            });
            
            code = code.replace(/__COMMENT_(\d+)__/g, function(match, index) {
                return '<span class="comment">' + tempItems[index] + '</span>';
            });
            
            block.innerHTML = code;
        });
    }
    
    highlightCode();
    
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
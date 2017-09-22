# tab-menu
类似于京东tab栏切换效果

1.鼠标在一级菜单中移动会迅速切换二级菜单。

2.如果鼠标由一级菜单划入二级菜单过程中经过其他一级菜单则不会切换，用户体验更好。

编程思路：

1.当鼠标移动到某个一级菜单时，相应的一级菜单点亮，相应的二级菜单显示，其余的一级菜单不亮，其余的二级菜单隐藏。

2.当鼠标由一级菜单移动到二级菜单时，如果不小心经过其他的一级菜单，会立刻切换，这样并不是想要的效果，所以考虑设置延时定时器。延时触发时如果鼠标已经在二级菜单内部，则不切换菜单。

3.设置延时会出现其他的体验问题，每次切换一级菜单时都会延迟，所以考虑如果用户要切换一级菜单时不延迟，如果用户是想从一级菜单移动到二级菜单则延迟。

4.启发式的编程思想：如果用户鼠标快速移动在上一次鼠标点和二级菜单左上角和左下角构成的三角形中间时，认为用户是想移动到二级菜单。

5.根据矢量运算判断点是否在三角形内。


$(document).ready(function () {
	var sub = $('#sub')
	var activeRow
	var activeMenu
	var timer
	var mouseInSub
	var mouseTrack = []

	var moveHandler = function (e) {
		mouseTrack.push({
			x: e.pageX,
			y: e.pageY
		})

		if (mouseTrack.length > 3) {
			mouseTrack.shift()
		}
	}

	sub.on('mouseenter', function (e) {
		mouseInSub = true
	}).on('mouseleave', function (e) {
		mouseInSub = false
	})

	$('#test')
		.on('mouseenter', function (e) {
			sub.removeClass('none')

			//绑定鼠标移动事件，获取鼠标移动坐标
			$(document).bind('mousemove', moveHandler)
		})
		.on('mouseleave', function (e) {
			sub.addClass('none')

			if (activeRow) {
				activeRow.removeClass('active')
				activeRow = null
			}

			if (activeMenu) {
				activeMenu.addClass('none')
				activeMenu = null
			}

			//解绑鼠标移动事件
			$(document).unbind('mousemove', moveHandler)
		})
		.on('mouseenter', 'li', function (e) {
			if (!activeRow) {
				activeRow = $(e.target).addClass('active')
				activeMenu = $('#' + activeRow.data('id'))
				activeMenu.removeClass('none')
				return
			}

			var currMousePos = mouseTrack[mouseTrack.length - 1]
			var leftCorner = mouseTrack[mouseTrack.length - 2]
			var delay = needDelay(sub, leftCorner, currMousePos)

			if (timer) {
				clearTimeout(timer)
			}

			if (delay) {
				//子菜单延迟显示，如果鼠标已经在子菜单中就不切换一级菜单和二级菜单
				timer = setTimeout(function () {
					if (mouseInSub) {
						return
					}

					if (activeRow) {
						activeRow.removeClass('active')
						activeMenu.addClass('none')

						activeRow = $(e.target).addClass('active')
						activeMenu = $('#' + activeRow.data('id'))
						activeMenu.removeClass('none')
					}
				
					timer = null
				}, 300)
			} else {
				var prevActiveRow = activeRow
				var prevActiveMenu = activeMenu

				activeRow = $(e.target).addClass('active')
				activeMenu = $('#' + activeRow.data('id'))

				prevActiveRow.removeClass('active')
				prevActiveMenu.addClass('none')
				
				activeRow.addClass('active')
				activeMenu.removeClass('none')
			}
			

		})
})
BODY = document.getElementsByTagName('body')[0]

// Mobile width
initAdaptiveViewport()

document.addEventListener('DOMContentLoaded', function() {
	// Logos slider
	const logosSliders = [],
		logos = document.querySelectorAll('.logos .swiper')

	logos.forEach((el, i) => {
		el.classList.add('logos_s' + i)

		let options = {
			loop: true,
			loopAdditionalSlides: 1,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: el.querySelector('.swiper-button-next'),
				prevEl: el.querySelector('.swiper-button-prev')
			},
			breakpoints: {
				0: {
					spaceBetween: getCssVar(el, '--spaceBetween-0'),
					slidesPerView: getCssVar(el, '--slidesPerView-0'),
				},
				768: {
					spaceBetween: getCssVar(el, '--spaceBetween-768'),
					slidesPerView: getCssVar(el, '--slidesPerView-768'),
				},
				1280: {
					spaceBetween: getCssVar(el, '--spaceBetween-1280'),
					slidesPerView: getCssVar(el, '--slidesPerView-1280'),
				}
			}
		}

		logosSliders.push(new Swiper('.logos_s' + i, options))
	})


	// Photo gallery slider
	const photoGallerySliders = [],
		photoGallery = document.querySelectorAll('.photo_gallery .swiper')

	photoGallery.forEach((el, i) => {
		el.classList.add('photo_gallery_s' + i)

		let options = {
			loop: false,
			loopAdditionalSlides: 1,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			scrollbar: {
				el: el.querySelector('.swiper-scrollbar'),
				draggable: true,
			},
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: getCssVar(el, '--spaceBetween-0'),
					slidesPerView: getCssVar(el, '--slidesPerView-0'),
				},
				768: {
					spaceBetween: getCssVar(el, '--spaceBetween-768'),
					slidesPerView: getCssVar(el, '--slidesPerView-768'),
				},
				1280: {
					spaceBetween: getCssVar(el, '--spaceBetween-1280'),
					slidesPerView: getCssVar(el, '--slidesPerView-1280'),
				}
			},
		}

		photoGallerySliders.push(new Swiper('.photo_gallery_s' + i, options))
	})


	// Popover
	document.querySelectorAll('[popover]').forEach(el => {
		el.addEventListener('toggle', e => document.querySelector(`[popovertarget="${el.id}"]`)?.classList.toggle('active', e.newState === 'open'))
	})


	// Dialog
	$(document).on('click', '[data-open-modal]', function() {
		const id = $(this).data('modal')

		document.getElementById(id).showModal()
	})

	$(document).on('click', '[data-close-modal]', function() {
		$(this).closest('dialog')[0].close()
	})

	$(document).on('click', '.modal', function(e) {
		if (!$(e.target).closest('.inner').length) {
			this.close()
		}
	})


	// Mob. menu
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('.mob_menu_modal').toggleClass('show')
	})


	// Phone input mask
	new Maska.MaskInput('input[type=tel]', {
		mask: '+7 (###) ###-##-##'
	})


	// Select file
	const fileInputs = document.querySelectorAll('form input[type=file]')

	if (fileInputs) {
		fileInputs.forEach(el => {
			el.addEventListener('change', () => el.closest('.file').querySelector('label span').innerText = el.value)
		})
	}


	if (is_touch_device()) {
		// Submenu on the touch screen
		$('header .menu .item > a.sub_link').click(function (e) {
			e.preventDefault()

			const dropdown = $(this).next(),
				isOpen = dropdown.hasClass('show')

			$('header .menu .sub').removeClass('show')

			if (!isOpen) {
				dropdown.addClass('show')
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				$('header .menu .sub').removeClass('show')
			}
		})
	}


	// Legal info spoler
	$('.legal_info .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.legal_info .text_block').toggleClass('show')
	})


	// SEO text spoler
	$('.seo_text .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.seo_text .text_block').toggleClass('show')
	})


	// Accordion
	$('body').on('click', '.accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.hidden').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.hidden').slideUp(300)

			item.addClass('active').find('.hidden').slideDown(300)
		}
	})


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}
})
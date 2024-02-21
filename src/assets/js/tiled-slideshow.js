Vue.component('tiled-slideshow',
{
	props:
	{
		images: Array,
		width:
		{
			type: String,
			default: '100%'
		}
	},
	data: function()
	{
		return {
			picDelay: 3300,
			transitionPanels:
			[
				{
					id: 0,
					inTransition: false
				},
				{
					id: 1,
					inTransition: false
				},
				{
					id: 2,
					inTransition: false
				},
				{
					id: 3,
					inTransition: false
				},
				{
					id: 4,
					inTransition: false
				}
			],
			pics: []
		};
	},
	mounted: function()
	{
		var previewSpacePlaceholder = document.getElementById('previewPlaceholderRegion');
		var previewImgPlaceholder = document.getElementById('slideshowPreviewImg');
		previewSpacePlaceholder.style.display = 'none';
		previewImgPlaceholder.style.display = 'none';
		for (let i = 0; i < this.images.length; i++) {
			let srcset = this.images[i] + "-m.jpg 400w, " + this.images[i] + ".jpg 1000w";
			let item = { active: false, src: this.images[i] + ".jpg", srcset };
			if (i === 0) {
				item.active = true;
			}
			this.pics.push(item);
		}
		setTimeout(this.doTransition, 1000)
	},
	computed:
	{
		height: function()
		{
			return window.innerHeight - 242 + 'px';
		},
		heightNumber: function()
		{
			return this.height.substring(this.height, this.height.length - 2);
		}
	},
	methods:
	{
		doTransition: function()
		{
			for (var i = 0; i < this.transitionPanels.length; i++)
			{
				setTimeout(function(i) {
					this.transitionPanels[i].inTransition = true;
				}.bind(this, i), i * 150);
			}
			setTimeout(function() {
				this.nextPictureActive();
			}.bind(this), 1600);
		},
		nextPictureActive: function()
		{
			for (var i = 0; i < this.pics.length; i++)
			{
				if (this.pics[i].active)
				{
					this.pics[i].active = false;
					if (i != this.pics.length - 1)
					{
						this.pics[i + 1].active = true;
					}
					else
					{
						this.pics[0].active = true;
					}
					break;
				}
			}
			for (var i = 0; i < this.transitionPanels.length; i++)
			{
				setTimeout(function(i) {
					this.transitionPanels[i].inTransition = false;
				}.bind(this, i), i * 150);
			}
			setTimeout(this.doTransition, this.picDelay);
		},
		getTransitionPanelHeight: function()
		{
			return (this.heightNumber / 5).toFixed(2) + 'px';
		},
		getTransitionPanelTop: function(index)
		{
			return index * (this.heightNumber / 5).toFixed(2) + 'px';
		}
	},
	template:
		'<div class="slideshowOuterContainer" :style="{ width: width }">'
		+	'<div class="slideshowInnerContainer">'
		+		'<transition-group name="slideshow">'
		+			'<div :key="panel.id" v-for="(panel, index) in transitionPanels" v-if="panel.inTransition" class="transitionPanel" :style="{ height: getTransitionPanelHeight(), \'margin-top\': getTransitionPanelTop(index) }"></div>'
		+		'</transition-group>'
		+		'<template v-for="pic in pics">'
		+			'<transition name="fade">'
		+               '<img v-if="pic.active" aria-hidden="true" decoding="async" :src="pic.src" :srcset="pic.srcset" sizes="100vw" alt="slideshow image" width="1000" height="600" class="slideshowImg">'
		+			'</transition>'
		+		'</template>'
		+	'</div>'
		+'</div>'
});
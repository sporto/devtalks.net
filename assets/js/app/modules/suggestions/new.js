Namespacer('APP.modules.suggestions');

APP.modules.suggestions.new = (function () {
	'use strict';

	var Control = can.Control({

		init: function (ele, options) {
			//this.$loader_save = $('.loader_save', this.element);
			this.$inputUrl = $('.input_url', this.element);
			this.$inputDes = $('.input_description', this.element);
			this.$selectTags = $('.select_tags', this.element);
			//this.$inputDes = $('.input_description', this.element);

			this.state = new can.Observe({
				showBtnRetrieve: true,
				showLoaderRetrieve: false,
				showBtnSave: true,
				showLoaderSave: false
			});

			this.model = new can.Observe({
				url: '',
				title: '',
				description: '',
				who: '',
				thumbs: {}
			});

			rivets.bind(this.element, {state: this.state, model: this.model});

			this.setupTags();
		},

		'.btn_retrieve click': function (ele, ev) {
			this.state.attr('showLoaderRetrieve', true);
			this.state.attr('showBtnRetrieve', false);
			this.retrieve();
			return false;
		},

		'.btn_save click': function (ele, ev) {
			this.save();
			return false;
		},

		setupTags: function () {
			var tags = this.element.data('tags');
			//console.log(tags)
			this.$selectTags.select2({
				tags: tags
			});
		},

		retrieve: function () {
			var self = this;
			var url = this.$inputUrl.val();
			this.state.attr('showLoaderRetrieve', true);
			this.state.attr('showBtnRetrieve', false);

			var pro = $.ajax({
				url: '/api/v1/urls',
				data: {url: url}
			});

			pro
				.done(function(data, textStatus, xhr) {
					// self.$inputDes.val(data.title);
					// self.$inputDes.val(data.description);
					self.model.attr('title', data.title);
					self.model.attr('description', data.description);
					self.model.attr('thumbs', data.thumbs);
				})
				.fail(function(xhr, textStatus, error) {
					APP.flashError(error);
				})
				.always(function () {
					self.state.attr('showLoaderRetrieve', false);
					self.state.attr('showBtnRetrieve', true);
				});

		},

		save: function () {
			var self = this;
			this.state.attr('showLoaderSave', true);
			this.state.attr('showBtnSave', false);
			
			//var data = io.form($('form', this.element)).object();
			var data = {
				suggestion: this.model.attr()
			};
			data.suggestion.tags = this.$selectTags.val().split(',');

			var pro = $.ajax({
				url: '/api/v1/suggestions',
				type: 'POST',
				data: data
			});

			pro
				.done(function(data, textStatus, xhr) {
					self.$inputDes.val(data.description);
				})
				.fail(function(xhr, textStatus, error) {
					APP.flashError(error);
				})
				.always(function () {
					self.state.attr('showLoaderSave', false);
					self.state.attr('showBtnSave', true);
				});

		}
	});

	return {
		init: function (viewId) {
			var control = new Control($(viewId));
		}
	}
}());
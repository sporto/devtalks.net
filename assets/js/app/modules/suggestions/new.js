Namespacer('APP.modules.suggestions');

APP.modules.suggestions.new = (function () {
	'use strict';

	var Control = can.Control({

		init: function (ele, options) {

			this.$selectTags = $('.select_tags', this.element);

			this.state = new can.Observe();
			this.model = new can.Observe();

			this.reset();

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
			var url = this.model.attr('url');
			this.state.attr('showLoaderRetrieve', true);
			this.state.attr('showBtnRetrieve', false);

			var pro = $.ajax({
				url: '/api/v1/urls',
				data: {url: url}
			});

			pro
				.done(function(data, textStatus, xhr) {
					self.model.attr({
						title: data.title,
						description: data.description,
						thumbS: data.thumbS,
						thumbM: data.thumbM,
						thumbL: data.thumbL
					});
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
					//self.$inputDes.val(data.description);
					APP.flashSuccess('Saved');
					self.reset();
				})
				.fail(function(xhr, textStatus, error) {
					APP.flashError(error);
				})
				.always(function () {
					self.state.attr('showLoaderSave', false);
					self.state.attr('showBtnSave', true);
				});
		},

		reset: function () {

			this.state.attr({
				showBtnRetrieve: true,
				showLoaderRetrieve: false,
				showBtnSave: true,
				showLoaderSave: false
			});

			this.model.attr({
				url: '',
				title: '',
				description: '',
				who: '',
				thumbS: '',
				thumbM: '',
				thumbL: ''
			});

			// TODO reset the tags
			this.$selectTags.val('');
		}
	});

	return {
		init: function (viewId) {
			var control = new Control($(viewId));
		}
	}
}());
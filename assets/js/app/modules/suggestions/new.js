Namespacer('APP.modules.suggestions');

APP.modules.suggestions.new = (function () {
	'use strict';

	var Control = can.Control({

		init: function (ele, options) {
			var self = this;

			this.$selectTags = $('.select_tags', this.element);

			this.state = new can.Observe();
			this.model = new can.Observe();

			this.reset();

			var template = can.view("#template", {state: this.state, model: this.model});
			can.$(this.element).append(template);

			this.bindings();
			this.setupTags();
		},

		bindings: function () {
			var self = this;

			this.model.bind('url', function (ev, newVal, oldVal) {
				var val = newVal.indexOf('http://') > -1 ? '' : 'disabled';
				self.state.attr('enableBtnRetrieve', val);
			});

			// this.model.bind('change', function( ev, attr, how, newVal, oldVal ) {
			// 	console.log(newVal);
			// 	// self.checkBtnSave();
			// });
		},

		'.input_url keyup': function (ele, ev) {
			this.model.attr('url', ele.val());
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

		checkBtnSave: function() {
			this.state.attr('showBtnSave', this.isValid());
		},

		isValid: function () {
			if (this.model.attr('url') === '') return false;
			if (this.model.attr('title') === '') return false;
			return true;
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
				enableBtnRetrieve: 'disabled',
				showBtnRetrieve: true,
				showLoaderRetrieve: false,
				enableBtnSave: 'disabled',
				showBtnSave: true,
				showLoaderSave: false
			});

			this.model.attr({
				url: 'xx',
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
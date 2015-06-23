
(function($) {
			
	'use strict';

	function Form($el) {
		this.$el = $el;
	}

	Form.prototype = {
		constructor: Form,
		
		init: function(options) {
			var html = ['<form method="post" action="#">'];
			
			this.options = options;
			
			$.each(this.options.data, function(i, item) {
				html.push(
                                         
                    '<label style="text-align: center;">',
                        '<button class="form_name btn btn-danger " type="button" id="form_title_new">'+ item.title +'</button>',
                    '</label>'
				);
				html.push('<'+item.divName + ' class='+item.className +'>');
				if (item.children && item.children.length) {
					html.push('<div>');
					$.each(item.children || [], function(i, c) {
                        if(c.divName==='button')
                            html.push(
                                '<'+c.divName+ ' name=' +c.name+ ' id=' +c.id+' class='+c.className +' type="button">',                                
                                '<span>' + c.title + '</span>',
                                '</'+c.divName+'>'
                            );
                        else if(c.divName==='buttons')
                        {
                            html.push('<label style="text-align: center;">');
                            $.each(c.children || [], function(i, cc) {
                                html.push(
                                    (i === 0 ? '' : '&nbsp;&nbsp;&nbsp;&nbsp;'),
                                    '<'+cc.divName+ ' name=' +cc.name+ ' id=' +cc.id+' class='+cc.className +' type="button">',                                
                                    '<span>' + cc.title + '</span>',
                                    '</'+cc.divName+'>'
                                );
                            });
                            html.push('</label>');
                        }
                        else
                        {
                            html.push(
                                '<label for="'+c.id+'">'+c.title+'</label>',
                                '<'+c.divName+ ' name=' +c.name+ ' id=' +c.id+' class='+c.className +(' type='+c.type||0)+' placeholder='+c.holder+'>');

                            $.each(c.children || [], function(i, cc) {
                                html.push(
                                    '<'+cc.divName+ ' name=' +cc.name+ ' id=' +cc.id+' class='+cc.className +' '+cc.select+' value='+cc.value +' type="button">',                                
                                    '<span>' + cc.title + '</span>',
                                    '</'+cc.divName+'>'
                                );
                            });                            
                            
                            html.push('</'+c.divName+'>');
                        }
					});
					html.push('</div>');
				}
				html.push('</'+item.divName +'>');
			});
            html.push('</form>');
			this.$el.append(html.join(''));
			this.$el.css('width', this.options.width + 'px');
			
		}
		
	};

	$.fn.bootstrapForm = function() {
		var option = arguments[0], 
			args = arguments,
			
			value, 
			allowedMethods = [];

		this.each(function() {
			var $this = $(this), 
				data = $this.data('bootstrapForm'), 
				options = $.extend({}, $.fn.bootstrapForm.defaults, typeof option === 'object' && option);

			if (typeof option === 'string') {
				if ($.inArray(option, allowedMethods) < 0) {
					throw "Unknown method: " + option;
				}
				value = data[option](args[1]);
			} else {
				if (!data) {
					data = new Form($this);
					data.init(options, true);
					$this.data('bootstrapForm', data);
				} else {
					data.init(options);
				}
			}
		});
		
		return value ? value : this;
	};
	
	$.fn.bootstrapForm.defaults = {
		width: 180,
		data: [],
		onSelect: function(name) { return false; }
	};
})(jQuery);
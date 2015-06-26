
(function($) {
			
	'use strict';

	function Table($el) {
		this.$el = $el;
	}

	Table.prototype = {
		constructor: Table,
		
		init: function(options) {
			var html = ['<div >'];
			
			this.options = options;
			
			$.each(this.options.data, function(i, item) {
				html.push(
                    '<label style="text-align: center;">',
                        '<button class="table_name btn btn-danger " type="button" id="table_title_new">'+ item.title +'</button>',
                               
                        '<button  id="table_Close" class="btn btn-mini btn-normal" type="button" style="display: block;float: right;">',
                            '<i class="icon-remove "></i>',
                        '</button>',
                    '</label>'
				);
				html.push('<'+item.divName + ' class='+item.className +'>');
				if (item.children && item.children.length) {
					html.push('<div>');
					$.each(item.children || [], function(i, c) {
                        
                            html.push(     
                                '<'+c.divName+ ' name=' +c.name+ ' id=' +c.id,                       
                                (c.data_toolbar!==undefined?(' data-toolbar=' +c.data_toolbar):''),
                                (c.data_pagination!==undefined?(' data-pagination=' +c.data_pagination):''),
                                (c.data_show_export!==undefined?(' data-show-export=' +c.data_show_export):''),
                                (c.data_search!==undefined?(' data-search=' +c.data_search):''),
                                (c.data_search_align!==undefined?(' data-search-align=' +c.data_search_align):''),
                                (c.data_show_columns!==undefined?(' data-show-columns=' +c.data_show_columns):''),
                                (c.data_page_list!==undefined?(' data-page-list=' +c.data_page_list):''),
                                (c.data_page_size!==undefined?(' data-page-size=' +c.data_page_size):''),
                                (c.data_key_events!==undefined?(' data-key-events=' +c.data_key_events):''),
                                (c.data_sort_name!==undefined?(' data-sort-name=' +c.data_sort_name):''),
                                (c.data_click_to_select!==undefined?(' data-click-to-select=' +c.data_click_to_select):''),
                                (c.data_height!==undefined?(' data-height=' +c.data_height):''),
                                ' class='+c.className +' type='+c.type+' placeholder='+c.holder+' value='+c.value+'>'
                                );
                          
                            $.each(c.children || [], function(i, cc) {
                                html.push(
                                    (i === 0 ? '' : '&nbsp;&nbsp;&nbsp;&nbsp;'),
                                    '<'+cc.divName+ ' name=' +cc.name+ ' id=' +cc.id+' class='+cc.className +' type='+cc.type+'>',                                
                                    (cc.title!==undefined?('<span>' + cc.title + '</span>'):'') 
                                );
                                
                                
                                $.each(cc.children || [], function(i, ccc) {
                                    html.push(
                                        (i === 0 ? '' : '&nbsp;&nbsp;&nbsp;&nbsp;'),
                                        '<'+ccc.divName+ ' name=' +ccc.name+ ' id=' +ccc.id+' class='+ccc.className +' type='+ccc.type+'>',                               
                                        (ccc.title!==undefined?('<span>' + ccc.title + '</span>'):'')                                   
                                    );
                                                                    
                                    $.each(ccc.children || [], function(i, cccc) {
                                        html.push(
                                            '<'+cccc.divName,
                                            (cccc.className!==undefined?(' class=' +cccc.className):''),
                                            ' data-field='+cccc.id,
                                            (cccc.checkbox!==undefined?(' data-checkbox='+cccc.checkbox):''),
                                            (cccc.sort!==undefined?(' data-sortable="'+cccc.sort+'"'):''),
                                            (cccc.edit!==undefined?(' data-editable="'+cccc.edit+'"'):''),
                                            (cccc.dataformatter!==undefined?(' data-formatter="'+cccc.dataformatter+'"'):''),
                                            (cccc.dataevents!==undefined?(' data-events="'+cccc.dataevents+'"'):''),
                                            (cccc.width!==undefined?(' data-width="'+cccc.width+'"'):''),
                                            ' data-halign="center" data-align="center"',
                                            '>',                                
                                            (cccc.innerHTML!==undefined?('<span>' + cccc.innerHTML + '</span>'):'')                                   
                                        );
                                        
                                        
                                        html.push('</'+cccc.divName+'>');
                                    });
                                    
                                    html.push('</'+ccc.divName+'>');
                                });
                                
                                html.push('</'+cc.divName+'>');
                            });
                            
                            html.push('</'+c.divName+'>');
                        
					});
					html.push('</div>');
				}
				html.push('</'+item.divName +'>');
			});
            html.push('</div>');
			this.$el.append(html.join(''));
			this.$el.css('width', this.options.width + 'px');
			
		}
		
	};

	$.fn.bootstrapTabledy = function() {
		var option = arguments[0], 
			args = arguments,
			
			value, 
			allowedMethods = [];

		this.each(function() {
			var $this = $(this), 
				data = $this.data('bootstrapTabledy'), 
				options = $.extend({}, $.fn.bootstrapTabledy.defaults, typeof option === 'object' && option);

			if (typeof option === 'string') {
				if ($.inArray(option, allowedMethods) < 0) {
					throw "Unknown method: " + option;
				}
				value = data[option](args[1]);
			} else {
				if (!data) {
					data = new Table($this);
					data.init(options, true);
					$this.data('bootstrapTabledy', data);
				} else {
					data.init(options);
				}
			}
		});
		
		return value ? value : this;
	};
	
	$.fn.bootstrapTabledy.defaults = {
		width: 180,
		data: [],
		onSelect: function(name) { return false; }
	};
})(jQuery);
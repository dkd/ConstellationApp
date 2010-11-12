Ext.namespace('Constellation.Views');

Constellation.Views.FilterForm = Ext.extend(Ext.FormPanel, {
			processForm: function() {
				var params 			= this.form.getValues(),
						viewTitle 	= params["title"],
						property	 	= params["property"],
						equals 			= params["equals"],
						start 			= params["start"],
						end 				= params["end"],
						query_type 	= params["query-type"],
						filterForm  = Ext.getCmp('filter-add');

				this.ownerCt.setTitle(viewTitle);
				Ext.Ajax.request({
					url: 		'/views/'+ this.ownerCt.viewElement.id +'.json',
					method: 	'PUT',
				  success: function() {
						this.hideForm();
						Ext.getCmp('view-grid-'+this.viewId).store.load();
				 	},
				  params: 	{
						"view[title]": viewTitle,
						"view[filter_attributes][property]": 		property,
						"view[filter_attributes][query_type]": 	query_type,
						"view[filter_attributes][equals]": 			equals,
						"view[filter_attributes][start]": 			start,
						"view[filter_attributes][end]": 				end
					},
					scope: this
				});
			},
			hideForm: function() {
				this.hide();
				this.ownerCt.doLayout();
			},
			clearFormFields: function(fields) {
				var that = this;

				Ext.each(fields, function(field) {
					if(field = Ext.getCmp(field + "-" + that.viewId)) {
						field.destroy();
					}
				});
			},
			checkQueryType: function() {
				var params 			= this.form.getValues(),
						query_type 	= params["query-type"];
				if(!query_type) {
					Ext.getCmp('query-type-'+this.viewId).setValue('compare');
				}
			},
			renderForm: function() {
				this.checkQueryType();
				var params 			= this.form.getValues(),
						property 		= params["property"],
						query_type 	= params["query-type"];

				if(property == "date") {
					if(query_type == "compare") {
						this.clearFormFields(['equals', 'range', 'range-date']);
						if(Ext.getCmp('equals-date-'+this.viewId) == undefined) {
							this.add({
								id: 				'equals-date-'+this.viewId,
								fieldLabel: 'Equals',
								xtype: 			'datefield',
								format: 		'm/d/Y H:i:s',
								name: 			'equals',
								value: 			this.filterEquals,
								width: 			150
							});
						}
					} else if(query_type == "range") {
						this.clearFormFields(['equals', 'equals-date', 'range']);
						if(Ext.getCmp('range-date-'+this.viewId) == undefined) {
							this.add({
								id: 				'range-date-'+this.viewId,
								xtype: 			'compositefield',
							  fieldLabel: 'Range',
							  items: 			[{
							    	xtype: 			'datefield',
							      name: 			'start',
							      fieldLabel: 'Start',
										format: 		'm/d/Y H:i:s',
										width: 			150
									}, {
							      xtype: 			'datefield',
							      name: 			'end',
							      fieldLabel: 'End',
										format: 		'm/d/Y H:i:s',
										width: 			150
							    }]
							});
						}
					}
				} else {
					if(query_type == "compare") {
						this.clearFormFields(['equals-date', 'range', 'range-date']);
						if(Ext.getCmp('equals-'+this.viewId) == undefined) {
							this.add({
								id: 				'equals-'+this.viewId,
								fieldLabel: 'Equals',
								xtype: 			'textfield',
								name: 			'equals',
								value: 			this.filterEquals,
								width: 			150
							});
						}
					} else if(query_type == "range") {
						this.clearFormFields(['equals', 'equals-date', 'range-date']);
						if(Ext.getCmp('range-'+this.viewId) == undefined) {
							this.add({
								id: 				'range-'+this.viewId,
								xtype: 			'compositefield',
							  fieldLabel: 'Range',
							  items: 			[{
							    	xtype: 			'textfield',
							      name: 			'start',
							      fieldLabel: 'Start',
										width: 			150
									}, {
							      xtype: 			'textfield',
							      name: 			'end',
							      fieldLabel: 'End',
										width: 			150
							    }]
							});
						}
					}
				}
				this.ownerCt.doLayout();
			},
			initComponent: function() {
				var config = {
						hidden: 	true,
						padding:  5,
						title: 		'Settings',
						items: [{
							fieldLabel: 'View title',
							xtype: 			'textfield',
              name: 			'title',
							value: 			this.ownerCt.title,
							width: 			150
						}, 	{
							width:          150,
							xtype:          'combo',
							mode:           'local',
							value:          this.filterProperty,
							triggerAction:  'all',
							forceSelection: true,
							editable:       false,
							fieldLabel:     'Property',
							name:           'property',
							hiddenName:     'property',
							displayField:   'name',
							valueField:     'value',
							listeners: {
								select: function(field) {
									this.renderForm();
								},
								scope: this
							},
							store:          new Ext.data.JsonStore({
								fields : ['name', 'value'],
								data   : [
									{name : 'Date',   value: 'date'},
									{name : 'Machine',  value: 'machine'},
									{name : 'Application', value: 'application'}
								]
							})
						},	{
							id: 						'query-type-'+this.viewId,
							width:          150,
							xtype:          'combo',
							mode:           'local',
							value:          'Compare',
							triggerAction:  'all',
							forceSelection: true,
							editable:       false,
							value:          this.filterQueryType,
							fieldLabel:     'Query type',
							name:           'query-type',
							hiddenName:     'query-type',
							displayField:   'name',
							valueField:     'value',
							listeners: {
								change: function() {
									this.renderForm();
								},
								select: function() {
									this.renderForm();
								},
								scope: this
							},
							store:          new Ext.data.JsonStore({
									fields : ['name', 'value'],
									data   : [
										{ name : 'Compare', value: 'compare' },
										{ name : 'Range query', value: 'range' }
										]
								})
							}, 	{
								id: 				'equals-'+this.viewId,
								fieldLabel: 'Equals',
								xtype: 			'textfield',
								name: 			'equals',
								value: 			this.filterEquals,
								width: 			150
							}
						],
						buttons: [{
							text: 		'Save',
							handler: 	function() {
								this.ownerCt.ownerCt.processForm();
							}
						},{
							text: 		'Cancel',
							handler: 	function(){
								this.ownerCt.ownerCt.hideForm();
							}
						}]
				};
				Ext.apply(this, config);
				Constellation.Views.FilterForm.superclass.initComponent.call(this);
			}
		});

Ext.reg('Constellation.Views.FilterForm', Constellation.Views.FilterForm);
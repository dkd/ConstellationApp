Ext.namespace('Constellation.Views');

Constellation.Views.FilterForm = Ext.extend(Ext.FormPanel, {
			processForm: function() {
				var params 			= this.form.getValues(),
						viewTitle 	= params["title"],
						property	 	= params["property"],
						equals 			= params["equals"],
						query_type 	= params["query-type"],
						filterForm  = Ext.getCmp('filter-add'),
						that 				= this;

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
						"view[filter_attributes][equals]": 			equals
					},
					scope: this
				});
			},
			hideForm: function() {
				this.hide();
				this.ownerCt.doLayout();
			},
			processPropertyField: function(field) {
				if(field.value=="date") {
					if(Ext.getCmp('equals-'+this.viewId) != undefined) {
						Ext.getCmp('equals-'+this.viewId).destroy();
						this.add({
							id: 				'equals-date-'+this.viewId,
							fieldLabel: 'Equals',
							xtype: 			'datefield',
							name: 			'equals',
							value: 			this.filterEquals,
							width: 			150
						});
					}
				} else {
					if(Ext.getCmp('equals-date-'+this.viewId) != undefined) {
						Ext.getCmp('equals-date-'+this.viewId).destroy();
						this.add({
							id: 				'equals-'+this.viewId,
							fieldLabel: 'Equals',
							xtype: 			'textfield',
							name: 			'equals',
							value: 			this.filterEquals,
							width: 			150
						});
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
									this.processPropertyField(field);
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
							store:          new Ext.data.JsonStore({
								fields : ['name', 'value'],
								data   : [
									{ name : 'Compare', value: 'compare' },
									{ name : 'Range query', value: 'range-query' }
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
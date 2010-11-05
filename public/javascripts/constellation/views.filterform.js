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
					url: 		'/views/'+ this.ownerCt.id +'.json',
					method: 	'PUT',
				  success: function() {
						that.hideForm();
				 	},
				  params: 	{
						"view[title]": viewTitle,
						"view[filter_attributes][property]": 		property,
						"view[filter_attributes][query_type]": 	query_type,
						"view[filter_attributes][equals]": 			equals
					}
				});
			},
			hideForm: function() {
				this.hide();
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
							fieldLabel:     'Query type',
							name:           'query-type',
							hiddenName:     'query-type',
							displayField:   'name',
							valueField:     'value',
							store:          new Ext.data.JsonStore({
								fields : ['name', 'value'],
								data   : [
								{name : 'Compare', value: 'compare'},
								{name : 'Range query', value: 'range-query'}
								]
							})
							}, 	{
								fieldLabel: 'Equals',
								xtype: 			'textfield',
                name: 			'equals',
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
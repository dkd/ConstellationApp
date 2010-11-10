Ext.namespace('Constellation.Views');

Constellation.Views.template = Ext.extend(Ext.Panel, {
	initComponent: function() {
		var config = {
			title: 		this.viewElement.title,
      iconCls: 	'tabs',
			layout: {
				type: 	'vbox',
				align: 	'stretch'
			},
			listeners: {
				scope: 			this,
				'close': 		function() {
					Ext.Ajax.request({
					   url: 		'/views/'+ this.viewElement.id +'.json',
						 method: 	'DELETE'
					});
				},
				'afterrender': 	function() {
					if(this.viewElement.filter && this.viewElement.filter.property=="date") {
						if(this.viewElement.filter.query_type=="range") {
							Ext.getCmp('equals-'+this.viewElement.id).destroy();
							Ext.getCmp('add-filter-'+this.viewElement.id).add({
								id: 				'range-date-'+this.viewElement.id,
								xtype: 			'compositefield',
							  fieldLabel: 'Range',
							  items: 			[{
							    	xtype     : 'datefield',
							      name      : 'start',
							      fieldLabel: 'Start',
										format: 		'm/d/Y H:i:s',
										value: 			this.filterStart,
										width: 			150
									}, {
							      xtype     : 'datefield',
							      name      : 'end',
							      fieldLabel: 'End',
										format: 		'm/d/Y H:i:s',
										value: 			this.filterEnd,
										width: 			150
							    }]
							});
						} else if(this.viewElement.filter.query_type=="compare") {
							Ext.getCmp('equals-'+this.viewElement.id).destroy();
							Ext.getCmp('add-filter-'+this.viewElement.id).add({
								id: 				'equals-date-'+this.viewElement.id,
								fieldLabel: 'Equals',
								format: 		'm/d/Y H:i:s',
								xtype: 			'datefield',
								name: 			'equals',
								value: 			this.filterEquals,
								width: 			150
							});
						}
					} else {
						if(this.viewElement.filter.query_type=="range") {
							Ext.getCmp('equals-'+this.viewElement.id).destroy();
							Ext.getCmp('add-filter-'+this.viewElement.id).add({
								id: 				'range-'+this.viewElement.id,
								xtype: 			'compositefield',
							  fieldLabel: 'Range',
							  items: 			[{
							    	xtype: 			'textfield',
							      name: 			'start',
							      fieldLabel: 'Start',
										value: 			this.filterStart,
										width: 			150
									}, {
							      xtype: 			'textfield',
							      name: 			'end',
							      fieldLabel: 'End',
										value: 			this.filterEnd,
										width: 			150
							    }]
							});
						} else if(this.viewElement.filter.query_type=="compare") {
							Ext.getCmp('add-filter-'+this.viewElement.id).add({
								id: 				'equals-'+this.viewElement.id,
								fieldLabel: 'Equals',
								xtype: 			'textfield',
								name: 			'equals',
								value: 			this.filterEquals,
								width: 			150
							});
						}
					}
				}
			},
			items: [{
					id: 							'add-filter-'+this.viewElement.id,
					viewId: 					this.viewElement.id,
					filterProperty: 	this.viewElement.filter ? this.viewElement.filter.property : '',
					filterQueryType: 	this.viewElement.filter ? this.viewElement.filter.query_type : '',
					filterEquals: 		this.viewElement.filter ? this.viewElement.filter.equals : '',
					filterStart: 			this.viewElement.filter ? this.viewElement.filter.start : '',
					filterEnd: 				this.viewElement.filter ? this.viewElement.filter.end : '',
					xtype: 						'Constellation.Views.FilterForm'
				}, {
					id: 			'view-grid-'+this.viewElement.id,
					viewId: 	this.viewElement.id,
					flex: 		10,
					xtype: 		'Constellation.Ui.Views.Grid'
				}, {
					id: 			'details-'+this.viewElement.id,
					viewId: 	this.viewElement.id,
					xtype: 		'panel',
					hidden: 	true,
					padding: 	5,
					title: 		'View details'
				}],
      closable: true
		};

		Ext.apply(this, Ext.apply(config, this.initialConfig));
		Constellation.Views.template.superclass.initComponent.call(this);
	}
});

Ext.reg('Constellation.Views.template', Constellation.Views.template);
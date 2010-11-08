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
						Ext.getCmp('equals-'+this.viewId).destroy();
						Ext.getCmp('add-filter-'+this.viewElement.id).add({
							id: 				'equals-date-'+this.viewId,
							fieldLabel: 'Equals',
							xtype: 			'datefield',
							name: 			'equals',
							value: 			this.filterEquals,
							width: 			150
						});
					}
				}
			},
			items: [
				{
					id: 							'add-filter-'+this.viewElement.id,
					viewId: 					this.viewElement.id,
					filterProperty: 	this.viewElement.filter ? this.viewElement.filter.property : '',
					filterQueryType: 	this.viewElement.filter ? this.viewElement.filter.query_type : '',
					filterEquals: 		this.viewElement.filter ? this.viewElement.filter.equals : '',
					xtype: 						'Constellation.Views.FilterForm'
				},
				{
					id: 			'view-grid-'+this.viewElement.id,
					viewId: 	this.viewElement.id,
					flex: 		10,
					xtype: 		'Constellation.Ui.Views.Grid'
				},
				{
					id: 			'details-'+this.viewElement.id,
					viewId: 	this.viewElement.id,
					xtype: 		'panel',
					hidden: 	true,
					padding: 	5,
					title: 		'View details'
				}
			],
      closable: true
		};

		Ext.apply(this, Ext.apply(config, this.initialConfig));
		Constellation.Views.template.superclass.initComponent.call(this);
	}
});

Ext.reg('Constellation.Views.template', Constellation.Views.template);
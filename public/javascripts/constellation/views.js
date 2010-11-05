Ext.namespace('Constellation.Views');

Constellation.Views.template = Ext.extend(Ext.Panel, {
	initComponent: function() {
		var config = {
			id: 			el.view.id,
      title: 		el.view.title,
      iconCls: 	'tabs',
			layout: {
				type: 	'vbox',
				align: 	'stretch'
			},
			listeners: {
				'close': 		function() {
					Ext.Ajax.request({
					   url: 		'/views/'+ this.id +'.json',
						 method: 	'DELETE',
					   success: function(response) {
							console.log('Deleted!');
						 }
					});
				}
			},
			items: [
				{
					id: 							'add-filter-'+el.view.id,
					viewId: 					el.view.id,
					filterProperty: 	el.view.filter ? el.view.filter.property : '',
					filterQueryType: 	el.view.filter ? el.view.filter.query_type : '',
					filterEquals: 		el.view.filter ? el.view.filter.equals : '',
					xtype: 						'Constellation.Views.FilterForm'
				},
				{
					viewId: 	el.view.id,
					flex: 		10,
					xtype: 		'Constellation.Ui.Views.Grid'
				},
				{
					id: 			'details-'+el.view.id,
					viewId: 	el.view.id,
					xtype: 		'panel',
					hidden: 	true,
					padding: 	5,
					title: 		'View details'
				}
			],
      closable: true
		};
		Ext.apply(this, config);
		Constellation.Views.template.superclass.initComponent.call(this);
	}
});

Ext.reg('Constellation.Views.template', Constellation.Views.template);
Ext.namespace('Constellation.Tabs');

Constellation.Tabs = Ext.extend(Ext.TabPanel, {
	initComponent: function() {
		var config = {
			activeTab: 			0,
			region: 				'center',
			margins: 				'0 5 5 0',
			resizeTabs: 		true,
			tabWidth: 			150,
			enableTabScroll:false,
			defaults: 			{ autoScroll:true },
			plugins: 				new Ext.ux.TabCloseMenu(),

			items: [
			{
				id: 			'main-view',
				layout: {
					type: 	'vbox',
					align: 	'stretch'
				},
				title: 		'All log entries',
				closable: true,
				items:[
						{
							id: 		'add-filter',
							xtype: 	'Constellation.Views.FilterForm'
						},
						{
							flex: 	10,
							xtype: 	'Constellation.Ui.Views'
						}, {
							id: 			'details',
							xtype: 		'panel',
							hidden: 	true,
							padding: 	5,
							title: 		'View details'
						}
						]
					}
					]
				};
				Ext.apply(this, config);
				Constellation.Tabs.superclass.initComponent.call(this);
			}
		});

Ext.reg('Constellation.Tabs', Constellation.Tabs);
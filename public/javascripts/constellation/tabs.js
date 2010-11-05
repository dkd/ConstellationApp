Ext.namespace('Constellation.Tabs');

Constellation.Tabs = Ext.extend(Ext.TabPanel, {
	initComponent: function() {
		var config = {
			id: 						'view-tabs',
			region: 				'center',
			margins: 				'0 5 5 0',
			resizeTabs: 		true,
			tabWidth: 			150,
			enableTabScroll:false,
			defaults: 			{ autoScroll:true },
			plugins: 				new Ext.ux.TabCloseMenu(),
			listeners: 			{
				'render': 	function() {
					Ext.Ajax.request({
					   url: 		'/views.json',
						 method: 	'GET',
					   success: function(response) {
								var views = Ext.decode(response.responseText);
								Ext.each(views, function(el) {
									Ext.getCmp('view-tabs').add({
										xtype: 					'Constellation.Views.template',
										viewElement: 		el.view
									});
								});
								Ext.getCmp('view-tabs').setActiveTab(0);
						 },
					   params: 	{ "view[title]": 'All log entries' }
					});
				}
			},
			items: []
		};
		Ext.apply(this, config);
		Constellation.Tabs.superclass.initComponent.call(this);
	}
});

Ext.reg('Constellation.Tabs', Constellation.Tabs);
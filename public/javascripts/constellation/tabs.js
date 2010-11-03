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
																	id: 		'add-filter-'+el.view.id,
																	xtype: 	'Constellation.Views.FilterForm'
																},
																{
																	id: 		'grid-'+el.view.id,
																	gridId: el.view.id,
																	flex: 	10,
																	xtype: 	'Constellation.Ui.Views.Grid'
																},
																{
																	id: 			'details-'+el.view.id,
																	xtype: 		'panel',
																	hidden: 	true,
																	padding: 	5,
																	title: 		'View details'
																}
															],
									            closable: true
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
Ext.onReady(function() {
		Ext.QuickTips.init();

    var viewport = new Ext.Viewport({
        layout:'fit',
        items:[{
            xtype: 'grouptabpanel',
    				tabWidth: 130,
    				activeGroup: 0,
    				items: [{
    						items: [{
    								title: 		'Log entries',
            		    iconCls: 	'x-icon-subscriptions',
            		    tabTip: 	'View log entries',
            		    style: 		'padding: 10px;',
										layout: 	'fit',
    								items: 		[{
												id: 'view-tabs',
												xtype: 'Constellation.Tabs'
										}]
    						}]
        			}, {
        			    items: 			[{
											title: 		'Administration'
									}, {
        			        title: 		'Users',
        			        iconCls: 	'x-icon-templates',
        			        tabTip: 	'View and administrate users',
        			        style: 		'padding: 10px;',
        			        layout: 	'fit',
											items: 		[{ xtype:'Constellation.Ui.Users.Grid'}]
        			 		}]
        			}]
					}]
    	});
});
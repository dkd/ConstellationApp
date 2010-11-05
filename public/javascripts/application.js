Ext.onReady(function() {
		Ext.QuickTips.init();

    var viewport = new Ext.Viewport({
        layout:'fit',
        items:[{
            xtype: 'grouptabpanel',
    				tabWidth: 130,
    				activeGroup: 0,
    				items: [{
    						mainItem: 0,
    						items: [{
    								title: 		'Log entries',
            		    iconCls: 	'x-icon-subscriptions',
            		    tabTip: 	'Subscriptions tabtip',
            		    style: 		'padding: 10px;',
										layout: 	'fit',
    								items: 		[{
												id: 'view-tabs',
												xtype: 'Constellation.Tabs'
										}]
    						}]
        			}, {
        			    expanded: 	true,
        			    items: 			[{
        			        title: 		'Users',
        			        iconCls: 	'x-icon-templates',
        			        tabTip: 	'Templates tabtip',
        			        style: 		'padding: 10px;',
        			        layout: 	'fit',
											items: 		[{ xtype:'Constellation.Ui.Users'}]
        			 		}]
        			}]
					}]
    	});
});
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
    								items: 		[
											Constellation.viewTabs
										]
    						}, {
		    						title: 		'Events',
		            	  layout: 	'fit',
		            	  iconCls: 	'x-icon-tickets',
		            	  tabTip: 	'Tickets tabtip',
		            	  style: 		'padding: 10px;',
		    						items: 		[]
		    				}, {
    								title: 		'Jobs',
            		    iconCls: 	'x-icon-users',
            		    tabTip: 	'Users tabtip',
            		    style: 		'padding: 10px;',
    								html: 		''
    						}]
        			}, {
        			    expanded: 	true,
        			    items: 			[{
        			    		title: 		'Configuration',
        			        iconCls: 	'x-icon-configuration',
        			        tabTip: 	'Configuration tabtip',
        			        style: 		'padding: 10px;',
        			        html: 		''
        			    }, {
        			        title: 		'Users',
        			        iconCls: 	'x-icon-templates',
        			        tabTip: 	'Templates tabtip',
        			        style: 		'padding: 10px;',
        			        html: 		''
        			 		}]
        			}]
					}]
    	});
});
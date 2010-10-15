Ext.onReady(function() {

		Ext.QuickTips.init();

    // create some portlet tools using built in Ext tool ids
    var tools = [{
        id:'gear',
        handler: function(){
            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
        }
    },{
        id:'close',
        handler: function(e, target, panel){
            panel.ownerCt.remove(panel, true);
        }
    }];

		var viewTabs = new Ext.TabPanel({
		    id: 						'main-tabs',
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
		        	layout: 	'border',
		        	title: 		'All log entries',
							closable: true,
		        	items:[
									{
											xtype: 	'grid',
		        	        region: 'center',
		        	        id: 		'topic-grid',
		        	        store: 	Constellation.ds,
		        	        cm: 		Constellation.cm,
		        	        sm: 		new Ext.grid.RowSelectionModel({
		        	            			singleSelect: true,
		        	            			listeners: {
		        	                		selectionchange: Constellation.selectLogEntry
		        	            			}
		        	        				}),
		        	        trackMouseOver: 	false,
		        	        loadMask: 				{ msg: 'Loading log entries...' },
		        	        viewConfig: {
		        	            forceFit: 		true,
		        	            enableRowBody:false,
		        	            showDetails: 	true
		        	        },
		        	        tbar:[
		        	            {
		        	                enableToggle: true,
		        	                text: 				'Add Filter',
		        	                tooltip: 			{ title: 'Add Filter', text: 'Filter the given log entries.' },
		        	                handler: 			Constellation.addNewViewFilter
		        	            }, '-', {
		        	                text: 				'Add View',
		        	                tooltip: 			{ title: 'Add View', text: 'Add a new view.' },
		        	                handler: 			Constellation.addNewViewTab
													}
		        	        ],
		        	        bbar: new Ext.PagingToolbar({
		        	            pageSize: 		25,
		        	            store: 				Constellation.ds,
		        	            displayInfo: 	true,
		        	            displayMsg: 	'Displaying log entries {0} - {1} of {2}',
		        	            emptyMsg: 		"No log entries to display"
		        	        })
		        	    }, {
		        	        id: 			'details',
											xtype: 		'panel',
											region: 	'south',
											hidden: 	true,
		        	        height: 	250,
		        	        title: 		'View details',
		        	    }
		        	 ]
		     		}, {
							'title': 	'Mail-Server',
							'id': 		'view2',
							closable: true
						}, {
							'title': 	'Rails 3-Applikation',
							'id': 		'view3',
							closable: true
						}
				]
		});

    var viewport = new Ext.Viewport({
        layout:'fit',
        items:[{
            xtype: 'grouptabpanel',
    				tabWidth: 130,
    				activeGroup: 0,
    				items: [{
    						mainItem: 0,
    						items: [{
    								title: 'Log entries',
            		    iconCls: 'x-icon-subscriptions',
            		    tabTip: 'Subscriptions tabtip',
            		    style: 'padding: 10px;',
										layout: 'fit',
    								items: [
											viewTabs
										]
    						}, {
		    						title: 'Events',
		            	  layout: 'fit',
		            	  iconCls: 'x-icon-tickets',
		            	  tabTip: 'Tickets tabtip',
		            	  style: 'padding: 10px;',
		    						items: []
		    				}, {
    								title: 'Jobs',
            		    iconCls: 'x-icon-users',
            		    tabTip: 'Users tabtip',
            		    style: 'padding: 10px;',
    								html: ''
    						}]
        			}, {
        			    expanded: true,
        			    items: [{
        			    		title: 'Configuration',
        			        iconCls: 'x-icon-configuration',
        			        tabTip: 'Configuration tabtip',
        			        style: 'padding: 10px;',
        			        html: ''
        			    }, {
        			        title: 'Users',
        			        iconCls: 'x-icon-templates',
        			        tabTip: 'Templates tabtip',
        			        style: 'padding: 10px;',
        			        html: ''
        			 		}]
        			}]
					}]
    	});
});

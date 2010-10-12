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

		function addNewViewFilter() {

		}

		function addNewViewTab() {
			viewTabs.add({
			            title: 'New View',
			            iconCls: 'tabs',
			            html: 'Tab Body <br/><br/>',
			            closable: true
			        });
		}

		var ds = new Constellation.TopicStore();

		var cm = new Ext.grid.ColumnModel([{
							id: 'timestamp',
							header: 'Date',
							dataIndex: 'timestamp',
							width: 15
						}, {
		           id: 'machine',
		           header: 'Machine',
		           dataIndex: 'machine',
		           width: 25
		        },{
		           header: 'Application',
		           dataIndex: 'application',
		           width: 25
		        },{
		           header: 'Message',
		           dataIndex: 'message'
		        }]);

    cm.defaultSortable = true;

		var viewTabs = new Ext.TabPanel({
		    id:' main-tabs',
		    activeTab: 0,
		    region: 'center',
		    margins: '0 5 5 0',
		    resizeTabs: true,
		    tabWidth: 150,
				enableTabScroll: true,
				defaults: {autoScroll:true},
				plugins: new Ext.ux.TabCloseMenu(),
		    items: [
						{
		        	id: 'main-view',
		        	layout: 'border',
		        	title: 'All log entries',
							closable: true,
		        	items:[
		        	    new Ext.grid.GridPanel({
		        	        region: 'center',
		        	        id: 'topic-grid',
		        	        store: ds,
		        	        cm: cm,
		        	        sm: new Ext.grid.RowSelectionModel({
		        	            singleSelect: true,
		        	            listeners: {
		        	                selectionchange: function(sel){
		        	                    var rec = sel.getSelected();
		        	                    if(rec){
		        	                        Ext.getCmp('details').body.update('<b><u>' + rec.get('title') + '</u></b><br /><br />Post details here.');
		        	                    }
		        	                }
		        	            }
		        	        }),
		        	        trackMouseOver:false,
		        	        loadMask: {msg:'Loading Topics...'},
		        	        viewConfig: {
		        	            forceFit:true,
		        	            enableRowBody:true,
		        	            showDetails:true,
		        	            getRowClass : function(record, rowIndex, p, ds){
		        	                if(this.showDetails){
		        	                    p.body = '<p>'+record.data.excerpt+'</p>';
		        	                    return 'x-grid3-row-expanded';
		        	                }
		        	                return 'x-grid3-row-collapsed';
		        	            }
		        	        },
		        	        tbar:[
		        	            {
		        	                enableToggle:true,
		        	                text:'Add Filter',
		        	                tooltip: {title:'Add Filter', text:'Filter the given log entries.'},
		        	                handler: addNewViewFilter
		        	            }, '-', {
		        	                text:'Add View',
		        	                tooltip: {title:'Add View', text:'Add a new view.'},
		        	                handler: addNewViewTab
													}
		        	        ],
		        	        bbar: new Ext.PagingToolbar({
		        	            pageSize: 25,
		        	            store: ds,
		        	            displayInfo: true,
		        	            displayMsg: 'Displaying log entries {0} - {1} of {2}',
		        	            emptyMsg: "No log entries to display"
		        	        })
		        	    }), {
		        	        id:'details',
		        	        region:'south',
		        	        height:250,
		        	        title:'View details',
		        	        split:true,
		        	        bodyStyle: 'padding: 10px; font-family: Arial; font-size: 12px;'
		        	    }
		        	 ]
		     		}, {
							'title': 'Mail-Server',
							'id': 'view2',
							closable: true
						}, {
							'title': 'Rails 3-Applikation',
							'id': 'view3',
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

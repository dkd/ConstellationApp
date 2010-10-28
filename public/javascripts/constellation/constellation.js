Ext.ns('Constellation');

Constellation.addNewViewFilter = function () {
}

Constellation.addNewViewTab = function () {
	Constellation.viewTabs.add({
	            title: 		'New View',
	            iconCls: 	'tabs',
							xtype: 		'Constellation.Ui.Grid',
	            closable: true
	        });
}

// create some portlet tools using built in Ext tool ids
Constellation.tools = [{
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

Constellation.viewTabs = new Ext.TabPanel({
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
									xtype: 	'Constellation.Ui.Grid',
        	    }, {
        	        id: 			'details',
									xtype: 		'panel',
									region: 	'south',
									hidden: 	true,
        	        height: 	250,
        	        title: 		'View details',
        	    }
        	 ]
     		}
		]
});
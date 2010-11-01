Ext.namespace('Constellation.Ui');

Constellation.Ui.Users = Ext.extend(Ext.grid.GridPanel, {
	initComponent: function() {
		var config = {
				title: 'User administration',
				region: 'center',
				cls: 		'constellation-users-grid',
			  store: 	Constellation.Users.store,
			  cm: 		Constellation.Users.model,
			  sm: 		new Ext.grid.RowSelectionModel({
			      			singleSelect: true
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
			          text: 				'Create user',
			          tooltip: 			{ title: 'Create user', text: 'Create a new user.' }
			      }
			  ],
			  bbar: new Ext.PagingToolbar({
			      pageSize: 		25,
			      store: 				Constellation.Users.store,
			      displayInfo: 	true,
			      displayMsg: 	'Displaying log entries {0} - {1} of {2}',
			      emptyMsg: 		"No log entries to display"
			  })
		};
		Ext.apply(this, config);
		Constellation.Ui.Users.superclass.initComponent.call(this);
	}
});

Constellation.Ui.Views = Ext.extend(Ext.grid.GridPanel, {
	initComponent: function() {
		var config = {
				//region: 'center',
				cls: 		'constellation-view-grid',
			  store: 	Constellation.Views.store,
			  cm: 		Constellation.Views.model,
			  sm: 		new Ext.grid.RowSelectionModel({
			      			singleSelect: true,
			      			listeners: {
			          		selectionchange: Constellation.Views.selectLogEntry
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
			          text: 				'Add Filter',
			          tooltip: 			{ title: 'Add Filter', text: 'Filter the given log entries.' },
			          handler: 			Constellation.Views.addNewViewFilter
			      }, '-', {
			          text: 				'Add View',
			          tooltip: 			{ title: 'Add View', text: 'Add a new view.' },
			          handler: 			Constellation.Views.addNewViewTab
						}
			  ],
			  bbar: new Ext.PagingToolbar({
			      pageSize: 		25,
			      store: 				Constellation.Views.store,
			      displayInfo: 	true,
			      displayMsg: 	'Displaying log entries {0} - {1} of {2}',
			      emptyMsg: 		"No log entries to display"
			  })
		};
		Ext.apply(this, config);
		Constellation.Ui.Views.superclass.initComponent.call(this);
	}
});

Ext.reg('Constellation.Ui.Users', Constellation.Ui.Users);
Ext.reg('Constellation.Ui.Views', Constellation.Ui.Views);
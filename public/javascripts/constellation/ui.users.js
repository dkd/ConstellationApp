Ext.namespace('Constellation.Ui');
Ext.namespace('Constellation.Ui.Users');

Constellation.Ui.Users.Grid = Ext.extend(Ext.grid.GridPanel, {
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
		Constellation.Ui.Users.Grid.superclass.initComponent.call(this);
	}
});

Ext.reg('Constellation.Ui.Users.Grid', Constellation.Ui.Users.Grid);
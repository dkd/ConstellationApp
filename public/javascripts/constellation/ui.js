Ext.ns('Constellation.Ui');

Constellation.Ui.Grid = Ext.extend(Ext.grid.GridPanel, {

	initComponent: function() {
		var config = {
				region: 'center',
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
			      store: 				Constellation.Views.store,
			      displayInfo: 	true,
			      displayMsg: 	'Displaying log entries {0} - {1} of {2}',
			      emptyMsg: 		"No log entries to display"
			  })
		};
		Ext.apply(this, config);
		Constellation.Ui.Grid.superclass.initComponent.call(this);
	}
});

Ext.reg('Constellation.Ui.Grid', Constellation.Ui.Grid);
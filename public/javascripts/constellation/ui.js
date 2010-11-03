Ext.namespace('Constellation.Ui');
Ext.namespace('Constellation.Ui.Views');

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

Constellation.Ui.Views.Grid = Ext.extend(Ext.grid.GridPanel, {
	renderFilterForm: function() {
		var filterElement = Ext.getCmp('add-filter-'+this.gridId);
		filterElement[filterElement.isVisible() ? "hide" : "show"]();
		filterElement.ownerCt.doLayout();
	},
	addNewView: function() {
		Ext.Ajax.request({
		   url: 		'/views.json',
			 method: 	'POST',
		   success: function(response) {
					Ext.getCmp('view-tabs').add({
					            title: 		'New View',
					            iconCls: 	'tabs',
											xtype: 		'Constellation.Ui.Views.Grid',
					            closable: true
					        });
			 },
		   params: 	{ "view[title]": 'All log entries' }
		});
	},
	renderDetailContent: function(record) {
		var content = '';

		content += '<h3>' + record.get('uuid') + '</h3><br />';
		content += '<b>Machine:</b> ' + record.get('machine') + '<br />';
		content += '<b>Application:</b> ' + record.get('application') + '<br />';
		content += '<b>Date:</b> ' + Constellation.Rendering.renderDate(record.get('timestamp')) + '<br />';
		content += '<b>Message:</b><br />' + record.get('message');

		return content;
	},
	renderLogEntryDetail: function(sel) {
		var record = sel.getSelected();
	 	if(record){
	    var detailElement = Ext.getCmp('details-'+this.gridId);
			detailElement.body.update(this.renderDetailContent(record));
			detailElement.show();
			detailElement.ownerCt.doLayout();
	 	}
	},
	initComponent: function() {
		var config = {
				cls: 		'constellation-view-grid',
			  store: 	Constellation.Views.store,
			  cm: 		Constellation.Views.model,
			  sm: 		new Ext.grid.RowSelectionModel({
			      			singleSelect: true,
			      			listeners: {
			          		selectionchange: function(sel) {
											this.grid.renderLogEntryDetail(sel);
										}
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
			          handler: 			function() {
									this.ownerCt.ownerCt.renderFilterForm();
								}
			      }, '-', {
			          text: 				'Add View',
			          tooltip: 			{ title: 'Add View', text: 'Add a new view.' },
			          handler: 			function() {
									this.ownerCt.ownerCt.addNewView();
								}
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
		Constellation.Ui.Views.Grid.superclass.initComponent.call(this);
	}
});

Ext.reg('Constellation.Ui.Users', Constellation.Ui.Users);
Ext.reg('Constellation.Ui.Views.Grid', Constellation.Ui.Views.Grid);
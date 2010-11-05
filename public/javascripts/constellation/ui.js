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
		var filterElement = Ext.getCmp('add-filter-'+this.viewId);
		filterElement[filterElement.isVisible() ? "hide" : "show"]();
		filterElement.ownerCt.doLayout();
	},
	addNewView: function() {
		Ext.Ajax.request({
		   url: 		'/views.json',
			 method: 	'POST',
		   success: function(response) {
					var el = Ext.decode(response.responseText);
					console.log(el);
					Ext.getCmp('view-tabs').add({
											id: 			el.view.id,
					            title: 		el.view.title,
					            iconCls: 	'tabs',
											layout: {
												type: 	'vbox',
												align: 	'stretch'
											},
											listeners: {
												'close': 		function() {
													Ext.Ajax.request({
													   url: 		'/views/'+ this.id +'.json',
														 method: 	'DELETE',
													   success: function(response) {
															console.log('Deleted!');
														 }
													});
												}
											},
											items: [
												{
													id: 							'add-filter-'+el.view.id,
													viewId: 					el.view.id,
													filterProperty: 	el.view.filter ? el.view.filter.property : '',
													filterQueryType: 	el.view.filter ? el.view.filter.query_type : '',
													filterEquals: 		el.view.filter ? el.view.filter.equals : '',
													xtype: 						'Constellation.Views.FilterForm'
												},
												{
													viewId: 	el.view.id,
													flex: 		10,
													xtype: 		'Constellation.Ui.Views.Grid'
												},
												{
													id: 			'details-'+el.view.id,
													viewId: 	el.view.id,
													xtype: 		'panel',
													hidden: 	true,
													padding: 	5,
													title: 		'View details'
												}
											],
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
	    var detailElement = Ext.getCmp('details-'+this.viewId);
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
			          text: 				'Settings',
			          tooltip: 			{ title: 'Settings', text: 'Configure this view.' },
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
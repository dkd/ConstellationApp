Ext.namespace('Constellation.Ui');
Ext.namespace('Constellation.Ui.Views');

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
					Ext.getCmp('view-tabs').add({
						xtype: 					'Constellation.Views.template',
						viewElement: 		el.view
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
			  store: 	new Constellation.Views.store({
									viewId: this.viewId
								}),
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
						}, '-', 		{
								xtype: 'tbbutton',
								iconCls: 'x-tbar-loading',
								handler: function() {
									this.ownerCt.ownerCt.store.load();
								}
						}
			  ]
		};
		Ext.apply(this, config);
		Constellation.Ui.Views.Grid.superclass.initComponent.call(this);
	}
});

Ext.reg('Constellation.Ui.Views.Grid', Constellation.Ui.Views.Grid);
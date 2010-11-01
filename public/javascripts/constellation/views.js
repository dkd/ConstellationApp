Ext.namespace('Constellation.Views');

Constellation.Views.addNewViewFilter = function () {
	var filterElement = Ext.getCmp('add-filter');
	filterElement[filterElement.isVisible() ? "hide" : "show"]();
	filterElement.ownerCt.doLayout();
}

Constellation.Views.addNewViewTab = function () {
	Ext.getCmp('view-tabs').add({
	            title: 		'New View',
	            iconCls: 	'tabs',
							xtype: 		'Constellation.Ui.Views',
	            closable: true
	        });
}

Constellation.Views.store = new Ext.data.JsonStore({
		autoLoad: 		true,
    autoDestroy: 	true,
    proxy: 				new Ext.data.HttpProxy({url: '/log_entries.json', method: 'GET'}),
    storeId: 			'myStore',
    root: 				'log_entries',
    idProperty: 	'uuid',
    fields: 			['uuid', 'machine', 'application', 'timestamp', 'message']
});

Constellation.Views.model = new Ext.grid.ColumnModel([{
					id: 				'timestamp',
					header: 		'Date',
					dataIndex: 	'timestamp',
  				id: 				'timestamp',
					renderer: 	Constellation.Rendering.Renderers.createDateFromTimestamp,
					sortable: 	true,
					width: 			15
				}, {
          id: 				'machine',
          header: 		'Machine',
          dataIndex: 	'machine',
				  id: 				'machine',
				  sortable: 	true,
          width: 			25
        },{
          header: 		'Application',
          dataIndex: 	'application',
					id: 				'application',
					sortable: 	true,
          width: 			25
        },{
          header: 		'Message',
          dataIndex: 	'message',
					id: 				'message'
        }]);

Constellation.Views.model.defaultSortable = true;

Constellation.Views.renderDetailContent = function(record) {
	var content = '';

	content += '<h3>' + record.get('uuid') + '</h3><br />';
	content += '<b>Machine:</b> ' + record.get('machine') + '<br />';
	content += '<b>Application:</b> ' + record.get('application') + '<br />';
	content += '<b>Date:</b> ' + Constellation.Rendering.renderDate(record.get('timestamp')) + '<br />';
	content += '<b>Message:</b><br />' + record.get('message');

	return content;
}

Constellation.Views.selectLogEntry = function(sel) {
	var record = sel.getSelected();
 	if(record){
    var detailElement = Ext.getCmp('details');
		detailElement.body.update(Constellation.Views.renderDetailContent(record));
		detailElement.show();
		detailElement.ownerCt.doLayout();
 	}
}
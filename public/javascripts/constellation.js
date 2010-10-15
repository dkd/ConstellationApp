var Constellation = {};

Constellation.renderDate = function(timestamp) {
	var date = new Date();
	date.setTime(timestamp * 1000);
	return date.toLocaleString();
}

Constellation.ds = new Ext.data.JsonStore({
		autoLoad: 		true,
    autoDestroy: 	true,
    proxy: 				new Ext.data.HttpProxy({url: '/log_entries.json', method: 'GET'}),
    storeId: 			'myStore',
    root: 				'log_entries',
    idProperty: 	'uuid',
    fields: 			['uuid', 'machine', 'application', 'timestamp', 'message']
});

Constellation.Renderers = {
    createDateFromTimestamp : function(value, p, record) {
				return Constellation.renderDate(value);
    }
};


Constellation.cm = new Ext.grid.ColumnModel([{
					id: 'timestamp',
					header: 'Date',
					dataIndex: 'timestamp',
					renderer: Constellation.Renderers.createDateFromTimestamp,
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

Constellation.cm.defaultSortable = true;

Constellation.renderDetailContent = function(record) {
	var content = '';

	content += '<h3>' + record.get('uuid') + '</h3><br />';
	content += '<b>Machine:</b> ' + record.get('machine') + '<br />';
	content += '<b>Application:</b> ' + record.get('application') + '<br />';
	content += '<b>Date:</b> ' + Constellation.renderDate(record.get('timestamp')) + '<br />';
	content += '<b>Message:</b><br />' + record.get('message');

	return content;
}

Constellation.selectLogEntry = function(sel) {
	var record = sel.getSelected();
 	if(record){
     var detailElement = Ext.getCmp('details');
		detailElement.body.update(Constellation.renderDetailContent(record));
		detailElement.show();
		detailElement.ownerCt.doLayout();
 	}
}

Constellation.addNewViewFilter = function () {

}

Constellation.addNewViewTab = function () {
	viewTabs.add({
	            title: 		'New View',
	            iconCls: 	'tabs',
	            html: 		'Tab Body <br/><br/>',
	            closable: true
	        });
}
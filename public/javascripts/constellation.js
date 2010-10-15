var Constellation = {};

Constellation.ds = new Ext.data.JsonStore({
    // store configs
    autoDestroy: 	true,
    proxy: 				new Ext.data.HttpProxy({url: '/log_entries.json', method: 'GET'}),
    storeId: 			'myStore',
    root: 				'log_entries',
    idProperty: 	'uuid',
    fields: 			['machine', 'application', 'timestamp', 'message']
});

Constellation.cm = new Ext.grid.ColumnModel([{
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

Constellation.cm.defaultSortable = true;
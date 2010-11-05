Ext.namespace('Constellation.Views');

Constellation.Views.store = new Ext.data.JsonStore({
		autoLoad: 		true,
    autoDestroy: 	true,
    proxy: 				new Ext.data.HttpProxy({url: '/views/1.json', method: 'GET'}),
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
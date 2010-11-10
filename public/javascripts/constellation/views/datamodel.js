Ext.namespace('Constellation.Views');

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
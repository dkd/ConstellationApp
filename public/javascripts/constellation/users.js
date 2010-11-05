Ext.namespace('Constellation.Users');

Constellation.Users.store = new Ext.data.JsonStore({
		autoLoad: 		true,
    autoDestroy: 	true,
    proxy: 				new Ext.data.HttpProxy({
										url: '/users.json',
										method: 'GET'
									}),
    idProperty: 	'user.id',
    fields: 			['user.id', 'user.email']
});

Constellation.Users.model = new Ext.grid.ColumnModel([{
					id: 				'id',
					header: 		'id',
					dataIndex: 	'user.id',
					sortable: 	true,
					width: 			15
				}, {
          id: 				'email',
          header: 		'E-Mail',
          dataIndex: 	'user.email',
				  sortable: 	true,
          width: 			25
        }]);

Constellation.Users.model.defaultSortable = true;
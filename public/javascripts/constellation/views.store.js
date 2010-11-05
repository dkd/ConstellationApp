Ext.namespace('Constellation.Views');

Constellation.Views.store = Ext.extend(Ext.data.JsonStore, {
	constructor: function(cfg) {
	  cfg = cfg || {};
	  var config = Ext.apply(
			{
	     	autoLoad: 		true,
		    autoDestroy: 	true,
		    proxy: 				new Ext.data.HttpProxy({
												url: '/views/'+ cfg.viewId +'.json',
												method: 'GET'
											}),
		    //storeId: 			'myStore',
		    root: 				'log_entries',
		    idProperty: 	'uuid',
		    fields: 			['uuid', 'machine', 'application', 'timestamp', 'message']
	    },
	    cfg
	  );
	  Constellation.Views.store.superclass.constructor.call(this, config);
	}
});

Ext.reg('Constellation.Views.store', Constellation.Views.store);
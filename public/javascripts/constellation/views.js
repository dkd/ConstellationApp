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

Constellation.Views.processFilterForm = function(params) {
	var attribute 	= params["attribute"],
			parameter 	= params["params"],
			query_type 	= params["query-type"],
			filterForm  = Ext.getCmp('filter-add');
}

Constellation.Views.FilterForm = 		Ext.extend(Ext.FormPanel, {
			initComponent: function() {
				var config = {
						hidden: 	true,
						padding:  5,
						title: 		'Filters',
						items: [{
							width:          150,
							xtype:          'combo',
							mode:           'local',
							value:          'date',
							triggerAction:  'all',
							forceSelection: true,
							editable:       false,
							fieldLabel:     'Attribute',
							name:           'attribute',
							hiddenName:     'attribute',
							displayField:   'name',
							valueField:     'value',
							store:          new Ext.data.JsonStore({
								fields : ['name', 'value'],
								data   : [
									{name : 'Date',   value: 'date'},
									{name : 'Machine',  value: 'machine'},
									{name : 'Application', value: 'application'}
								]
							})
						},	{
							width:          150,
							xtype:          'combo',
							mode:           'local',
							value:          'Compare',
							triggerAction:  'all',
							forceSelection: true,
							editable:       false,
							fieldLabel:     'Query type',
							name:           'query-type',
							hiddenName:     'query-type',
							displayField:   'name',
							valueField:     'value',
							store:          new Ext.data.JsonStore({
								fields : ['name', 'value'],
								data   : [
								{name : 'Compare', value: 'compare'},
								{name : 'Range query', value: 'range-query'}
								]
							})
							}, 	{
								fieldLabel: 'Parameters',
								xtype: 			'textfield',
                name: 			'params',
								width: 			150
							}
						],
						buttons: [{
							text: 		'Save',
							handler: 	function() {
								Constellation.Views.processFilterForm(Ext.getCmp('add-filter').form.getValues());
							}
						},{
							text: 		'Cancel',
							handler: 	function(){
								var filterElement = this.ownerCt.ownerCt;
								filterElement.hide();
								filterElement.ownerCt.doLayout();
							}
						}]
				};
				Ext.apply(this, config);
				Constellation.Views.FilterForm.superclass.initComponent.call(this);
			}
		});

Ext.reg('Constellation.Views.FilterForm', Constellation.Views.FilterForm);
Ext.namespace('Constellation.Tabs');

Constellation.Tabs = Ext.extend(Ext.TabPanel, {
	initComponent: function() {
		var config = {
			activeTab: 			0,
			region: 				'center',
			margins: 				'0 5 5 0',
			resizeTabs: 		true,
			tabWidth: 			150,
			enableTabScroll:false,
			defaults: 			{ autoScroll:true },
			plugins: 				new Ext.ux.TabCloseMenu(),

			items: [
			{
				id: 			'main-view',
				layout: {
					type:'vbox',
					align:'stretch'
				},
				title: 		'All log entries',
				closable: true,
				items:[
				{
					id: 			'add-filter',
					xtype: 		'form',
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
						}],
						buttons: [{
							text: 'Add filter'
						},{
							text: 'Cancel'
							}]
						},
						{
							flex: 	10,
							xtype: 	'Constellation.Ui.Views'
						}, {
							id: 			'details',
							xtype: 		'panel',
							hidden: 	true,
							padding: 	5,
							title: 		'View details'
						}
						]
					}
					]
				};
				Ext.apply(this, config);
				Constellation.Tabs.superclass.initComponent.call(this);
			}
		});

		Ext.reg('Constellation.Tabs', Constellation.Tabs);
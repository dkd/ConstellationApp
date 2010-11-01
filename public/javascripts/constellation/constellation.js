Ext.namespace('Constellation');

// create some portlet tools using built in Ext tool ids
Constellation.tools = [{
    id:'gear',
    handler: function(){
        Ext.Msg.alert('Message', 'The Settings tool was clicked.');
    }
},{
    id:'close',
    handler: function(e, target, panel){
        panel.ownerCt.remove(panel, true);
    }
}];
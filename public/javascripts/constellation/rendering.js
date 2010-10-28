Ext.namespace('Constellation.Rendering');

Constellation.Rendering.renderDate = function(timestamp) {
	var date = new Date();
	date.setTime(timestamp * 1000);
	return date.toLocaleString();
}

Constellation.Rendering.Renderers = {
    createDateFromTimestamp : function(value, p, record) {
				return Constellation.Rendering.renderDate(value);
    }
};
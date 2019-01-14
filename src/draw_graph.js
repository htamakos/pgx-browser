var PGQLViwer = window.PGQLViwer || {};

const TEXT_AREA_ID = "P3_PGQL_EDITOR_TEXT_AREA"
const DEFAULT_GRAPH_CANVAS_ID = "pgql_graph_canvas";
const COLUMN_SOURCE_NODE_ID = "SVID"
const COLUMN_DEST_NODE_ID = "DVID"
const COLUMN_EDGE_ID = "EID"

var pgql_text = document.getElementById(TEXT_AREA_ID).value

drawList = (rows) => {
	var nodes = new PGQLViwer.vis.DataSet();
	var edges = new PGQLViwer.vis.DataSet();
 	rows.forEach(row =>{
 		svid = row[COLUMN_SOURCE_NODE_ID];
 		dvid = row[COLUMN_DEST_NODE_ID];

 		if(!nodes.get(svid)){
 			nodes.add({ id: svid });
 		}

 		if(!nodes.get(dvid)){
 			nodes.add({ id: dvid });
 		}
 		edges.add({ from:  row[COLUMN_SOURCE_NODE_ID], to: row[COLUMN_DEST_NODE_ID]});
 	})

	var options = {
		  autoResize: true,
		  height: '400px',
		  width: '100%',
	      physics: false, 
	      nodes: {
	            shape: 'box', 
	            size: 20, 
	            font: {
	              boldital: { color: 'pink' }, 
	              ital: { color: 'orange' }, 
	              mono: { color: 'blue' }, 
	              bold: { color: 'purple' },
	              color: 'yellow',
	            },
	            color: "skyblue"
	      },
	      edges: {
	            arrows: 'to', 
	            smooth: false
	      },
	};

 	var data = { nodes: nodes,  edges: edges}
 	var container = document.getElementById(DEFAULT_GRAPH_CANVAS_ID);
 	var network = new PGQLViwer.vis.Network(container, data, options);
}

PGQLViwer.drawGraph(PGQLViwer.G, pgql_text, drawList);

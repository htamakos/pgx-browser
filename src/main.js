'use strict';

var PGQLViwer = window.PGQLViwer || {};
const PGX_SERVER_URL = `http://${window.location.host}/pgx`;
const DEFAULT_GRAPH_NAME = "connections_graph";

PGQLViwer.pgx = require('oracle-pgx-client');
PGQLViwer.vis = require('vis');

PGQLViwer.getGraph = (session, graph_name) => {
	return session.getGraph(graph_name);
}

PGQLViwer.executePgql = (graph_obj, query) => {
	return graph_obj.queryPgql(query);
}

PGQLViwer.drawGraph = (graph_obj, query, draw_func) => {
	graph_obj
		.then(g => PGQLViwer.executePgql(g, query))
 		.then(rs => { return rs.getResults() })
 		.then(rows => {
 			console.log(`row = ${rows[0]}`);
 			draw_func(rows)
 		})
 		.catch(err => { console.log(`error = ${err}`) });
}

PGQLViwer.pgx_session = PGQLViwer.pgx.connect(PGX_SERVER_URL).then(session => {
	return session;
}).catch(err => {
	console.log(`error: ${err}`)
})

PGQLViwer.G = PGQLViwer.pgx_session.then(session => PGQLViwer.getGraph(session, DEFAULT_GRAPH_NAME));

window.PGQLViwer = PGQLViwer;

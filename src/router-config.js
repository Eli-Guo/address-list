const Index   = resolve => require(['./components/HelloFromVux'], resolve);
const home    = resolve => require(['./components/home'], resolve);
const list    = resolve => require(['./components/list'], resolve);
const mine    = resolve => require(['./components/mine'], resolve);
const detail  = resolve => require(['./components/detail'], resolve);
const persons = resolve => require(['./components/person'], resolve);
const adds    = resolve => require(['./components/adds'], resolve);
const changes = resolve => require(['./components/changes'], resolve);
const pesonal = resolve => require(['./components/pesonal'], resolve);


const routes = [
{
	path: "/",
	redirect: "/index"
}, {
	path: "/index",
	component: Index,
	children: [
		{
			path: "",
			redirect: {name: "list"}
		}, {
			name: "home",
			path: "home",
			component: home
		}, {
			name: "list",
			path: "list",
			component: list
		}, {
			name: "mine",
			path: "mine",
			component: mine
		}
	]
}, {
	path: "/detail",
	component: detail
}, {
  path: "/person",
  component: persons
}, {
  path: "/adds",
  component: adds
}, {
  path: "/changes",
  component: changes
}, {
  path: "/pesonal",
  component: pesonal
}
];

module.exports = routes;

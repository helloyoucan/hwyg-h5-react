export default function(url,...params){
	return fetch(url,params)
	.then(response => response.json())
}
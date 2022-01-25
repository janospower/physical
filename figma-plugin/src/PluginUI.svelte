<script>
	import { GlobalCSS } from 'figma-plugin-ds-svelte';
	import { Button, Input, Label, SelectMenu } from 'figma-plugin-ds-svelte';
	
	let userLogicalWidth;
	let zoom;
	getWidth()


	let userScreenType = [
        { 'value': 'rectangle', 'label': 'Rectangle', 'group': null, 'selected': false },
        { 'value': 'triangle', 'label': 'Triangle ', 'group': null, 'selected': false },
        { 'value': 'circle', 'label': 'Circle', 'group': null, 'selected': false }
	];

	function getWidth() {
		userLogicalWidth =  window.screen.width;
		zoom = window.outerWidth - window.innerWidth;
		// console.log(zoom);
		console.log(window.outerWidth);
		console.log(window.innerWidth);
		console.log(document.body.clientWidth);
		console.log(window.devicePixelRatio);
		console.log(window.screen.width);
		console.log(window);
		parent.postMessage({ pluginMessage: { 
			'type': 'get-width', 
			'userLogicalWidth': userLogicalWidth,
			'zoom': zoom
		} }, '*');
	}

	function setZoom() {
		getWidth()
	}


</script>


<div class="wrapper p-xxsmall">

	<Label>Shape</Label>
	<SelectMenu bind:menuItems={userScreenType} class="mb-xxsmall"/>
	

	<div class="flex p-xxsmall mb-xsmall">
	<Button on:click={setZoom} >Set zoom level</Button>
	</div>

</div>


<style>

</style>
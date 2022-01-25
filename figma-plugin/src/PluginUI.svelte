<script>
	import { GlobalCSS } from 'figma-plugin-ds-svelte';
	import { Button, Input, Label, SelectMenu } from 'figma-plugin-ds-svelte';
	
	let userLogicalWidth;
	getWidth()


	let menuItems = [
        { 'value': 'rectangle', 'label': 'Rectangle', 'group': null, 'selected': false },
        { 'value': 'triangle', 'label': 'Triangle ', 'group': null, 'selected': false },
        { 'value': 'circle', 'label': 'Circle', 'group': null, 'selected': false }
	];

	function getWidth() {
		userLogicalWidth =  window.screen.width;
		parent.postMessage({ pluginMessage: { 
			'type': 'set-zoom', 
			'userLogicalWidth': userLogicalWidth
		} }, '*');
	}

	function setZoom() {
		getWidth()
	}


</script>


<div class="wrapper p-xxsmall">

	<Label>Shape</Label>
	<SelectMenu bind:menuItems={menuItems} class="mb-xxsmall"/>
	

	<div class="flex p-xxsmall mb-xsmall">
	<Button on:click={setZoom} >Set zoom level</Button>
	</div>

</div>


<style>

</style>
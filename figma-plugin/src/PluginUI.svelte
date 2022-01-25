<script>
	import { GlobalCSS } from 'figma-plugin-ds-svelte';
	import { Button, Input, Label, SelectMenu } from 'figma-plugin-ds-svelte';
	
	let userLogicalWidth;
	let zoom;
	getWidth()


	let userScreenType = [
        { 'value': '227', 'label': 'MacBook Pro 13" (2012 or later)', 'group': 'mbp', 'selected': false, 'width': '2560'},
		{ 'value': '254', 'label': 'MacBook Pro 14" M1', 'group': 'mbp', 'selected': false, 'width': '3024'},
		{ 'value': '221', 'label': 'MacBook Pro 15" (2012 or later)', 'group': 'mbp', 'selected': false, 'width': '2880'},
		{ 'value': '226', 'label': 'MacBook Pro 16" (2019 or later)', 'group': 'mbp', 'selected': false, 'width': '3072'},
		{ 'value': '254', 'label': 'MacBook Pro 16" M1', 'group': 'mbp', 'selected': false, 'width': '3456'},
		{ 'value': '227', 'label': 'MacBook Air (2018 or later)', 'group': 'mb', 'selected': false, 'width': '2560'},
		{ 'value': '226', 'label': 'MacBook (2018 or later)', 'group': 'mb', 'selected': false, 'width': '2304'},
		{ 'value': '219', 'label': 'iMac 21.5" (2015 or later)', 'group': 'mac', 'selected': false, 'width': '4096'},
		{ 'value': '218', 'label': 'iMac 24" (2015 or later)', 'group': 'mac', 'selected': false, 'width': '4480'},
		{ 'value': '218', 'label': 'iMac 27" (2015 or later)', 'group': 'mac', 'selected': false, 'width': '5120'},
		{ 'value': '218', 'label': 'Pro Display XDR (2015 or later)', 'group': 'mac', 'selected': false, 'width': '6016'},
		{ 'value': '105', 'label': '21" Full HD', 'group': 'fullhd', 'selected': false, 'width': '1920'},
		{ 'value': '92', 'label': '24" Full HD', 'group': 'fullhd', 'selected': false, 'width': '1920'},
		{ 'value': '82', 'label': '27" Full HD', 'group': 'fullhd', 'selected': false, 'width': '1920'},
		{ 'value': '122', 'label': '24" WQHD', 'group': 'wqhd', 'selected': false, 'width': '2560'},
		{ 'value': '109', 'label': '27" WQHD', 'group': 'wqhd', 'selected': false, 'width': '2560'},
		{ 'value': '92', 'label': '32" WQHD', 'group': 'wqhd', 'selected': false, 'width': '2560'},
		{ 'value': '218', 'label': 'Custom', 'group': 'other', 'selected': false, 'width': '1'},
	];

	function getWidth() {
		userLogicalWidth =  window.screen.width;
		zoom = window.devicePixelRatio;
		parent.postMessage({ pluginMessage: { 
			'type': 'get-width', 
			'userLogicalWidth': userLogicalWidth,
			'zoom': zoom
		}, 'width': '1'}, '*');
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
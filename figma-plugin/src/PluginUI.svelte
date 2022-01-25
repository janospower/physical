<script>
	import { GlobalCSS } from 'figma-plugin-ds-svelte';
	import { Button, Icon, IconWarning, Input, Label, OnboardingTip, SelectMenu, Type } from 'figma-plugin-ds-svelte';

	let userPhysicalWidth;
	let userPPI;
	
	let userLogicalWidth;
	let scale = window.devicePixelRatio;
	let zoomed;
	
	
	let userScreenType = [
		{ 'value': 'custom', 'label': 'Custom', 'group': 'other', 'selected': false, 'width': '1'},
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
	];
	let selectedScreen; // = userScreenType[userScreenType.length - 1]
	
	function checkScale(){
		scale = window.devicePixelRatio;
	}

	function getUserDimensions() {
		checkScale()
		userLogicalWidth =  window.screen.width;
		userPhysicalWidth = selectedScreen.width;
		userPPI = selectedScreen.value;
		parent.postMessage({ pluginMessage: { 
			'type': 'get-width', 
			'userLogicalWidth': userLogicalWidth,
			'userPhysicalWidth': userPhysicalWidth,
			'userPPI': userPPI
		}}, '*');
	}

	function setZoom() {
		getUserDimensions()
		parent.postMessage({ pluginMessage: { 
			'type': 'set-zoom'
		}}, '*');
	}

	function selectionChanged() {
		getUserDimensions()
	}

	$: zoomed = !(scale === 2 || scale === 1);

	$: console.log(selectedScreen);


	$: notZoomable = true && !userLogicalWidth && !userPhysicalWidth && !userPPI;
</script>


<div class="wrapper p-xxsmall">

	<Label>Monitor</Label>
	<SelectMenu on:change={selectionChanged} bind:menuItems={userScreenType} bind:value={selectedScreen} placeholder="No monitor selected …" class="mb-xxsmall"/>
	<div class="pr-xxsmall pl-xxsmall mt-negative mb-xxsmall">
		<Type>Select the screen Figma is currently displayed on</Type>
	</div>

	{#if selectedScreen && selectedScreen.value === 'custom'}
		<div class="manual">
			<div class="input pr-xxsmall">
				<Label>PPI</Label>
				<Input placeholder="227" bind:value={userPPI} class="mb-xxsmall"/>
			</div>

			<div class="input">
				<Label>Screen width in pixels</Label>
				<Input placeholder="2560" bind:value={userPhysicalWidth} class="mb-xxsmall"/>
			</div>
		</div>
	{/if}
	

	<div class="flex p-xxsmall mb-xsmall">
	<Button on:click={setZoom} bind:disabled={notZoomable}>Set zoom level</Button>
	</div>

</div>

{#if zoomed}
	<div class="alert-wrapper">
		<div class="alert p-small center">
			<Icon iconName={IconWarning} color="black"/>
			<div class="m-xxsmall mb-xsmall center">
				<Type size="large" weight="bold">
				Figma UI is scaled. 
				</Type>
				<Type size="small">	
				Reset 
		<a href="https://help.figma.com/hc/en-us/articles/360049549913-Adjust-Figma-s-UI-scale" rel="noopener" target="_blank"
			>UI scaling
		</a> and try again.
				</Type>
			</div>
			<Button on:click={checkScale} >Retry</Button>
		</div>
	</div>
{/if}


<style>

	.mt-negative {
		margin-top: -8px;
	}
	.manual {
		display: flex;
	}
	.input {
		flex-grow: 1;
	}
	.alert-wrapper {
		position: fixed;
		top: 16px;
		right: 16px;
		bottom: 16px;
		left: 16px;
		display: flex;
		align-content: center;
		justify-content: center;
		align-items: center;
	}
	.alert {
		background-color: white;
		border-radius: 3px;
		border: 0.5px solid var(--silver);
		box-shadow: var(--shadow-floating-window);
	}
	.center {
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
	}

	
</style>
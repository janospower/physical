<script>
	import { GlobalCSS } from 'figma-plugin-ds-svelte';
	import { Button, Icon, IconWarning, Input, Label, OnboardingTip, SelectMenu, Type } from 'figma-plugin-ds-svelte';

	let userPhysicalWidth;
	let userPPI;
	
	let userLogicalWidth;

	let targetPixelRatio;
	let targetPPI;

	let scale;
	let zoomed;
	
	
	let userScreenType = [
		{ 'value': 'custom', 'ppi': '', 'label': 'Custom', 'group': 'other', 'selected': false, 'width': ''},
		{ 'value': 'mbp13', 'ppi': '227', 'label': 'MacBook Pro 13" (2012 or later)', 'group': 'mbp', 'selected': false, 'width': '2560'},
		{ 'value': 'mbp14', 'ppi': '254', 'label': 'MacBook Pro 14" M1', 'group': 'mbp', 'selected': false, 'width': '3024'},
		{ 'value': 'mbp15', 'ppi': '221', 'label': 'MacBook Pro 15" (2012 or later)', 'group': 'mbp', 'selected': false, 'width': '2880'},
		{ 'value': 'mbp16', 'ppi': '226', 'label': 'MacBook Pro 16" (2019 or later)', 'group': 'mbp', 'selected': false, 'width': '3072'},
		{ 'value': 'mbp16m1', 'ppi': '254', 'label': 'MacBook Pro 16" M1', 'group': 'mbp', 'selected': false, 'width': '3456'},
		{ 'value': 'mba', 'ppi': '227', 'label': 'MacBook Air (2018 or later)', 'group': 'mb', 'selected': false, 'width': '2560'},
		{ 'value': 'mb', 'ppi': '226', 'label': 'MacBook (2018 or later)', 'group': 'mb', 'selected': false, 'width': '2304'},
		{ 'value': 'im21', 'ppi': '219', 'label': 'iMac 21.5" (2015 or later)', 'group': 'mac', 'selected': false, 'width': '4096'},
		{ 'value': 'im24', 'ppi': '218', 'label': 'iMac 24" (2015 or later)', 'group': 'mac', 'selected': false, 'width': '4480'},
		{ 'value': 'im27', 'ppi': '218', 'label': 'iMac 27" (2015 or later)', 'group': 'mac', 'selected': false, 'width': '5120'},
		{ 'value': 'xdr', 'ppi': '218', 'label': 'Pro Display XDR (2015 or later)', 'group': 'mac', 'selected': false, 'width': '6016'},
		{ 'value': '21fullhd', 'ppi': '105', 'label': '21" Full HD', 'group': 'fullhd', 'selected': false, 'width': '1920'},
		{ 'value': '24fullhd', 'ppi': '92', 'label': '24" Full HD', 'group': 'fullhd', 'selected': false, 'width': '1920'},
		{ 'value': '27fullhd', 'ppi': '82', 'label': '27" Full HD', 'group': 'fullhd', 'selected': false, 'width': '1920'},
		{ 'value': '24wqhd', 'ppi': '122', 'label': '24" WQHD', 'group': 'wqhd', 'selected': false, 'width': '2560'},
		{ 'value': '27wqhd', 'ppi': '109', 'label': '27" WQHD', 'group': 'wqhd', 'selected': false, 'width': '2560'},
		{ 'value': '32wqhd', 'ppi': '92', 'label': '32" WQHD', 'group': 'wqhd', 'selected': false, 'width': '2560'},
	];
	let selectedScreen;
	$: console.log(selectedScreen);
	
	function checkScale(){
		scale = window.devicePixelRatio;
		scale = scale >= 2 ? scale / 2 : scale;
	}
	checkScale()

	
	function getUserDimensions() {
		checkScale()
		userLogicalWidth =  window.screen.width;
		if (selectedScreen.value !== 'custom') {
			userPhysicalWidth = selectedScreen.width;
			userPPI = selectedScreen.ppi;
		}
		parent.postMessage({ pluginMessage: { 
			'type': 'get-user-dimensions', 
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
	
	let targetScreenType = [
		{ 'value': 'custom', 'ppi': '', 'label': 'Custom', 'group': 'other', 'selected': false, 'ratio': ''},
		{ 'value': 'ip13p', 'ppi': '460', 'label': 'iPhone 13 / 13 Pro', 'group': 'other', 'selected': false, 'ratio': '3'},
	];
	let selectedTargetScreen;
	$: console.log(selectedTargetScreen);

	function getTargetDimensions() {
		if (selectedTargetScreen.value !== 'custom') {
			targetPixelRatio = selectedTargetScreen.ratio;
			targetPPI = selectedTargetScreen.ppi;
		}
		parent.postMessage({ pluginMessage: { 
			'type': 'get-target-dimensions', 
			'targetPixelRatio': targetPixelRatio,
			'targetPPI': targetPPI
		}}, '*');
	}


	$: notZoomable = !userLogicalWidth || !userPhysicalWidth || !userPPI || !targetPixelRatio || !targetPPI;
</script>


<div class="wrapper p-xxsmall">
	<Label>Monitor</Label>
	<SelectMenu on:change={getUserDimensions} bind:menuItems={userScreenType} bind:value={selectedScreen} placeholder="No monitor selected …" class="mb-xxsmall"/>
	<div class="pr-xxsmall pl-xxsmall mt-negative mb-xxsmall">
		<Type>Select the screen Figma is currently displayed on</Type>
	</div>

	{#if selectedScreen && selectedScreen.value === 'custom'}
		<div class="manual">
			<div class="input pr-xxsmall">
				<Label>PPI</Label>
				<Input on:change={getUserDimensions} placeholder="227" bind:value={userPPI} class="mb-xxsmall"/>
			</div>

			<div class="input">
				<Label>Screen width in pixels</Label>
				<Input on:change={getUserDimensions} placeholder="2560" bind:value={userPhysicalWidth} class="mb-xxsmall"/>
			</div>
		</div>
	{/if}
</div>
<div class="wrapper p-xxsmall">
	<Label>Target device</Label>
	<SelectMenu on:change={getTargetDimensions} bind:menuItems={targetScreenType} bind:value={selectedTargetScreen} placeholder="No target selected …" class="mb-xxsmall"/>
	<div class="pr-xxsmall pl-xxsmall mt-negative mb-xxsmall">
		<Type>Select the device you are designing for</Type>
	</div>

	{#if selectedTargetScreen && selectedTargetScreen.value === 'custom'}
		<div class="manual">
			<div class="input pr-xxsmall">
				<Label>PPI</Label>
				<Input on:change={getTargetDimensions} placeholder="460" bind:value={targetPPI} class="mb-xxsmall"/>
			</div>

			<div class="input">
				<Label>Pixel ratio</Label>
				<Input on:change={getTargetDimensions} placeholder="1" bind:value={targetPixelRatio} class="mb-xxsmall"/>
			</div>
		</div>
	{/if}
	

	<div class="flex p-xxsmall mb-xsmall">
	<Button on:click={setZoom} bind:disabled={notZoomable}>Set zoom level</Button>
	</div>

</div>

{#if !(scale === 1)}
	<div class="alert-wrapper">
		<div class="alert p-small center">
			<Icon iconName={IconWarning} color="black"/>
			<div class="m-xxsmall mb-xsmall center">
				<Type size="large" weight="bold">
				Figma UI scaled to {Math.round(scale*100)}%. 
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
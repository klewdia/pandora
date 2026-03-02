import { AssertNever } from 'pandora-common';
import { IItemModule } from 'pandora-common/assets/modules/common';
import { ItemModuleLockSlot } from 'pandora-common/assets/modules/lockSlot';
import { ItemModuleStorage } from 'pandora-common/assets/modules/storage';
import { ItemModuleText } from 'pandora-common/assets/modules/text';
import { ItemModuleTyped } from 'pandora-common/assets/modules/typed';
import { ReactElement } from 'react';
import { WardrobeModuleProps, WardrobeModuleTemplateProps } from '../wardrobeTypes.ts';
import { WardrobeModuleConfigLockSlot, WardrobeModuleTemplateConfigLockSlot, WardrobeModuleListValueLockSlot } from './wardrobeModuleLockSlot.tsx';
import { WardrobeModuleConfigStorage, WardrobeModuleTemplateConfigStorage, WardrobeModuleListValueStorage } from './wardrobeModuleStorage.tsx';
import { WardrobeModuleConfigText, WardrobeModuleTemplateConfigText, WardrobeModuleListValueText } from './wardrobeModuleText.tsx';
import { WardrobeModuleConfigTyped, WardrobeModuleTemplateConfigTyped, WardrobeModuleListValueTyped } from './wardrobeModuleTyped.tsx';

export function WardrobeModuleConfig({ m, ...props }: WardrobeModuleProps<IItemModule>): ReactElement {
	if (m instanceof ItemModuleTyped) {
		return <WardrobeModuleConfigTyped { ...props } m={ m } />;
	}
	if (m instanceof ItemModuleStorage) {
		return <WardrobeModuleConfigStorage { ...props } m={ m } />;
	}
	if (m instanceof ItemModuleLockSlot) {
		return <WardrobeModuleConfigLockSlot { ...props } m={ m } />;
	}
	if (m instanceof ItemModuleText) {
		return <WardrobeModuleConfigText { ...props } m={ m } />;
	}
	return <>[ ERROR: UNKNOWN MODULE TYPE ]</>;
}

export function WardrobeModuleTemplateConfig({ definition, template, ...props }: WardrobeModuleTemplateProps): ReactElement {
	if (definition.type === 'typed') {
		return <WardrobeModuleTemplateConfigTyped { ...props } definition={ definition } template={ template?.type === 'typed' ? template : undefined } />;
	}
	if (definition.type === 'storage') {
		return <WardrobeModuleTemplateConfigStorage { ...props } definition={ definition } template={ template?.type === 'storage' ? template : undefined } />;
	}
	if (definition.type === 'lockSlot') {
		return <WardrobeModuleTemplateConfigLockSlot { ...props } definition={ definition } template={ template?.type === 'lockSlot' ? template : undefined } />;
	}
	if (definition.type === 'text') {
		return <WardrobeModuleTemplateConfigText { ...props } definition={ definition } template={ template?.type === 'text' ? template : undefined } />;
	}
	AssertNever(definition);
}

export function WardrobeModuleListValue({ m, ...props}: WardrobeModuleProps<IItemModule>): ReactElement {
	if (m instanceof ItemModuleTyped) {
		return <WardrobeModuleListValueTyped { ...props } m={ m } />;
	}
	if (m instanceof ItemModuleStorage) {
		return <WardrobeModuleListValueStorage { ...props } m={ m } />;
	}
	if (m instanceof ItemModuleLockSlot) {
		return <WardrobeModuleListValueLockSlot { ...props } m={ m } />;
	}
	if (m instanceof ItemModuleText) {
		return <WardrobeModuleListValueText { ...props } m={ m } />;
	}
	return <>[ ERROR: UNKNOWN MODULE TYPE ]</>;
}

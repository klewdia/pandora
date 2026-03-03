import * as z from 'zod';

import { ActionTargetSelectorSchema, ItemPathSchema } from '../../../assets/appearanceTypes.ts';
import type { AppearanceActionProcessingResult } from '../appearanceActionProcessingContext.ts';
import type { AppearanceActionHandlerArg } from './_common.ts';

export const AppearanceActionFreeze = z.object({
	type: z.literal('freeze'),
	/** Target with the item to change */
	target: ActionTargetSelectorSchema,
	/** Path to the item to change */
	item: ItemPathSchema,
	/** The freeze definition object to apply */
	freezeOptions: z.object({
		freezeName: z.boolean(),
		freezeDescription: z.boolean(),
	}),
});

/** Freeze an item */
export function ActionAppearanceFreeze({
	action,
	processingContext,
}: AppearanceActionHandlerArg<z.infer<typeof AppearanceActionFreeze>>): AppearanceActionProcessingResult {
	const target = processingContext.getTarget(action.target);
	if (!target)
		return processingContext.invalid();

	const item = target.getItem(action.item);
	// Room device wearable parts cannot be frozen
	if (item == null || item.isType('roomDeviceWearablePart')) {
		return processingContext.invalid();
	}
	// Frozen items cannot be frozen again
	if (item.frozen) {
		return processingContext.invalid();
	}
	// To freeze deployed room devices, player must have appropriate space role
	if (item.isType('roomDevice') && item.isDeployed()) {
		processingContext.checkPlayerHasSpaceRole(processingContext.getEffectiveRoomSettings(action.target.type === 'room' ? action.target.roomId : null).roomDeviceDeploymentMinimumRole);
	}

	const manipulator = processingContext.manipulator.getManipulatorFor(action.target).getContainer(action.item.container);
	if (!manipulator.modifyItem(action.item.itemId, (it) => {
		if ('freeze' in it) {
			if (action.freezeOptions) {
				const frozenBy = processingContext.getPlayerRestrictionManager().character.id;
				it = it.freeze({
					frozenBy,
					freezeName: action.freezeOptions.freezeName,
					freezeDescription: action.freezeOptions.freezeDescription,
				});
			} else {
				it = it.unfreeze();
			}
		}
		return it;
	})) {
		return processingContext.invalid();
	}

	return processingContext.finalize();
}

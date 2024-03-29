import { IInputs } from "../generated/ManifestTypes";

export type Props = {
	context: ComponentFramework.Context<IInputs>,
	onClick: (row: string) => void
};
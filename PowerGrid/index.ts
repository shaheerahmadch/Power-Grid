import { IInputs, IOutputs } from "./generated/ManifestTypes";
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import * as ReactDOM from 'react-dom';
import * as  React from 'react';
import Components from "./src/Component";
import { Props } from "./types/ComponentProps.s";

export class PowerGrid implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    _container: HTMLDivElement;
    _context: ComponentFramework.Context<IInputs>;
    _notifyOutputChanged: () => void;
    _onClickItem: string;
    constructor() {

    }
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._container = container;
        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
    }
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._context = context;
        this.renderComponent();
    }
    private renderComponent() {
        console.log(this._context);
        const appProps: Props = {
            context: this._context,
            onClick: (item: string) => {
                this._onClickItem = item as string;
                this._notifyOutputChanged()
            }
        };
        ReactDOM.render(
            React.createElement(Components, appProps), this._container,
        );
    }
    public getOutputs(): IOutputs {
        return {
            selectedId: this._onClickItem
        };
    }


    public destroy(): void {

    }
}

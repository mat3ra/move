export default DFTModel;
declare class DFTModel {
    constructor(config: any);
    onFunctionalSelect(functional: any): void;
    onRefinersSelect(refiners: any): void;
    onModifiersSelect(modifiers: any): void;
    _propToOptionElement(array: any): any;
    get isRenderExtraFieldsEnabled(): boolean;
    renderFunctionalField(): React.JSX.Element;
    _renderArrayField(name: any): React.JSX.Element;
    renderRefinerField(): React.JSX.Element;
    renderModifiersField(): React.JSX.Element;
    renderExtraFields({ className }: {
        className: any;
    }): React.JSX.Element[];
}
import React from "react";

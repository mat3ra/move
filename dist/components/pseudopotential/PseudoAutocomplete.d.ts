import React from "react";
export type PseudoItem = {
    path: string;
    owner?: {
        slug: string;
    };
};
interface PseudoAutocompleteProps {
    options: PseudoItem[];
    onChange: (value: PseudoItem) => void;
    disabled?: boolean;
    value: PseudoItem;
    className?: string;
}
export default function PseudoAutocomplete({ options, onChange, disabled, value, className, }: PseudoAutocompleteProps): React.JSX.Element | null;
export {};

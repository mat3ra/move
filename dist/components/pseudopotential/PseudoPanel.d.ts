import React from "react";
export interface MetaProperty {
    owner?: {
        slug: string;
    };
    path: string;
    isCustom?: boolean;
}
export declare function PseudoPanel({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function PseudoSearchBar({ searchText, onChange, }: {
    searchText?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): React.JSX.Element;
//# sourceMappingURL=PseudoPanel.d.ts.map
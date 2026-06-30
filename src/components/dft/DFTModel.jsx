/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import Select from "react-select";
import s from "underscore.string";

import Model from "../Model";

class DFTModel extends Model {
    constructor(config) {
        super(config);
        this.onFunctionalSelect = this.onFunctionalSelect.bind(this);
        this.onRefinersSelect = this.onRefinersSelect.bind(this);
        this.onModifiersSelect = this.onModifiersSelect.bind(this);
    }

    _propToOptionElement(array) {
        return (array || []).map((f) => this._toOptionElement(f));
    }

    onFunctionalSelect(functional) {
        const { model } = this.props;
        model.setFunctional(functional);
        this.props.onUpdate(model);
    }

    onRefinersSelect(refiners) {
        const { model } = this.props;
        model.setRefiners(refiners.map((x) => x.value));
        this.props.onUpdate(model);
    }

    onModifiersSelect(modifiers) {
        const { model } = this.props;
        model.setModifiers(modifiers.map((m) => m.value));
        this.props.onUpdate(model);
    }

    get isRenderExtraFieldsEnabled() {
        return true;
    }

    renderFunctionalField() {
        return (
            <div className="form-group fg-line" data-tid="functional">
                <label>Functional</label>
                <div className="select">
                    <select
                        className="form-control"
                        value={this.props.model.functional.slug}
                        disabled={!this.props.editable}
                        onChange={(e) => this.onFunctionalSelect(e.target.value)}>
                        {this._propToOptionElement(this.props.model.allFunctionals)}
                    </select>
                </div>
            </div>
        );
    }

    _renderArrayField(name) {
        const Name = s.capitalize(name);
        const convertSlugifiedToMultiSelectObject = (o) => {
            return {
                label: o.name || o.slug,
                value: o.slug,
                key: o.slug,
            };
        };
        return (
            <div className="form-group fg-line" data-tid={name}>
                <label>{Name}</label>
                <Select
                    isMulti
                    className="select"
                    options={this.props.model[`all${Name}`].map(
                        convertSlugifiedToMultiSelectObject,
                    )}
                    onChange={this[`on${Name}Select`]}
                    value={this.props.model[name].map(convertSlugifiedToMultiSelectObject)}
                />
            </div>
        );
    }

    renderRefinerField() {
        return this._renderArrayField("refiners");
    }

    renderModifiersField() {
        return this._renderArrayField("modifiers");
    }

    renderExtraFields({ className }) {
        const extraFields = [this.renderFunctionalField()];
        return extraFields.map((field, idx) => (
            <div className={className} key={idx}>
                {field}
            </div>
        ));
    }
}

export default DFTModel;

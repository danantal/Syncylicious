import "./ColorPicker.less";
import * as React from "react";

export class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        return (
        <div className="color-picker">
            <div style={{ backgroundColor: this.props.selectedColor }} onClick={() => this.setState({expanded: !this.state.expanded})} className="color-swatch"></div>
            {this.state.expanded ? this.props.colors.map((color) => ( this.props.selectedColor === color ? null :
                <div key={color} style={{ backgroundColor: color }} className="color-swatch"
                    onClick={() => {this.props.selectColor(color); this.setState({expanded: !this.state.expanded})}}>
                </div>
            )) : null}
        </div>
        )
    }
}
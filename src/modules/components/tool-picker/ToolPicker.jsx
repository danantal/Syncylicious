import "./ToolPicker.less";
import * as React from "react";
import fingerIcon from "./finger-icon.svg";

export class ToolPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        return (
            <div className="tool-picker">
                <div onClick={() => this.setState({ expanded: !this.state.expanded })} className="tool-swatch"><img src={fingerIcon} alt="finger" /></div>
                {this.state.expanded ? this.props.tools.map((tool) => (
                    <div key={tool} className="tool-swatch" onClick={() => { this.setState({ expanded: !this.state.expanded }); }}>
                        <img src={fingerIcon} alt="finger" />
                    </div>
                )) : null}
                {this.state.expanded ? (
                    <div className="line-width-picker">
                        <label>Line width - &nbsp;</label>
                        <input onChange={(event) => this.props.onLineWidthChange(event.target.value)} type="number" min="0" max="255" step="1" 
                            value={this.props.lineWidth} />
                    </div>
                ) : null}
            </div>
        )
    }
}
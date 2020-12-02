import React, {Component} from "react";

class GridItem extends Component {
    render() {
        return (
            <>


                <div style={{
                    display: "flex",
                    justifyContent:"space-around",
                    alignItems:"center"
                }}>


                            <img src={this.props.image_icon} width={150} alt={"Erro"}/>


                        <h2>{this.props.SensorText}</h2>
                        <h1 style={{marginLeft: "-20px"}}> {this.props.sensor_value + this.props.suffix}</h1>

                </div>
            </>
        )
            ;
    }
}

export default GridItem;

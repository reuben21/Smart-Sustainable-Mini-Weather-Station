import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";

class GridItem extends Component {
    render() {
        return (
            <>


                <div >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <div style={{
                            width:"100px",
                            height:"100px",
                            marginTop:"20px",
                            marginLeft:"-20px"
                        }}>
                            <img src={this.props.image_icon} width={120} alt={"Erro"}/>


                        </div>
                        <h2>{this.props.SensorText}</h2>
                        <h1 style={{marginLeft: "-20px"}}> {this.props.sensor_value + this.props.suffix}</h1>
                    </Grid>
                </div>
            </>
        )
            ;
    }
}

export default GridItem;

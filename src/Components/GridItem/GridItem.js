import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";

class GridItem extends Component {
    render() {
        return (
            <>
                <div style={{
                    backgroundColor:"rgba(255,255,255,0.13)",
                    display:"flex",
                    borderRadius:"25px",
                    marginTop:"20px"
                }}>
                    <Grid item xs={6} >

                        <img src={this.props.image_icon} width={100} alt=""/>

                    </Grid>
                    <Grid item xs={6} >
                        <h3>{this.props.SensorText}</h3>
                        <h2>
                            {this.props.sensor_value + this.props.suffix}
                        </h2>
                    </Grid>
                    <br/>
                </div>


            </>
        )
            ;
    }
}

export default GridItem;

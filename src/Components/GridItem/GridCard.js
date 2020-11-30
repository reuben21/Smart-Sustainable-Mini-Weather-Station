import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import GridItemCss from './GridItem.module.css';
import sun_icon from "../assets/sun.png";
import GridCss from './GridCard.module.css'
class GridItem extends Component {
    render() {
        return (
            <>


                <div className={GridCss.div_card_Css}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <div style={{
                            width:"100px",
                            height:"100px",
                            marginLeft:"-20px"
                        }}>
                            <img src={this.props.image_icon}/>


                        </div>
                        <h2>{this.props.SensorText}</h2>
                        <h1 style={{ marginLeft:"-20px"      }}> {this.props.sensor_value + this.props.suffix}</h1>
                    </Grid>
                </div>
            </>
        )
            ;
    }
}

export default GridItem;
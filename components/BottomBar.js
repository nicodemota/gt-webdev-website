import { Grid, Typography } from "@material-ui/core";
import React, {Component} from "react";

class BottomBar extends Component {
    render() {
        return (
            <Grid container>
                <Grid className="bottomBarGrid" xs={12} md={12}>
                    <div>
                        <img src="Instagram.png" className="bottomBarImg"/>
                        <span style={{paddingRight: "5vw"}} />
                        <img src="Discord.png" className="bottomBarImg"/>
                        <span style={{paddingRight: "5vw"}} />
                        <img src="Github.png" className="bottomBarImg"/>
                    </div>
                </Grid>
                <Grid className="bottomBarGrid" xs={12} md={12}>
                    <Typography variant="h5">
                        Made with🥛🍪
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default BottomBar;
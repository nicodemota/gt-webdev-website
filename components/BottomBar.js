import { Grid, Typography } from "@mui/material";
import React, {Component} from "react";
import { footer } from "../data/homeData";

class BottomBar extends Component {
    render() {
        return (
            <Grid container>
                <Grid className="bottomBarGrid bottomBarTopMargin" xs={12} md={12}>
                    <div>
                        <a href="https://tenor.com/view/dog-perro-perro-bailando-dancing-dog-perro-chistoso-gif-16573914">
                            <img src="Instagram.png" className="bottomBarImg" />
                        </a>
                        <span style={{paddingRight: "5vw"}} />
                        <a href="https://discord.gg/XxCyRSMT6g">
                            <img src="Discord.png" className="bottomBarImg"/>
                        </a>
                        <span style={{paddingRight: "5vw"}} />
                        <a href="https://github.com/gt-webdev">
                            <img src="Github.png" className="bottomBarImg"/>
                        </a>
                    </div>
                </Grid>
                <Grid className="bottomBarGrid bottomBarBottomMargin" xs={12} md={12}>
                    <Typography variant="h5">
                        {footer}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default BottomBar;
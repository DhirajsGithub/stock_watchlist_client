import { Box, Button, Divider, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchStocks from "./SearchStocks";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

interface stockProps {
    name: string;
    symbol: string;
}

interface headerProps {
    handleAddToStockClick: (open: boolean, data: stockProps) => void;
}
interface existingWatchListProp {
    id: number;
    name: string;
    createdOn: string;
    stocks?: number[];
}
type existingWatchListProps = existingWatchListProp[];

const Header: React.FC<headerProps> = (props) => {
    const { handleAddToStockClick } = props;
    const [existingWatchList, setExistingWatchList] =
        useState<existingWatchListProps>([]);

    const createNewWatchlistOrFetchWatchLists = async () => {
        try {
            let res = await axios(baseUrl + "/api/watchlist/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "blendnetAccessToken"
                    )}`,
                },
            });
            const temp: existingWatchListProps = [];

            for (let item of res.data) {
                temp.push({
                    id: item.id,
                    name: item.name,
                    createdOn: item.created_at,
                });
            }
            setExistingWatchList(temp.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        createNewWatchlistOrFetchWatchLists();
    }, []);
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "50px",
                padding: { md: "50px 100px", xs: "20px" },
            }}
        >
            <SearchStocks handleAddToStockClick={handleAddToStockClick} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: 500,
                    width: { md: 360, xs: "80%" },
                }}
            >
                <List
                    sx={{
                        // width: "100%",

                        width: { md: 360, xs: "80%" },
                        // height: 400,
                        overflow: "scroll",
                        bgcolor: "background.paper",
                        border: "1px solid #666",
                        borderTopWidth: 0,
                    }}
                >
                    {existingWatchList.map((watchlist) => (
                        <Box
                            key={watchlist.id}
                            sx={{
                                width: "100%",
                                // display: "flex",
                                // border: "1px solid #666",

                                cursor: "pointer",
                                "& :hover": {
                                    backgroundColor: "gray",
                                },
                            }}
                        >
                            <Link

                                to={{ pathname: '/watchlist/' + watchlist.name + "/" + watchlist.id }}
                                style={{
                                    padding: "5px 0px",
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <Box style={{ padding: "5px 0px" }}>
                                    <Typography width="70%" variant="h5">
                                        {watchlist.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        created on{" "}
                                        {new Date(watchlist.createdOn).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Link>
                            <Divider />
                        </Box>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Header;

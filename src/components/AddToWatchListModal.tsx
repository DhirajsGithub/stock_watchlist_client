import { Box, Button, Modal, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};


interface stockProps {
    name: string;
    symbol: string;
}
interface AddToWatchListModalProps {
    open: boolean;
    handleModalClose: () => void;
    stockData?: stockProps;
}

interface existingWatchListProp {
    id: number;
    name: string;
    createdOn: string;
    stocks?: number[];
}
type existingWatchListProps = existingWatchListProp[];

const AddToWatchListModal: React.FC<AddToWatchListModalProps> = (props) => {
    const { open, handleModalClose, stockData } = props;
    const [newWatchListInput, setNewWatchListInput] = useState<boolean>(false);
    const [watchlistName, setWatchlistName] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [existingWatchList, setExistingWatchList] =
        useState<existingWatchListProps>([]);
    const [error, setError] = useState<string>("");
    const createNewWatchlistOrFetchWatchLists = async (method: string) => {
        try {
            let res = await axios(baseUrl + "/api/watchlist/", {
                method: method,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "blendnetAccessToken"
                    )}`,
                },
                data: {
                    name: watchlistName,
                },
            });

            const temp: existingWatchListProps = [];
            // get status will be 200 if we are fetching the watchlist
            if (res.status === 200) {
                for (let item of res.data) {
                    temp.push({
                        id: item.id,
                        name: item.name,
                        createdOn: item.created_at,
                        stocks: item.stocks,
                    });
                }
                setExistingWatchList(temp.reverse());
            }

        } catch (error) {
            setError("Watchlist with same name already exist");
        }
    };
    console.log(existingWatchList)
    useEffect(() => {
        createNewWatchlistOrFetchWatchLists("GET");
    }, []);

    const handleAddWatchListClick = async () => {
        if (watchlistName === "") {
            return
        }
        await createNewWatchlistOrFetchWatchLists("POST");
        await createNewWatchlistOrFetchWatchLists("GET");
        setWatchlistName("")
    };

    const handleDeleteWishListClick = async (id: number) => {

        try {
            let res = await axios(baseUrl + "/api/watchlist/deletewatchlist/" + id, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "blendnetAccessToken"
                    )}`,
                },

            });
            if (res.status === 204) {
                await createNewWatchlistOrFetchWatchLists("GET");
            }

        } catch (error) {
            console.log(error)
        }
    }

    const addStockToWatchList = async (watchlistId: number) => {
        try {
            let res = await axios(baseUrl + "/api/watchlist/addstock/" + watchlistId, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "blendnetAccessToken"
                    )}`,
                },
                data: {
                    stock: {
                        "symbol": stockData?.symbol,
                        "name": stockData?.name,
                        "stock_img_url": "https://",
                        "price": 0,
                    }
                },
            });
            setOpenSnackbar(true)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={style}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    message="Stock added to watchlist"
                    key={"top" + "bottom"}
                    autoHideDuration={3000}

                />
                <Button
                    onClick={() => setNewWatchListInput(true)}
                    endIcon={<PlaylistAddIcon />}
                >
                    Create a new wishlist
                </Button>
                {newWatchListInput && (
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                            }}
                        >
                            <TextField
                                value={watchlistName}
                                onChange={(e) => {
                                    setError("");
                                    setWatchlistName(e.target.value);
                                }}
                                size="small"
                            />
                            <Button
                                onClick={() => handleAddWatchListClick()}
                                variant="contained"
                                endIcon={<AddIcon />}
                            >
                                Add
                            </Button>
                        </Box>
                        {error && (
                            <Typography
                                variant="body2"
                                sx={{ textAlign: "center", color: "#ef5350" }}
                            >
                                {error}
                            </Typography>
                        )}
                    </Box>
                )}
                <br />
                <Typography variant="subtitle1">
                    {existingWatchList?.length > 0 ? "OR" : "Your watchlist is empty"}
                </Typography>
                <Box sx={{ maxHeight: 300, overflow: "scroll" }}>
                    {existingWatchList.map((watchlist) => {
                        return (
                            <Box
                                key={watchlist.id}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    alignItems: "baseline",
                                }}
                            >
                                <Typography
                                    onClick={() => addStockToWatchList(watchlist.id)}
                                    key={watchlist.id}
                                    variant="body1"
                                    sx={{
                                        borderBottom: "1px solid gray",
                                        margin: "15px 10px",
                                        cursor: "pointer",
                                        width: "80%",
                                    }}
                                >
                                    Add to. <strong>{watchlist.name}</strong>
                                </Typography>
                                <DeleteIcon
                                    onClick={() => handleDeleteWishListClick(watchlist.id)}
                                    sx={{
                                        color: "primary.main",
                                        width: "10%",
                                        cursor: "pointer",
                                    }}
                                />
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Modal>
    );
};

export default AddToWatchListModal;

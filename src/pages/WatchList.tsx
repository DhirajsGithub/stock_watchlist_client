import { Box, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import baseUrl from '../utils/baseUrl';

interface stockProps {
    id: number;
    name: string;
    symbol: string;
    addedOn: string;
}

type watchlistDetailPropsType = stockProps[];

interface existingWatchListProp {
    id: number;
    name: string;
    createdOn: string;
    stocks?: number[];
}

const WatchList: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { watchlistName } = useParams<{ watchlistName: string }>();

    const [stocksDetailList, setStockDetailList] = useState<watchlistDetailPropsType>()

    const getWatchListDetail = async () => {
        let res = await axios(baseUrl + "/api/watchlist/getstocks/" + id, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "blendnetAccessToken"
                )}`,
            },
        })
        console.log(res)
        const temp: watchlistDetailPropsType = [];
        for (let item of res.data) {
            temp.push({
                id: item.id,
                name: item.name,
                addedOn: item.created_at,
                symbol: item.symbol,
            });
        }
        setStockDetailList(temp)
    }
    useEffect(() => {
        getWatchListDetail()
    }, [id])
    return (
        <Box sx={{ padding: "10px 20px" }}>
            <CssBaseline />
            <br />
            <Typography variant="h3">WatchList : {watchlistName}</Typography>
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Stock Id</TableCell>
                            <TableCell align="right">Stock Symbol</TableCell>
                            <TableCell align="right">Stock Name</TableCell>
                            <TableCell align="right">Added on</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stocksDetailList?.map((stock, index) => (
                            <TableRow
                                key={stock.symbol}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer" }}
                            >
                                <TableCell component="th" scope="row">
                                    {stock.id}
                                </TableCell>
                                <TableCell align="right">{stock.symbol}</TableCell>
                                <TableCell align="right">{stock.name}</TableCell>
                                <TableCell align="right">{stock.addedOn}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default WatchList
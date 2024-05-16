import { Box, Container, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import muiTheme from "../theme";
import Header from "../components/Header";
import AddToWatchListModal from "../components/AddToWatchListModal";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

interface stockProps {
  name: string;
  symbol: string;
}

const Dashboard: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [stockData, setStockData] = useState<stockProps>();
  const handleAddToStockClick = (open: boolean, data: stockProps) => {
    setOpenModal(open);
    setStockData(data)

  }



  const handleModalClose = () => {
    setOpenModal(false);
  }
  return (
    <Box>
      <CssBaseline />
      <Header handleAddToStockClick={handleAddToStockClick} />
      <AddToWatchListModal stockData={stockData} handleModalClose={handleModalClose} open={openModal} />
    </Box>
  );
};

export default Dashboard;

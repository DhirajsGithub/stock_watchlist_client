import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { alphaVantageApiKey, alphaVantageUrl } from "../utils/baseUrl";
import LaunchIcon from "@mui/icons-material/Launch";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

interface StockProps {
  name: string;
  symbol: string;
}

interface SearchStocksProps {
  handleAddToStockClick: (open: boolean, data: StockProps) => void;
}

const SearchStocks: React.FC<SearchStocksProps> = (props) => {
  const { handleAddToStockClick } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<StocksProps>([]);

  const [loading, setLoading] = React.useState(false);

  type StocksProps = StockProps[];
  type GetStocksFunction = (search: string) => Promise<void>;

  const getStocks: GetStocksFunction = async (search: string) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "GET",
        url: `${alphaVantageUrl}/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${alphaVantageApiKey}`,
      });
      console.log(response)
      setLoading(false);
      // let res = [
      //   {
      //     "1. symbol": "BST",
      //     "2. name": "BlackRock Science and Technology Trust",
      //     "3. type": "ETF",
      //     "4. region": "United States",
      //     "5. marketOpen": "09:30",
      //     "6. marketClose": "16:00",
      //     "7. timezone": "UTC-04",
      //     "8. currency": "USD",
      //     "9. matchScore": "1.0000",
      //   },
      //   {
      //     "1. symbol": "BSTC",
      //     "2. name": "Biospecifics Technologies Corp",
      //     "3. type": "Equity",
      //     "4. region": "United States",
      //     "5. marketOpen": "09:30",
      //     "6. marketClose": "16:00",
      //     "7. timezone": "UTC-04",
      //     "8. currency": "USD",
      //     "9. matchScore": "0.8571",
      //   },
      //   {
      //     "1. symbol": "BSTG",
      //     "2. name": "Biostage",
      //     "3. type": "Equity",
      //     "4. region": "United States",
      //     "5. marketOpen": "09:30",
      //     "6. marketClose": "16:00",
      //     "7. timezone": "UTC-04",
      //     "8. currency": "USD",
      //     "9. matchScore": "0.8571",
      //   },
      //   {
      //     "1. symbol": "BST.FRK",
      //     "2. name": "Bastei Lübbe AG",
      //     "3. type": "Equity",
      //     "4. region": "Frankfurt",
      //     "5. marketOpen": "08:00",
      //     "6. marketClose": "20:00",
      //     "7. timezone": "UTC+02",
      //     "8. currency": "EUR",
      //     "9. matchScore": "0.7500",
      //   },
      //   {
      //     "1. symbol": "BSTAX",
      //     "2. name": "BlackRock Total Factor Fund Ivestor A shares",
      //     "3. type": "Mutual Fund",
      //     "4. region": "United States",
      //     "5. marketOpen": "09:30",
      //     "6. marketClose": "16:00",
      //     "7. timezone": "UTC-04",
      //     "8. currency": "USD",
      //     "9. matchScore": "0.7500",
      //   },
      //   {
      //     "1. symbol": "BSTBF",
      //     "2. name": "Betsson AB",
      //     "3. type": "Equity",
      //     "4. region": "United States",
      //     "5. marketOpen": "09:30",
      //     "6. marketClose": "16:00",
      //     "7. timezone": "UTC-04",
      //     "8. currency": "USD",
      //     "9. matchScore": "0.7500",
      //   },
      //   {
      //     "1. symbol": "BSTCX",
      //     "2. name": "BlackRock Total Factor Fund Investor C Shares",
      //     "3. type": "Mutual Fund",
      //     "4. region": "United States",
      //     "5. marketOpen": "09:30",
      //     "6. marketClose": "16:00",
      //     "7. timezone": "UTC-04",
      //     "8. currency": "USD",
      //     "9. matchScore": "0.7500",
      //   },
      //   {
      //     "1. symbol": "BSTGD",
      //     "2. name": "Biostage Inc",
      //     "3. type": "Equity",
      //     "4. region": "United States",
      //     "5. marketOpen": "09:30",
      //     "6. marketClose": "16:00",
      //     "7. timezone": "UTC-04",
      //     "8. currency": "USD",
      //     "9. matchScore": "0.7500",
      //   },
      //   {
      //     "1. symbol": "BSTGF",
      //     "2. name": "Boustead Singapore Ltd",
      //     "3. type": "Equity",
      //     "4. region": "United States",
      //     "5. marketOpen": "09:30",
      //     "6. marketClose": "16:00",
      //     "7. timezone": "UTC-04",
      //     "8. currency": "USD",
      //     "9. matchScore": "0.7500",
      //   },
      //   {
      //     "1. symbol": "BST.DEX",
      //     "2. name": "Bastei Lübbe AG",
      //     "3. type": "Equity",
      //     "4. region": "XETRA",
      //     "5. marketOpen": "08:00",
      //     "6. marketClose": "20:00",
      //     "7. timezone": "UTC+02",
      //     "8. currency": "EUR",
      //     "9. matchScore": "0.6667",
      //   },
      // ];
      // const temp = [];
      // for (let i = 0; i < res.length; i++) {
      //   temp.push({
      //     name: res[i]["2. name"],
      //     symbol: res[i]["1. symbol"],
      //   });
      // }



      let temp = [];
      for (let i = 0; i < response.data.bestMatches.length; i++) {
        temp.push({
          name: response.data.bestMatches[i]["2. name"],
          symbol: response.data.bestMatches[i]["1. symbol"],
        });
      }
      setOptions(temp);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // Define the debounce function type
  type DebounceFunc = (func: GetStocksFunction) => (search: string) => void;

  const debounceFunc: DebounceFunc = (func) => {
    let timer: NodeJS.Timeout | null = null;
    return function (this: unknown, search: string) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, [search]);
      }, 500);
    };
  };

  const optimizedFn = React.useCallback(debounceFunc(getStocks), []);

  useEffect(() => {
    getStocks("")
  }, [])

  // Handler for input change
  const handleOnChange = (search: string) => {
    optimizedFn(search);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: 500 }}>
      <TextField
        sx={{ width: { md: 360, xs: "80%" }, }}
        onChange={(e) => handleOnChange(e.target.value)}
        id="outlined-basic"
        label="search stocks"
        variant="outlined"
      />
      <List
        sx={{
          // width: "100%",

          width: { md: 360, xs: "80%" },
          // height: 400,
          overflow: "scroll",
          bgcolor: "background.paper",
          border: "1px solid #666",
          borderTopWidth: 0,
          padding: "0 10px ",
        }}
      >
        {options.map((stock) => (
          <Box
            key={stock.symbol}
            sx={{
              width: "100%",
              display: "flex",
              borderBottom: "1px solid #666",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography width="70%" variant="h6">
              {stock.name} ({stock.symbol})
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "20%",
                justifyContent: "space-between",
              }}
            >
              <Tooltip title="Add to wishlist" placement="top">
                <AddIcon
                  onClick={() => handleAddToStockClick(true, stock)}
                  sx={{ color: "primary.main", cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip
                title="View stock"
                sx={{ color: "primary.main", cursor: "pointer" }}
                placement="top"
              >
                <Link
                  style={{ color: "#ddd", textDecoration: "none" }}
                  to={"/stockDetail/" + stock.symbol}
                >
                  <LaunchIcon sx={{ color: "#aaa", cursor: "pointer" }} />
                </Link>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default SearchStocks;

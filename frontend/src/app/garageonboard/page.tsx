import React from "react";
import Image from "next/image";
import brand2 from "../assets/brand2.png";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Box,
} from "@mui/material";

const GarageOnboardPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader
          className="bg-blue-500 text-white"
          title={
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h4" component="h1" className="font-bold">
                Service-Moti
              </Typography>
              <Image
                src={brand2}
                alt="Service-moti logo"
                width={72}
                height={62}
                className="rounded-full ml-2"
              />
            </Box>
          }
        />
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <Box className="w-full text-center">
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              className="font-semibold"
            >
              Register Garage
            </Typography>
            <Box className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              <Typography variant="body1" className="text-gray-600">
                UI for Register Garage
              </Typography>
            </Box>
          </Box>

          <Box className="w-full text-center">
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              className="font-semibold"
            >
              Register Clients
            </Typography>
            <Box className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              <Typography variant="body1" className="text-gray-600">
                UI for Register Clients
              </Typography>
            </Box>
          </Box>

          <Button variant="contained" color="primary" className="w-full">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GarageOnboardPage;

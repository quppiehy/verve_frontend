import { useEffect, useState } from "react";
import { Avatar, Typography, Paper, Grid } from "@mui/material";
import { useUserContext } from "../../Components/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { currUser, setCurrUser, categories, location } = useUserContext();
  const param = useParams();
  console.log(param);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [profileData, setProfileData] = useState("");
  const [user, setUser] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    console.log(currUser);
    if (!currUser) {
      const localAccess = JSON.parse(localStorage.getItem("verveCurrUser"));
      console.log("User retrieved");
      // setAccessToken(localAccess.accessToken);
      setCurrUser(localAccess);
    }
  }, []);

  useEffect(() => {
    setUser(param.userId);
  }, [param]);

  useEffect(() => {
    console.log(currUser);
    console.log(currUser.accessToken);
  }, [currUser]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const id = Number(user);
        const userProfile = await axios.get(
          `${BACKEND_URL}/users/personalinfo/${id}`
        );
        console.log(userProfile.data);
        setProfileData(userProfile.data);
      } catch (error) {
        console.error("API call failed: ", error);
      }
    };
    getProfile();
  }, [user]);

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} style={{ textAlign: "center" }}>
          {profileData.avatarUrl ? (
            <Avatar
              alt="User Avatar"
              src={profileData.avatarUrl}
              sx={{ width: 100, height: 100 }}
            />
          ) : (
            ""
          )}
        </Grid>
        {profileData && "Data loaded"}
        {/* <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography variant="h5">
            {profileData.firstName} {profileData.lastName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Date of Birth: {profileData.user_personal_detail.dateOfBirth || ""}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Mobile Number: {profileData.user_personal_detail.mobileNumber || ""}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Address: {profileData.user_personal_detail.address || ""}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Active Treatment:{" "}
            {profileData.user_personal_detail.activeTreatment || ""}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Cancer Type:{" "}
            {profileData.user_personal_detail.cancerDiagnosis || ""}
          </Typography>
        </Grid> */}
      </Grid>
    </Paper>
  );
};

export default UserProfile;
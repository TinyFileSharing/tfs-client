import "./App.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const baseUrl = "https://testing.tinyfilesharing.com";

export const App = () => {
  const { loginWithRedirect, logout, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState<string>();
  const [records, setRecords] = useState();
  const [details, setDetails] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then(token => {
          console.log(token);
          setToken(token);
        })
        .catch(console.log);
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  const fetchRecords = async () => {
    try {
      const res = await axios.get(baseUrl + "/api/storage/files/list?offset=0&count=100", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(baseUrl + "/api/storage/details", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDetails(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <input type="button" value="Login" onClick={handleLogin} />
      ) : (
        <>
          <input type="button" value="Logout" onClick={handleLogout} />
          <input type="button" value="fetch detail" onClick={fetchDetails} />
          <input type="button" value="fetch records" onClick={fetchRecords} />
          {details && <pre>{JSON.stringify(details, null, 2)}</pre>}
          {records && <pre>{JSON.stringify(records, null, 2)}</pre>}
        </>
      )}
    </div>
  );
};

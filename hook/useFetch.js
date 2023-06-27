import { useState, useEffect } from "react";
import axios from "axios";

//custom useFetch hook created
const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  //options
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "3e6b4c6193msh3e0b36a1fca612ap128c9bjsndfeffb726446",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };
  
  //fetch data functions
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There was an error fetching the data.");
    } finally {
      setIsLoading(false);
    }
  };
 
  //useEffect function to fetch data 
  useEffect(() => {
    fetchData();  
  }, []);
 
  //refetch data functions
  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
